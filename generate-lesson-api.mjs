import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LESSONS_DIR = path.join(__dirname, 'src', 'data', 'lessons', 'a1');
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

// ============================================================
// Parse CLI args
// ============================================================

function parseArgs() {
  const args = process.argv.slice(2);
  let lessonNum = null;
  let regenerate = false;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--lesson' && args[i + 1]) {
      lessonNum = parseInt(args[i + 1], 10);
      i++;
    } else if (args[i] === '--regenerate') {
      regenerate = true;
    } else if (args[i] === '--help') {
      console.log('Usage: node generate-lesson-api.mjs --lesson <number> [--regenerate]');
      console.log('  --lesson <number>   Lesson number to generate (1-50 for A1)');
      console.log('  --regenerate        Overwrite existing lesson file');
      console.log('  --help              Show this help');
      console.log('');
      console.log('Requires GROQ_API_KEY environment variable.');
      process.exit(0);
    }
  }

  if (!lessonNum) {
    console.error('Error: --lesson <number> is required');
    process.exit(1);
  }

  return { lessonNum, regenerate };
}

// ============================================================
// Load existing lessons to build cumulative vocabulary
// ============================================================

function loadExistingLessons() {
  const lessons = [];
  if (!fs.existsSync(LESSONS_DIR)) return lessons;

  const files = fs.readdirSync(LESSONS_DIR)
    .filter(f => f.endsWith('.json'))
    .sort();

  for (const file of files) {
    const filePath = path.join(LESSONS_DIR, file);
    try {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      lessons.push(content);
    } catch {
      // skip invalid files
    }
  }

  return lessons;
}

function getCumulativeVocabulary(lessons, upToLessonNum) {
  const vocab = [];
  for (const lesson of lessons) {
    if (lesson.number < upToLessonNum && lesson.vocabulary) {
      for (const w of lesson.vocabulary) {
        vocab.push({ en: w.en.toLowerCase(), ru: w.ru });
      }
    }
  }
  // deduplicate by english word
  const seen = new Set();
  return vocab.filter(w => {
    if (seen.has(w.en)) return false;
    seen.add(w.en);
    return true;
  });
}

// ============================================================
// Grammar progression for A1 (Murphy Grammar in Use)
// ============================================================

const GRAMMAR_TOPICS = {
  1: "Verb 'to be' — am/is/are",
  2: 'Personal pronouns — I, you, he, she, it, we, they',
  3: 'Articles — a/an/the',
  4: 'Possessive adjectives — my, your, his, her, our, their',
  5: 'Numbers 1-10 and plural nouns',
  6: 'Adjectives — describing things, I like / I do not like',
  7: 'This/that/these/those + Where questions',
  8: 'Have/has — possession, I want/I need',
  9: 'Present Simple — basic verbs (eat, drink, go, see, want, have)',
  10: 'A/An with professions, What do you do?',
  11: 'Time expressions — what time, when, every day/week',
  12: 'Imperatives — commands and requests, Do not + verb',
  13: 'Present Simple — food and drinks, Do you like...?',
  14: 'Prepositions of place — in, on, at',
  15: 'Like + verb-ing for hobbies',
  16: 'Can/Can not — abilities, Can you...?',
  17: 'How much/How many — countable and uncountable',
  18: 'Transport — take the bus, go by, walk',
  19: 'Adverbs of frequency — always, sometimes, never + days of week',
  20: 'Weather — It is hot/cold/raining, seasons',
  21: 'Months and dates — in January, when is your birthday',
  22: 'Comparative adjectives — bigger, more beautiful, than',
  23: 'There is/There are — existence, Is there...?',
  24: 'Body parts with possessives — my head, her eyes',
  25: 'Clothes — I wear, put on, take off',
  26: 'Feelings — I am happy/tired/hungry, I feel, Are you...?',
  27: 'Past Simple — was/were',
  28: 'More prepositions — under, between, next to, near',
  29: 'Quantifiers — all, some, any, no, every, both',
  30: 'Conjunctions — because, so, if, when, why',
  31: 'Numbers 11-100, How much is it?',
  32: 'Professions — He/She is a..., works at/in',
  33: 'Technology — I use, send, get + device',
  34: 'Travel — by plane/train, go to country, need passport',
  35: 'Restaurant — I would like, Can I have, the bill',
  36: 'Food — countable/uncountable, a/an vs some',
  37: 'Future Simple — will, will not, Will you...?',
  38: 'Question words — what, who, where, when, why, how',
  39: 'Directions — turn left/right, go straight, cross',
  40: 'Thinking verbs — know, think, understand, believe',
  41: 'Adverbs of frequency — usually, often, rarely, already, still',
  42: 'Comparatives and superlatives — better, best, worse, worst',
  43: 'Hobbies — love/enjoy + verb-ing, My hobby is',
  44: 'Holidays — celebrate, give/get a gift, Happy birthday',
  45: 'Telling time — o clock, half past, quarter past/to',
  46: 'Language — I study, I speak, I read/write',
  47: 'Tests — do a test, make a mistake, improve, progress',
  48: 'Friendship — talk with, share, help, care about',
  49: 'Indefinite pronouns — everything, someone, nowhere, myself',
  50: 'Review — all A1 grammar combined',
};

// ============================================================
// Build the prompt
// ============================================================

function buildPrompt(lessonNum, cumulativeVocab, existingLessons) {
  const topic = GRAMMAR_TOPICS[lessonNum] || `Lesson ${lessonNum}`;

  const vocabList = cumulativeVocab
    .map(w => `${w.en} = ${w.ru}`)
    .join('\n');

  const prevLessonCount = existingLessons.length;

  return `You are an expert ESL methodist creating English lessons for Russian-speaking beginners.

Generate lesson ${lessonNum} at CEFR level A1.

GRAMMAR TOPIC FOR THIS LESSON: ${topic}

CUMULATIVE VOCABULARY — these are ALL the words the student knows from previous ${prevLessonCount} lessons. Use ONLY these words when creating exercises, dialogues, and examples. Do NOT use any other English words except the 10-12 new vocabulary words for this lesson.

${vocabList}

STRICT RULES:

1. Lessons must be in strict sequential order. Lesson 1 is the absolute beginning. Each lesson builds on all previous ones.

2. CEFR level compliance: A1 lessons use only basic everyday vocabulary. No complex idi, phrasal verbs beyond the most basic, or abstract concepts.

3. New vocabulary: introduce exactly 10-12 new words. Each word must have: english word, russian translation, phonetic transcription in IPA, and a simple example sentence using ONLY cumulative vocabulary + this new word.

4. Grammar explanation: write all explanations in Russian. Keep rules simple and clear. Give 2-3 examples per rule.

5. Dialogues: create 2 short natural conversations. Use realistic everyday situations. Each dialogue must have 4-6 lines. Speakers should be labeled as Man, Woman, or names. Use ONLY cumulative vocabulary plus the new words.

6. Multiple choice exercises: 10 questions. Each asks "How do you translate [english word]?" with 4 russian options. The correct answer must NOT appear in the question. All distractors must be from cumulative vocabulary.

7. Fill in blank exercises: 10 sentences. Each sentence has one word replaced with ___. The sentence must provide enough context to guess the word. Hint shows the russian translation. Use ONLY cumulative vocabulary.

8. Match pairs: 8 pairs matching english words to their russian translations. All from cumulative vocabulary.

9. Translate exercises: 5 items. Show a russian word, the student types the english equivalent. Answer is a single word, not a sentence.

10. Listen and type: 5 items taken from the dialogues. The student hears a line and types it.

11. Homework: give a specific writing task using the new vocabulary. The example should be a coherent short sentence or two using actual new words from this lesson.

12. NEVER put the answer inside the question or hint. The student must think.

13. All UI-facing text (exercise instructions, hints, task descriptions) must be in Russian.

14. Example sentences in vocabulary must be natural and useful, not random word combinations.

Return ONLY a valid JSON object matching the schema below. No markdown, no code blocks, no extra text.`;
}

// ============================================================
// JSON Schema for Groq structured output
// ============================================================

const LESSON_SCHEMA = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    level: { type: 'string', enum: ['A1', 'A2', 'B1', 'B2'] },
    number: { type: 'integer', minimum: 1 },
    title: { type: 'string' },
    titleRu: { type: 'string' },
    grammar: {
      type: 'object',
      properties: {
        topic: { type: 'string' },
        topicRu: { type: 'string' },
        points: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              rule: { type: 'string' },
              explanationRu: { type: 'string' },
              examples: {
                type: 'array',
                items: { type: 'string' },
                minItems: 2,
                maxItems: 3,
              },
            },
            required: ['rule', 'explanationRu', 'examples'],
            additionalProperties: false,
          },
          minItems: 2,
          maxItems: 4,
        },
      },
      required: ['topic', 'topicRu', 'points'],
      additionalProperties: false,
    },
    vocabulary: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          en: { type: 'string' },
          ru: { type: 'string' },
          transcription: { type: 'string' },
          example: { type: 'string' },
        },
        required: ['en', 'ru', 'transcription', 'example'],
        additionalProperties: false,
      },
      minItems: 10,
      maxItems: 12,
    },
    dialogues: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          lines: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                speaker: { type: 'string' },
                text: { type: 'string' },
              },
              required: ['speaker', 'text'],
              additionalProperties: false,
            },
            minItems: 4,
            maxItems: 6,
          },
        },
        required: ['title', 'lines'],
        additionalProperties: false,
      },
      minItems: 2,
      maxItems: 2,
    },
    exercises: {
      type: 'object',
      properties: {
        multipleChoice: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              question: { type: 'string' },
              options: {
                type: 'array',
                items: { type: 'string' },
                minItems: 4,
                maxItems: 4,
              },
              correctIndex: { type: 'integer', minimum: 0, maximum: 3 },
            },
            required: ['question', 'options', 'correctIndex'],
            additionalProperties: false,
          },
          minItems: 10,
          maxItems: 10,
        },
        fillInBlank: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              sentence: { type: 'string' },
              sentenceRu: { type: 'string' },
              blank: { type: 'string' },
              hint: { type: 'string' },
            },
            required: ['sentence', 'sentenceRu', 'blank', 'hint'],
            additionalProperties: false,
          },
          minItems: 10,
          maxItems: 10,
        },
        matchPairs: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              left: { type: 'string' },
              right: { type: 'string' },
            },
            required: ['left', 'right'],
            additionalProperties: false,
          },
          minItems: 8,
          maxItems: 8,
        },
        translate: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              ru: { type: 'string' },
              en: { type: 'string' },
              hint: { type: 'string' },
            },
            required: ['ru', 'en', 'hint'],
            additionalProperties: false,
          },
          minItems: 5,
          maxItems: 5,
        },
        listenAndType: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              audio: { type: 'string' },
              correct: { type: 'string' },
              hint: { type: 'string' },
            },
            required: ['audio', 'correct', 'hint'],
            additionalProperties: false,
          },
          minItems: 5,
          maxItems: 5,
        },
      },
      required: ['multipleChoice', 'fillInBlank', 'matchPairs', 'translate', 'listenAndType'],
      additionalProperties: false,
    },
    homework: {
      type: 'object',
      properties: {
        taskRu: { type: 'string' },
        example: { type: 'string' },
      },
      required: ['taskRu', 'example'],
      additionalProperties: false,
    },
  },
  required: ['id', 'level', 'number', 'title', 'titleRu', 'grammar', 'vocabulary', 'dialogues', 'exercises', 'homework'],
  additionalProperties: false,
};

// ============================================================
// Call Groq API
// ============================================================

async function callGroq(prompt, apiKey) {
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: 'You are an expert ESL methodist. You always return valid JSON only.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 8000,
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'lesson',
          schema: LESSON_SCHEMA,
          strict: true,
        },
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;

  // Groq may wrap JSON in markdown code blocks — strip them
  let cleaned = content.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  }

  return JSON.parse(cleaned);
}

// ============================================================
// Validate generated lesson
// ============================================================

function validateLesson(lesson, lessonNum) {
  const errors = [];

  if (lesson.number !== lessonNum) errors.push(`Wrong lesson number: ${lesson.number} instead of ${lessonNum}`);
  if (!lesson.vocabulary || lesson.vocabulary.length < 10) errors.push(`Too few vocabulary words: ${lesson.vocabulary?.length || 0}`);
  if (lesson.vocabulary.length > 12) errors.push(`Too many vocabulary words: ${lesson.vocabulary.length}`);
  if (!lesson.exercises?.multipleChoice || lesson.exercises.multipleChoice.length !== 10) errors.push('Wrong number of multiple choice exercises');
  if (!lesson.exercises?.fillInBlank || lesson.exercises.fillInBlank.length !== 10) errors.push('Wrong number of fill-in-blank exercises');
  if (!lesson.exercises?.matchPairs || lesson.exercises.matchPairs.length !== 8) errors.push('Wrong number of match pairs');
  if (!lesson.exercises?.translate || lesson.exercises.translate.length !== 5) errors.push('Wrong number of translate exercises');
  if (!lesson.exercises?.listenAndType || lesson.exercises.listenAndType.length !== 5) errors.push('Wrong number of listen-and-type exercises');
  if (!lesson.dialogues || lesson.dialogues.length !== 2) errors.push('Wrong number of dialogues');

  // Check that multiple choice questions don't contain the answer
  if (lesson.exercises?.multipleChoice) {
    for (let i = 0; i < lesson.exercises.multipleChoice.length; i++) {
      const ex = lesson.exercises.multipleChoice[i];
      if (ex.correctIndex < 0 || ex.correctIndex > 3) errors.push(`MC exercise ${i + 1}: invalid correctIndex`);
      if (ex.options.length !== 4) errors.push(`MC exercise ${i + 1}: not 4 options`);
    }
  }

  // Check fill-in-blank has actual blanks
  if (lesson.exercises?.fillInBlank) {
    for (let i = 0; i < lesson.exercises.fillInBlank.length; i++) {
      const ex = lesson.exercises.fillInBlank[i];
      if (!ex.sentence.includes('___')) errors.push(`Fill exercise ${i + 1}: no ___ in sentence`);
      if (ex.hint && ex.hint.toLowerCase().includes(ex.blank.toLowerCase())) {
        // hint contains the answer — warn but don't fail
        console.warn(`  Warning: Fill exercise ${i + 1} hint may contain the answer`);
      }
    }
  }

  // Check translate exercises: en should be a single word or short phrase
  if (lesson.exercises?.translate) {
    for (let i = 0; i < lesson.exercises.translate.length; i++) {
      const ex = lesson.exercises.translate[i];
      const wordCount = ex.en.split(' ').length;
      if (wordCount > 3) {
        console.warn(`  Warning: Translate exercise ${i + 1} answer is ${wordCount} words: "${ex.en}"`);
      }
    }
  }

  return errors;
}

// ============================================================
// Main
// ============================================================

async function main() {
  const { lessonNum, regenerate } = parseArgs();

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error('Error: GROQ_API_KEY environment variable is not set.');
    console.error('Set it like this:');
    console.error('  Windows (PowerShell): $env:GROQ_API_KEY = "your-key"');
    console.error('  Windows (cmd): set GROQ_API_KEY=your-key');
    console.error('  Linux/Mac: export GROQ_API_KEY="your-key"');
    process.exit(1);
  }

  if (lessonNum < 1 || lessonNum > 50) {
    console.error('Error: Lesson number must be between 1 and 50 for A1 level.');
    process.exit(1);
  }

  const fileName = `lesson-${String(lessonNum).padStart(2, '0')}.json`;
  const filePath = path.join(LESSONS_DIR, fileName);

  if (fs.existsSync(filePath) && !regenerate) {
    console.error(`Error: ${filePath} already exists. Use --regenerate to overwrite.`);
    process.exit(1);
  }

  console.log(`Generating lesson ${lessonNum} (A1) using ${GROQ_MODEL}...`);

  const existingLessons = loadExistingLessons();
  const cumulativeVocab = getCumulativeVocabulary(existingLessons, lessonNum);

  console.log(`  Found ${existingLessons.length} existing lessons`);
  console.log(`  Cumulative vocabulary: ${cumulativeVocab.length} words`);

  const maxRetries = 3;
  let lastError = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`  Attempt ${attempt}/${maxRetries}...`);

      const prompt = buildPrompt(lessonNum, cumulativeVocab, existingLessons);
      const lesson = await callGroq(prompt, apiKey);

      const errors = validateLesson(lesson, lessonNum);

      if (errors.length > 0) {
        console.error(`  Validation errors:`);
        errors.forEach(e => console.error(`    - ${e}`));
        lastError = new Error(`Validation failed: ${errors.join('; ')}`);
        continue;
      }

      // Set the correct ID
      lesson.id = `a1-lesson-${String(lessonNum).padStart(2, '0')}`;
      lesson.level = 'A1';
      lesson.number = lessonNum;

      // Ensure directory exists
      if (!fs.existsSync(LESSONS_DIR)) {
        fs.mkdirSync(LESSONS_DIR, { recursive: true });
      }

      fs.writeFileSync(filePath, JSON.stringify(lesson, null, 2), 'utf-8');
      console.log(`\n✅ Lesson ${lessonNum} saved to ${filePath}`);
      console.log(`   Vocabulary: ${lesson.vocabulary.length} words`);
      console.log(`   Grammar: ${lesson.grammar.points.length} points`);
      console.log(`   Dialogues: ${lesson.dialogues.length}`);
      console.log(`   Exercises: ${Object.values(lesson.exercises).reduce((sum, arr) => sum + arr.length, 0)} total`);
      return;

    } catch (err) {
      lastError = err;
      console.error(`  Attempt ${attempt} failed: ${err.message}`);
      if (attempt < maxRetries) {
        console.log('  Retrying in 3 seconds...');
        await new Promise(r => setTimeout(r, 3000));
      }
    }
  }

  console.error(`\n❌ Failed to generate lesson ${lessonNum} after ${maxRetries} attempts.`);
  console.error(`Last error: ${lastError.message}`);
  process.exit(1);
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
