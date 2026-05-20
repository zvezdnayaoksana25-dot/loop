const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'src', 'data', 'lessons', 'a1');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// ============================================================
// MASTER VOCABULARY — based on Oxford 3000 CEFR A1 words
// Ordered by frequency within each lesson topic
// Each word appears for the FIRST time in its assigned lesson
// ============================================================

const vocabularyByLesson = {
  1: [
    { en: "hello", ru: "привет", phonetic: "/həˈloʊ/", example: "Hello!" },
    { en: "goodbye", ru: "до свидания", phonetic: "/ɡʊdˈbaɪ/", example: "Goodbye!" },
    { en: "yes", ru: "да", phonetic: "/jes/", example: "Yes!" },
    { en: "no", ru: "нет", phonetic: "/noʊ/", example: "No!" },
    { en: "please", ru: "пожалуйста", phonetic: "/pliːz/", example: "Please!" },
    { en: "thank you", ru: "спасибо", phonetic: "/θæŋk juː/", example: "Thank you!" },
    { en: "sorry", ru: "извините", phonetic: "/ˈsɒri/", example: "Sorry!" },
    { en: "good", ru: "хороший", phonetic: "/ɡʊd/", example: "Good!" },
    { en: "bad", ru: "плохой", phonetic: "/bæd/", example: "Bad!" },
    { en: "fine", ru: "хорошо, в порядке", phonetic: "/faɪn/", example: "I am fine." },
    { en: "thanks", ru: "спасибо (коротко)", phonetic: "/θæŋks/", example: "Thanks!" },
    { en: "ok", ru: "хорошо, ладно", phonetic: "/ˌoʊˈkeɪ/", example: "OK!" }
  ],
  2: [
    { en: "I", ru: "я", phonetic: "/aɪ/", example: "I am fine." },
    { en: "you", ru: "ты, вы", phonetic: "/juː/", example: "You are nice." },
    { en: "he", ru: "он", phonetic: "/hiː/", example: "He is good." },
    { en: "she", ru: "она", phonetic: "/ʃiː/", example: "She is fine." },
    { en: "it", ru: "оно, это", phonetic: "/ɪt/", example: "It is good." },
    { en: "we", ru: "мы", phonetic: "/wiː/", example: "We are here." },
    { en: "they", ru: "они", phonetic: "/ðeɪ/", example: "They are fine." },
    { en: "my", ru: "мой", phonetic: "/maɪ/", example: "My name is Anna." },
    { en: "your", ru: "твой, ваш", phonetic: "/jʊr/", example: "Your name?" },
    { en: "name", ru: "имя", phonetic: "/neɪm/", example: "My name is Tom." },
    { en: "am", ru: "есть (для I)", phonetic: "/æm/", example: "I am happy." },
    { en: "is", ru: "есть (для he/she/it)", phonetic: "/ɪz/", example: "She is nice." }
  ],
  3: [
    { en: "are", ru: "есть (для you/we/they)", phonetic: "/ɑːr/", example: "You are good." },
    { en: "not", ru: "не", phonetic: "/nɒt/", example: "I am not bad." },
    { en: "a", ru: "один, некий (артикль)", phonetic: "/ə/", example: "I am a student." },
    { en: "the", ru: "этот, тот (артикль)", phonetic: "/ðə/", example: "The name is good." },
    { en: "and", ru: "и", phonetic: "/ænd/", example: "Good and fine." },
    { en: "or", ru: "или", phonetic: "/ɔːr/", example: "Yes or no?" },
    { en: "but", ru: "но", phonetic: "/bʌt/", example: "Good but bad." },
    { en: "his", ru: "его (притяж.)", phonetic: "/hɪz/", example: "His name is Tom." },
    { en: "her", ru: "её (притяж.)", phonetic: "/hɜːr/", example: "Her name is Anna." },
    { en: "nice", ru: "приятный, хороший", phonetic: "/naɪs/", example: "Nice to meet you." },
    { en: "happy", ru: "счастливый", phonetic: "/ˈhæpi/", example: "I am happy." },
    { en: "friend", ru: "друг", phonetic: "/frend/", example: "You are my friend." }
  ],
  4: [
    { en: "mother", ru: "мама", phonetic: "/ˈmʌðər/", example: "My mother is nice." },
    { en: "father", ru: "папа", phonetic: "/ˈfɑːðər/", example: "My father is good." },
    { en: "brother", ru: "брат", phonetic: "/ˈbrʌðər/", example: "My brother is happy." },
    { en: "sister", ru: "сестра", phonetic: "/ˈsɪstər/", example: "My sister is fine." },
    { en: "family", ru: "семья", phonetic: "/ˈfæmɪli/", example: "My family is good." },
    { en: "son", ru: "сын", phonetic: "/sʌn/", example: "He is my son." },
    { en: "daughter", ru: "дочь", phonetic: "/ˈdɔːtər/", example: "She is my daughter." },
    { en: "husband", ru: "муж", phonetic: "/ˈhʌzbənd/", example: "He is her husband." },
    { en: "wife", ru: "жена", phonetic: "/waɪf/", example: "She is his wife." },
    { en: "love", ru: "любить", phonetic: "/lʌv/", example: "I love my family." },
    { en: "big", ru: "большой", phonetic: "/bɪɡ/", example: "A big family." },
    { en: "small", ru: "маленький", phonetic: "/smɔːl/", example: "A small family." }
  ],
  5: [
    { en: "one", ru: "один", phonetic: "/wʌn/", example: "I have one brother." },
    { en: "two", ru: "два", phonetic: "/tuː/", example: "I have two sisters." },
    { en: "three", ru: "три", phonetic: "/θriː/", example: "Three sons." },
    { en: "four", ru: "четыре", phonetic: "/fɔːr/", example: "Four daughters." },
    { en: "five", ru: "пять", phonetic: "/faɪv/", example: "Five friends." },
    { en: "six", ru: "шесть", phonetic: "/sɪks/", example: "Six people." },
    { en: "seven", ru: "семь", phonetic: "/ˈsevən/", example: "Seven days." },
    { en: "eight", ru: "восемь", phonetic: "/eɪt/", example: "Eight people." },
    { en: "nine", ru: "девять", phonetic: "/naɪn/", example: "Nine books." },
    { en: "ten", ru: "десять", phonetic: "/ten/", example: "Ten fingers." },
    { en: "how", ru: "как, сколько", phonetic: "/haʊ/", example: "How are you?" },
    { en: "many", ru: "много", phonetic: "/ˈmeni/", example: "How many brothers?" }
  ],
  6: [
    { en: "red", ru: "красный", phonetic: "/red/", example: "A red car." },
    { en: "blue", ru: "синий", phonetic: "/bluː/", example: "A blue sky." },
    { en: "green", ru: "зелёный", phonetic: "/ɡriːn/", example: "A green tree." },
    { en: "yellow", ru: "жёлтый", phonetic: "/ˈjeloʊ/", example: "A yellow sun." },
    { en: "black", ru: "чёрный", phonetic: "/blæk/", example: "A black cat." },
    { en: "white", ru: "белый", phonetic: "/waɪt/", example: "A white house." },
    { en: "brown", ru: "коричневый", phonetic: "/braʊn/", example: "A brown dog." },
    { en: "pink", ru: "розовый", phonetic: "/pɪŋk/", example: "A pink flower." },
    { en: "color", ru: "цвет", phonetic: "/ˈkʌlər/", example: "What color?" },
    { en: "old", ru: "старый", phonetic: "/oʊld/", example: "An old house." },
    { en: "new", ru: "новый", phonetic: "/nuː/", example: "A new car." },
    { en: "like", ru: "нравиться", phonetic: "/laɪk/", example: "I like blue." }
  ],
  7: [
    { en: "this", ru: "этот (близко)", phonetic: "/ðɪs/", example: "This is my book." },
    { en: "that", ru: "тот (далеко)", phonetic: "/ðæt/", example: "That is a car." },
    { en: "these", ru: "эти (близко)", phonetic: "/ðiːz/", example: "These are my shoes." },
    { en: "those", ru: "те (далеко)", phonetic: "/ðoʊz/", example: "Those are birds." },
    { en: "here", ru: "здесь", phonetic: "/hɪr/", example: "I am here." },
    { en: "there", ru: "там", phonetic: "/ðer/", example: "She is there." },
    { en: "what", ru: "что, какой", phonetic: "/wɒt/", example: "What is this?" },
    { en: "who", ru: "кто", phonetic: "/huː/", example: "Who is she?" },
    { en: "where", ru: "где, куда", phonetic: "/wer/", example: "Where are you?" },
    { en: "from", ru: "из, от", phonetic: "/frɒm/", example: "I am from Russia." },
    { en: "in", ru: "в, внутри", phonetic: "/ɪn/", example: "I am in the house." },
    { en: "on", ru: "на", phonetic: "/ɒn/", example: "The book is on the table." }
  ],
  8: [
    { en: "book", ru: "книга", phonetic: "/bʊk/", example: "A good book." },
    { en: "pen", ru: "ручка", phonetic: "/pen/", example: "A blue pen." },
    { en: "bag", ru: "сумка", phonetic: "/bæɡ/", example: "My bag is big." },
    { en: "house", ru: "дом", phonetic: "/haʊs/", example: "A big house." },
    { en: "car", ru: "машина", phonetic: "/kɑːr/", example: "A new car." },
    { en: "door", ru: "дверь", phonetic: "/dɔːr/", example: "The door is open." },
    { en: "table", ru: "стол", phonetic: "/ˈteɪbl/", example: "A big table." },
    { en: "chair", ru: "стул", phonetic: "/tʃer/", example: "A small chair." },
    { en: "phone", ru: "телефон", phonetic: "/foʊn/", example: "My phone is new." },
    { en: "key", ru: "ключ", phonetic: "/kiː/", example: "The key is here." },
    { en: "water", ru: "вода", phonetic: "/ˈwɔːtər/", example: "I want water." },
    { en: "food", ru: "еда", phonetic: "/fuːd/", example: "Good food." }
  ],
  9: [
    { en: "eat", ru: "есть (кушать)", phonetic: "/iːt/", example: "I eat food." },
    { en: "drink", ru: "пить", phonetic: "/drɪŋk/", example: "I drink water." },
    { en: "sleep", ru: "спать", phonetic: "/sliːp/", example: "I sleep at night." },
    { en: "go", ru: "идти, ехать", phonetic: "/ɡoʊ/", example: "I go home." },
    { en: "come", ru: "приходить", phonetic: "/kʌm/", example: "Come here!" },
    { en: "see", ru: "видеть", phonetic: "/siː/", example: "I see a cat." },
    { en: "want", ru: "хотеть", phonetic: "/wɒnt/", example: "I want food." },
    { en: "have", ru: "иметь", phonetic: "/hæv/", example: "I have a book." },
    { en: "need", ru: "нуждаться", phonetic: "/niːd/", example: "I need water." },
    { en: "know", ru: "знать", phonetic: "/noʊ/", example: "I know the answer." },
    { en: "think", ru: "думать", phonetic: "/θɪŋk/", example: "I think so." },
    { en: "look", ru: "смотреть", phonetic: "/lʊk/", example: "Look at this!" }
  ],
  10: [
    { en: "man", ru: "мужчина", phonetic: "/mæn/", example: "A good man." },
    { en: "woman", ru: "женщина", phonetic: "/ˈwʊmən/", example: "A nice woman." },
    { en: "boy", ru: "мальчик", phonetic: "/bɔɪ/", example: "A small boy." },
    { en: "girl", ru: "девочка", phonetic: "/ɡɜːrl/", example: "A happy girl." },
    { en: "child", ru: "ребёнок", phonetic: "/tʃaɪld/", example: "A good child." },
    { en: "people", ru: "люди", phonetic: "/ˈpiːpl/", example: "Good people." },
    { en: "person", ru: "человек", phonetic: "/ˈpɜːrsn/", example: "A nice person." },
    { en: "teacher", ru: "учитель", phonetic: "/ˈtiːtʃər/", example: "A good teacher." },
    { en: "student", ru: "студент", phonetic: "/ˈstuːdənt/", example: "I am a student." },
    { en: "doctor", ru: "врач", phonetic: "/ˈdɒktər/", example: "She is a doctor." },
    { en: "work", ru: "работать", phonetic: "/wɜːrk/", example: "I work every day." },
    { en: "school", ru: "школа", phonetic: "/skuːl/", example: "I go to school." }
  ],
  11: [
    { en: "day", ru: "день", phonetic: "/deɪ/", example: "A good day." },
    { en: "night", ru: "ночь", phonetic: "/naɪt/", example: "Good night!" },
    { en: "morning", ru: "утро", phonetic: "/ˈmɔːrnɪŋ/", example: "Good morning!" },
    { en: "today", ru: "сегодня", phonetic: "/təˈdeɪ/", example: "Today is good." },
    { en: "time", ru: "время", phonetic: "/taɪm/", example: "What time?" },
    { en: "year", ru: "год", phonetic: "/jɪr/", example: "This year." },
    { en: "week", ru: "неделя", phonetic: "/wiːk/", example: "This week." },
    { en: "hour", ru: "час", phonetic: "/aʊər/", example: "One hour." },
    { en: "now", ru: "сейчас", phonetic: "/naʊ/", example: "I am busy now." },
    { en: "early", ru: "рано", phonetic: "/ˈɜːrli/", example: "I wake up early." },
    { en: "late", ru: "поздно", phonetic: "/leɪt/", example: "I am late." },
    { en: "every", ru: "каждый", phonetic: "/ˈevri/", example: "Every day." }
  ],
  12: [
    { en: "up", ru: "вверх", phonetic: "/ʌp/", example: "Get up!" },
    { en: "down", ru: "вниз", phonetic: "/daʊn/", example: "Sit down!" },
    { en: "get", ru: "получать, становиться", phonetic: "/ɡet/", example: "I get up early." },
    { en: "make", ru: "делать, создавать", phonetic: "/meɪk/", example: "I make food." },
    { en: "take", ru: "брать", phonetic: "/teɪk/", example: "Take a book." },
    { en: "give", ru: "давать", phonetic: "/ɡɪv/", example: "Give me water." },
    { en: "say", ru: "говорить, сказать", phonetic: "/seɪ/", example: "Say hello!" },
    { en: "tell", ru: "рассказывать", phonetic: "/tel/", example: "Tell me!" },
    { en: "ask", ru: "спрашивать", phonetic: "/æsk/", example: "Ask a question." },
    { en: "help", ru: "помогать", phonetic: "/help/", example: "Help me, please." },
    { en: "try", ru: "пытаться", phonetic: "/traɪ/", example: "Try again!" },
    { en: "use", ru: "использовать", phonetic: "/juːz/", example: "I use a pen." }
  ],
  13: [
    { en: "breakfast", ru: "завтрак", phonetic: "/ˈbrekfəst/", example: "I eat breakfast." },
    { en: "lunch", ru: "обед", phonetic: "/lʌntʃ/", example: "I eat lunch." },
    { en: "dinner", ru: "ужин", phonetic: "/ˈdɪnər/", example: "I eat dinner." },
    { en: "bread", ru: "хлеб", phonetic: "/bred/", example: "I eat bread." },
    { en: "milk", ru: "молоко", phonetic: "/mɪlk/", example: "I drink milk." },
    { en: "tea", ru: "чай", phonetic: "/tiː/", example: "I drink tea." },
    { en: "coffee", ru: "кофе", phonetic: "/ˈkɒfi/", example: "I drink coffee." },
    { en: "apple", ru: "яблоко", phonetic: "/ˈæpl/", example: "I eat an apple." },
    { en: "egg", ru: "яйцо", phonetic: "/eɡ/", example: "I eat an egg." },
    { en: "rice", ru: "рис", phonetic: "/raɪs/", example: "I eat rice." },
    { en: "meat", ru: "мясо", phonetic: "/miːt/", example: "I eat meat." },
    { en: "fish", ru: "рыба", phonetic: "/fɪʃ/", example: "I eat fish." }
  ],
  14: [
    { en: "room", ru: "комната", phonetic: "/ruːm/", example: "A big room." },
    { en: "kitchen", ru: "кухня", phonetic: "/ˈkɪtʃɪn/", example: "In the kitchen." },
    { en: "bedroom", ru: "спальня", phonetic: "/ˈbedruːm/", example: "In the bedroom." },
    { en: "bathroom", ru: "ванная", phonetic: "/ˈbæθruːm/", example: "In the bathroom." },
    { en: "bed", ru: "кровать", phonetic: "/bed/", example: "I sleep in bed." },
    { en: "window", ru: "окно", phonetic: "/ˈwɪndoʊ/", example: "Open the window." },
    { en: "light", ru: "свет, лампа", phonetic: "/laɪt/", example: "Turn on the light." },
    { en: "home", ru: "дом (родной)", phonetic: "/hoʊm/", example: "I go home." },
    { en: "live", ru: "жить", phonetic: "/lɪv/", example: "I live here." },
    { en: "open", ru: "открывать", phonetic: "/ˈoʊpən/", example: "Open the door." },
    { en: "close", ru: "закрывать", phonetic: "/kloʊz/", example: "Close the door." },
    { en: "clean", ru: "чистый, убирать", phonetic: "/kliːn/", example: "Clean the room." }
  ],
  15: [
    { en: "read", ru: "читать", phonetic: "/riːd/", example: "I read a book." },
    { en: "write", ru: "писать", phonetic: "/raɪt/", example: "I write a letter." },
    { en: "study", ru: "учиться", phonetic: "/ˈstʌdi/", example: "I study English." },
    { en: "learn", ru: "учить, изучать", phonetic: "/lɜːrn/", example: "I learn English." },
    { en: "play", ru: "играть", phonetic: "/pleɪ/", example: "I play football." },
    { en: "watch", ru: "смотреть (ТВ)", phonetic: "/wɒtʃ/", example: "I watch TV." },
    { en: "listen", ru: "слушать", phonetic: "/ˈlɪsn/", example: "I listen to music." },
    { en: "music", ru: "музыка", phonetic: "/ˈmjuːzɪk/", example: "I like music." },
    { en: "movie", ru: "фильм", phonetic: "/ˈmuːvi/", example: "I watch a movie." },
    { en: "game", ru: "игра", phonetic: "/ɡeɪm/", example: "I play a game." },
    { en: "sport", ru: "спорт", phonetic: "/spɔːrt/", example: "I like sport." },
    { en: "walk", ru: "гулять, ходить", phonetic: "/wɔːk/", example: "I walk in the park." }
  ],
  16: [
    { en: "can", ru: "мочь, уметь", phonetic: "/kæn/", example: "I can swim." },
    { en: "run", ru: "бегать", phonetic: "/rʌn/", example: "I can run fast." },
    { en: "swim", ru: "плавать", phonetic: "/swɪm/", example: "I can swim." },
    { en: "dance", ru: "танцевать", phonetic: "/dæns/", example: "I can dance." },
    { en: "sing", ru: "петь", phonetic: "/sɪŋ/", example: "I can sing." },
    { en: "cook", ru: "готовить", phonetic: "/kʊk/", example: "I can cook." },
    { en: "drive", ru: "водить машину", phonetic: "/draɪv/", example: "I can drive." },
    { en: "speak", ru: "говорить (на языке)", phonetic: "/spiːk/", example: "I speak English." },
    { en: "draw", ru: "рисовать", phonetic: "/drɔː/", example: "I can draw." },
    { en: "paint", ru: "красить, рисовать", phonetic: "/peɪnt/", example: "I can paint." },
    { en: "fly", ru: "летать", phonetic: "/flaɪ/", example: "Birds can fly." },
    { en: "read", ru: "читать", phonetic: "/riːd/", example: "I can read." }
  ],
  17: [
    { en: "shop", ru: "магазин", phonetic: "/ʃɒp/", example: "I go to the shop." },
    { en: "buy", ru: "покупать", phonetic: "/baɪ/", example: "I buy food." },
    { en: "money", ru: "деньги", phonetic: "/ˈmʌni/", example: "I need money." },
    { en: "dollar", ru: "доллар", phonetic: "/ˈdɒlər/", example: "Five dollars." },
    { en: "price", ru: "цена", phonetic: "/praɪs/", example: "What is the price?" },
    { en: "cheap", ru: "дешёвый", phonetic: "/tʃiːp/", example: "It is cheap." },
    { en: "expensive", ru: "дорогой", phonetic: "/ɪkˈspensɪv/", example: "It is expensive." },
    { en: "sell", ru: "продавать", phonetic: "/sel/", example: "They sell food." },
    { en: "pay", ru: "платить", phonetic: "/peɪ/", example: "I pay money." },
    { en: "cost", ru: "стоить", phonetic: "/kɒst/", example: "How much does it cost?" },
    { en: "much", ru: "много (неисч.)", phonetic: "/mʌtʃ/", example: "How much?" },
    { en: "little", ru: "мало, маленький", phonetic: "/ˈlɪtl/", example: "A little water." }
  ],
  18: [
    { en: "city", ru: "город", phonetic: "/ˈsɪti/", example: "A big city." },
    { en: "street", ru: "улица", phonetic: "/striːt/", example: "A long street." },
    { en: "park", ru: "парк", phonetic: "/pɑːrk/", example: "I walk in the park." },
    { en: "bank", ru: "банк", phonetic: "/bæŋk/", example: "I go to the bank." },
    { en: "hospital", ru: "больница", phonetic: "/ˈhɒspɪtl/", example: "She is in the hospital." },
    { en: "market", ru: "рынок", phonetic: "/ˈmɑːrkɪt/", example: "I go to the market." },
    { en: "station", ru: "станция, вокзал", phonetic: "/ˈsteɪʃn/", example: "At the station." },
    { en: "bus", ru: "автобус", phonetic: "/bʌs/", example: "I take the bus." },
    { en: "train", ru: "поезд", phonetic: "/treɪn/", example: "I take the train." },
    { en: "bike", ru: "велосипед", phonetic: "/baɪk/", example: "I ride a bike." },
    { en: "taxi", ru: "такси", phonetic: "/ˈtæksi/", example: "I take a taxi." },
    { en: "stop", ru: "остановка, останавливаться", phonetic: "/stɒp/", example: "Bus stop." }
  ],
  19: [
    { en: "Monday", ru: "понедельник", phonetic: "/ˈmʌndeɪ/", example: "On Monday." },
    { en: "Tuesday", ru: "вторник", phonetic: "/ˈtuːzdeɪ/", example: "On Tuesday." },
    { en: "Wednesday", ru: "среда", phonetic: "/ˈwenzdeɪ/", example: "On Wednesday." },
    { en: "Thursday", ru: "четверг", phonetic: "/ˈθɜːrzdeɪ/", example: "On Thursday." },
    { en: "Friday", ru: "пятница", phonetic: "/ˈfraɪdeɪ/", example: "On Friday." },
    { en: "Saturday", ru: "суббота", phonetic: "/ˈsætərdeɪ/", example: "On Saturday." },
    { en: "Sunday", ru: "воскресенье", phonetic: "/ˈsʌndeɪ/", example: "On Sunday." },
    { en: "weekend", ru: "выходные", phonetic: "/ˌwiːkˈend/", example: "On the weekend." },
    { en: "always", ru: "всегда", phonetic: "/ˈɔːlweɪz/", example: "I always eat breakfast." },
    { en: "sometimes", ru: "иногда", phonetic: "/ˈsʌmtaɪmz/", example: "I sometimes walk." },
    { en: "never", ru: "никогда", phonetic: "/ˈnevər/", example: "I never sleep late." },
    { en: "often", ru: "часто", phonetic: "/ˈɒfn/", example: "I often read." }
  ],
  20: [
    { en: "sun", ru: "солнце", phonetic: "/sʌn/", example: "The sun is hot." },
    { en: "rain", ru: "дождь", phonetic: "/reɪn/", example: "I see rain." },
    { en: "snow", ru: "снег", phonetic: "/snoʊ/", example: "I see snow." },
    { en: "wind", ru: "ветер", phonetic: "/wɪnd/", example: "The wind is cold." },
    { en: "hot", ru: "жаркий, горячий", phonetic: "/hɒt/", example: "It is hot." },
    { en: "cold", ru: "холодный", phonetic: "/koʊld/", example: "It is cold." },
    { en: "warm", ru: "тёплый", phonetic: "/wɔːrm/", example: "It is warm." },
    { en: "cool", ru: "прохладный", phonetic: "/kuːl/", example: "It is cool." },
    { en: "weather", ru: "погода", phonetic: "/ˈweðər/", example: "Good weather." },
    { en: "spring", ru: "весна", phonetic: "/sprɪŋ/", example: "In spring." },
    { en: "summer", ru: "лето", phonetic: "/ˈsʌmər/", example: "In summer." },
    { en: "autumn", ru: "осень", phonetic: "/ˈɔːtəm/", example: "In autumn." }
  ],
  21: [
    { en: "winter", ru: "зима", phonetic: "/ˈwɪntər/", example: "In winter." },
    { en: "January", ru: "январь", phonetic: "/ˈdʒænjueri/", example: "In January." },
    { en: "February", ru: "февраль", phonetic: "/ˈfebruəri/", example: "In February." },
    { en: "March", ru: "март", phonetic: "/mɑːrtʃ/", example: "In March." },
    { en: "April", ru: "апрель", phonetic: "/ˈeɪprəl/", example: "In April." },
    { en: "May", ru: "май", phonetic: "/meɪ/", example: "In May." },
    { en: "June", ru: "июнь", phonetic: "/dʒuːn/", example: "In June." },
    { en: "July", ru: "июль", phonetic: "/dʒʊˈlaɪ/", example: "In July." },
    { en: "August", ru: "август", phonetic: "/ˈɔːɡəst/", example: "In August." },
    { en: "September", ru: "сентябрь", phonetic: "/sepˈtembər/", example: "In September." },
    { en: "October", ru: "октябрь", phonetic: "/ɒkˈtoʊbər/", example: "In October." },
    { en: "November", ru: "ноябрь", phonetic: "/noʊˈvembər/", example: "In November." }
  ],
  22: [
    { en: "December", ru: "декабрь", phonetic: "/dɪˈsembər/", example: "In December." },
    { en: "birthday", ru: "день рождения", phonetic: "/ˈbɜːrθdeɪ/", example: "Happy birthday!" },
    { en: "age", ru: "возраст", phonetic: "/eɪdʒ/", example: "What is your age?" },
    { en: "young", ru: "молодой", phonetic: "/jʌŋ/", example: "She is young." },
    { en: "tall", ru: "высокий", phonetic: "/tɔːl/", example: "He is tall." },
    { en: "short", ru: "низкий, короткий", phonetic: "/ʃɔːrt/", example: "She is short." },
    { en: "long", ru: "длинный", phonetic: "/lɒŋ/", example: "A long road." },
    { en: "fast", ru: "быстрый", phonetic: "/fæst/", example: "A fast car." },
    { en: "slow", ru: "медленный", phonetic: "/sloʊ/", example: "A slow train." },
    { en: "easy", ru: "лёгкий, простой", phonetic: "/ˈiːzi/", example: "It is easy." },
    { en: "hard", ru: "трудный, твёрдый", phonetic: "/hɑːrd/", example: "It is hard." },
    { en: "beautiful", ru: "красивый", phonetic: "/ˈbjuːtɪfl/", example: "A beautiful flower." }
  ],
  23: [
    { en: "dog", ru: "собака", phonetic: "/dɒɡ/", example: "A big dog." },
    { en: "cat", ru: "кот", phonetic: "/kæt/", example: "A small cat." },
    { en: "bird", ru: "птица", phonetic: "/bɜːrd/", example: "A small bird." },
    { en: "horse", ru: "лошадь", phonetic: "/hɔːrs/", example: "A big horse." },
    { en: "cow", ru: "корова", phonetic: "/kaʊ/", example: "A brown cow." },
    { en: "rabbit", ru: "кролик", phonetic: "/ˈræbɪt/", example: "A white rabbit." },
    { en: "mouse", ru: "мышь", phonetic: "/maʊs/", example: "A small mouse." },
    { en: "tree", ru: "дерево", phonetic: "/triː/", example: "A big tree." },
    { en: "flower", ru: "цветок", phonetic: "/ˈflaʊər/", example: "A red flower." },
    { en: "grass", ru: "трава", phonetic: "/ɡræs/", example: "Green grass." },
    { en: "animal", ru: "животное", phonetic: "/ˈænɪml/", example: "I like animals." },
    { en: "pet", ru: "домашнее животное", phonetic: "/pet/", example: "I have a pet." }
  ],
  24: [
    { en: "head", ru: "голова", phonetic: "/hed/", example: "My head." },
    { en: "hand", ru: "рука (кисть)", phonetic: "/hænd/", example: "My hand." },
    { en: "eye", ru: "глаз", phonetic: "/aɪ/", example: "My eyes." },
    { en: "ear", ru: "ухо", phonetic: "/ɪr/", example: "My ears." },
    { en: "nose", ru: "нос", phonetic: "/noʊz/", example: "My nose." },
    { en: "mouth", ru: "рот", phonetic: "/maʊθ/", example: "My mouth." },
    { en: "arm", ru: "рука", phonetic: "/ɑːrm/", example: "My arm." },
    { en: "leg", ru: "нога", phonetic: "/leɡ/", example: "My leg." },
    { en: "foot", ru: "ступня", phonetic: "/fʊt/", example: "My foot." },
    { en: "hair", ru: "волосы", phonetic: "/her/", example: "My hair." },
    { en: "face", ru: "лицо", phonetic: "/feɪs/", example: "My face." },
    { en: "body", ru: "тело", phonetic: "/ˈbɒdi/", example: "My body." }
  ],
  25: [
    { en: "shirt", ru: "рубашка", phonetic: "/ʃɜːrt/", example: "A blue shirt." },
    { en: "dress", ru: "платье", phonetic: "/dres/", example: "A red dress." },
    { en: "shoes", ru: "туфли", phonetic: "/ʃuːz/", example: "My shoes." },
    { en: "hat", ru: "шляпа", phonetic: "/hæt/", example: "A black hat." },
    { en: "coat", ru: "пальто", phonetic: "/koʊt/", example: "A warm coat." },
    { en: "jeans", ru: "джинсы", phonetic: "/dʒiːnz/", example: "My jeans." },
    { en: "socks", ru: "носки", phonetic: "/sɒks/", example: "My socks." },
    { en: "jacket", ru: "куртка", phonetic: "/ˈdʒækɪt/", example: "A new jacket." },
    { en: "wear", ru: "носить (одежду)", phonetic: "/wer/", example: "I wear a shirt." },
    { en: "put", ru: "класть, надевать", phonetic: "/pʊt/", example: "Put on your coat." },
    { en: "take off", ru: "снимать (одежду)", phonetic: "/teɪk ɒf/", example: "Take off your shoes." },
    { en: "size", ru: "размер", phonetic: "/saɪz/", example: "What size?" }
  ],
  26: [
    { en: "happy", ru: "счастливый", phonetic: "/ˈhæpi/", example: "I am happy." },
    { en: "sad", ru: "грустный", phonetic: "/sæd/", example: "I am sad." },
    { en: "angry", ru: "злой", phonetic: "/ˈæŋɡri/", example: "He is angry." },
    { en: "tired", ru: "уставший", phonetic: "/taɪərd/", example: "I am tired." },
    { en: "hungry", ru: "голодный", phonetic: "/ˈhʌŋɡri/", example: "I am hungry." },
    { en: "thirsty", ru: "хочу пить", phonetic: "/ˈθɜːrsti/", example: "I am thirsty." },
    { en: "sick", ru: "больной", phonetic: "/sɪk/", example: "I am sick." },
    { en: "well", ru: "здоровый, хорошо", phonetic: "/wel/", example: "I am well." },
    { en: "feel", ru: "чувствовать", phonetic: "/fiːl/", example: "I feel good." },
    { en: "better", ru: "лучше", phonetic: "/ˈbetər/", example: "I feel better." },
    { en: "better", ru: "лучше", phonetic: "/ˈbetər/", example: "Get better soon!" },
    { en: "rest", ru: "отдых", phonetic: "/rest/", example: "I need rest." }
  ],
  27: [
    { en: "tomorrow", ru: "завтра", phonetic: "/təˈmɒroʊ/", example: "See you tomorrow!" },
    { en: "yesterday", ru: "вчера", phonetic: "/ˈjestərdeɪ/", example: "Yesterday was good." },
    { en: "next", ru: "следующий", phonetic: "/nekst/", example: "Next week." },
    { en: "last", ru: "прошлый, последний", phonetic: "/læst/", example: "Last week." },
    { en: "soon", ru: "скоро", phonetic: "/suːn/", example: "See you soon!" },
    { en: "before", ru: "до, перед", phonetic: "/bɪˈfɔːr/", example: "Before lunch." },
    { en: "after", ru: "после", phonetic: "/ˈæftər/", example: "After school." },
    { en: "first", ru: "первый", phonetic: "/fɜːrst/", example: "First, I eat." },
    { en: "second", ru: "второй", phonetic: "/ˈsekənd/", example: "Second, I go." },
    { en: "third", ru: "третий", phonetic: "/θɜːrd/", example: "Third, I sleep." },
    { en: "last", ru: "последний", phonetic: "/læst/", example: "Last, I read." },
    { en: "then", ru: "потом, тогда", phonetic: "/ðen/", example: "Then I go home." }
  ],
  28: [
    { en: "under", ru: "под", phonetic: "/ˈʌndər/", example: "Under the table." },
    { en: "above", ru: "над", phonetic: "/əˈbʌv/", example: "Above the door." },
    { en: "between", ru: "между", phonetic: "/bɪˈtwiːn/", example: "Between two chairs." },
    { en: "next to", ru: "рядом с", phonetic: "/nekst tuː/", example: "Next to the bank." },
    { en: "near", ru: "близко", phonetic: "/nɪr/", example: "Near the park." },
    { en: "far", ru: "далеко", phonetic: "/fɑːr/", example: "Far from home." },
    { en: "left", ru: "лево", phonetic: "/left/", example: "Turn left." },
    { en: "right", ru: "право", phonetic: "/raɪt/", example: "Turn right." },
    { en: "front", ru: "перед", phonetic: "/frʌnt/", example: "In front of the house." },
    { en: "back", ru: "назад, спина", phonetic: "/bæk/", example: "Go back!" },
    { en: "across", ru: "через", phonetic: "/əˈkrɒs/", example: "Across the street." },
    { en: "into", ru: "внутрь", phonetic: "/ˈɪntuː/", example: "Go into the room." }
  ],
  29: [
    { en: "all", ru: "все, всё", phonetic: "/ɔːl/", example: "All people." },
    { en: "some", ru: "некоторые, немного", phonetic: "/sʌm/", example: "Some food." },
    { en: "any", ru: "любой, какой-нибудь", phonetic: "/ˈeni/", example: "Any book." },
    { en: "no", ru: "никакой, нет", phonetic: "/noʊ/", example: "No water." },
    { en: "every", ru: "каждый", phonetic: "/ˈevri/", example: "Every day." },
    { en: "each", ru: "каждый (отдельно)", phonetic: "/iːtʃ/", example: "Each person." },
    { en: "both", ru: "оба", phonetic: "/boʊθ/", example: "Both books." },
    { en: "other", ru: "другой", phonetic: "/ˈʌðər/", example: "The other book." },
    { en: "another", ru: "ещё один", phonetic: "/əˈnʌðər/", example: "Another book." },
    { en: "only", ru: "только", phonetic: "/ˈoʊnli/", example: "Only one." },
    { en: "very", ru: "очень", phonetic: "/ˈveri/", example: "Very good." },
    { en: "too", ru: "тоже, слишком", phonetic: "/tuː/", example: "Me too!" }
  ],
  30: [
    { en: "because", ru: "потому что", phonetic: "/bɪˈkɒz/", example: "Because I am hungry." },
    { en: "so", ru: "поэтому, так", phonetic: "/soʊ/", example: "I am tired, so I sleep." },
    { en: "if", ru: "если", phonetic: "/ɪf/", example: "If you want." },
    { en: "when", ru: "когда", phonetic: "/wen/", example: "When I go home." },
    { en: "why", ru: "почему", phonetic: "/waɪ/", example: "Why?" },
    { en: "about", ru: "о, про", phonetic: "/əˈbaʊt/", example: "Tell me about it." },
    { en: "with", ru: "с", phonetic: "/wɪð/", example: "I go with you." },
    { en: "without", ru: "без", phonetic: "/wɪˈðaʊt/", example: "Without water." },
    { en: "for", ru: "для", phonetic: "/fɔːr/", example: "This is for you." },
    { en: "of", ru: "из, от", phonetic: "/ɒv/", example: "A cup of tea." },
    { en: "to", ru: "к, в (направление)", phonetic: "/tuː/", example: "I go to school." },
    { en: "at", ru: "в, у, при", phonetic: "/æt/", example: "At home." }
  ],
  31: [
    { en: "hundred", ru: "сто", phonetic: "/ˈhʌndrəd/", example: "One hundred." },
    { en: "thousand", ru: "тысяча", phonetic: "/ˈθaʊzənd/", example: "One thousand." },
    { en: "eleven", ru: "одиннадцать", phonetic: "/ɪˈlevən/", example: "Eleven people." },
    { en: "twelve", ru: "двенадцать", phonetic: "/twelv/", example: "Twelve months." },
    { en: "thirteen", ru: "тринадцать", phonetic: "/ˌθɜːrˈtiːn/", example: "Thirteen years." },
    { en: "fourteen", ru: "четырнадцать", phonetic: "/ˌfɔːrˈtiːn/", example: "Fourteen days." },
    { en: "fifteen", ru: "пятнадцать", phonetic: "/ˌfɪfˈtiːn/", example: "Fifteen minutes." },
    { en: "twenty", ru: "двадцать", phonetic: "/ˈtwenti/", example: "Twenty dollars." },
    { en: "thirty", ru: "тридцать", phonetic: "/ˈθɜːrti/", example: "Thirty people." },
    { en: "forty", ru: "сорок", phonetic: "/ˈfɔːrti/", example: "Forty students." },
    { en: "fifty", ru: "пятьдесят", phonetic: "/ˈfɪfti/", example: "Fifty books." },
    { en: "zero", ru: "ноль", phonetic: "/ˈzɪroʊ/", example: "Zero problems." }
  ],
  32: [
    { en: "job", ru: "работа", phonetic: "/dʒɒb/", example: "A good job." },
    { en: "nurse", ru: "медсестра", phonetic: "/nɜːrs/", example: "She is a nurse." },
    { en: "driver", ru: "водитель", phonetic: "/ˈdraɪvər/", example: "He is a driver." },
    { en: "cook", ru: "повар", phonetic: "/kʊk/", example: "She is a cook." },
    { en: "police", ru: "полиция", phonetic: "/pəˈliːs/", example: "The police." },
    { en: "artist", ru: "художник", phonetic: "/ˈɑːrtɪst/", example: "He is an artist." },
    { en: "engineer", ru: "инженер", phonetic: "/ˌendʒɪˈnɪr/", example: "She is an engineer." },
    { en: "manager", ru: "менеджер", phonetic: "/ˈmænɪdʒər/", example: "He is a manager." },
    { en: "waiter", ru: "официант", phonetic: "/ˈweɪtər/", example: "He is a waiter." },
    { en: "farmer", ru: "фермер", phonetic: "/ˈfɑːrmər/", example: "He is a farmer." },
    { en: "pilot", ru: "пилот", phonetic: "/ˈpaɪlət/", example: "She is a pilot." },
    { en: "lawyer", ru: "адвокат", phonetic: "/ˈlɔːjər/", example: "He is a lawyer." }
  ],
  33: [
    { en: "computer", ru: "компьютер", phonetic: "/kəmˈpjuːtər/", example: "My computer." },
    { en: "internet", ru: "интернет", phonetic: "/ˈɪntərnet/", example: "On the internet." },
    { en: "email", ru: "электронная почта", phonetic: "/ˈiːmeɪl/", example: "Send an email." },
    { en: "message", ru: "сообщение", phonetic: "/ˈmesɪdʒ/", example: "A message." },
    { en: "photo", ru: "фото", phonetic: "/ˈfoʊtoʊ/", example: "A photo." },
    { en: "video", ru: "видео", phonetic: "/ˈvɪdioʊ/", example: "A video." },
    { en: "screen", ru: "экран", phonetic: "/skriːn/", example: "The screen." },
    { en: "keyboard", ru: "клавиатура", phonetic: "/ˈkiːbɔːrd/", example: "A keyboard." },
    { en: "mouse", ru: "мышь (комп.)", phonetic: "/maʊs/", example: "A computer mouse." },
    { en: "camera", ru: "камера", phonetic: "/ˈkæmərə/", example: "A camera." },
    { en: "radio", ru: "радио", phonetic: "/ˈreɪdioʊ/", example: "On the radio." },
    { en: "TV", ru: "телевизор", phonetic: "/ˌtiːˈviː/", example: "On TV." }
  ],
  34: [
    { en: "plane", ru: "самолёт", phonetic: "/pleɪn/", example: "By plane." },
    { en: "ship", ru: "корабль", phonetic: "/ʃɪp/", example: "By ship." },
    { en: "boat", ru: "лодка", phonetic: "/boʊt/", example: "A small boat." },
    { en: "ticket", ru: "билет", phonetic: "/ˈtɪkɪt/", example: "A ticket." },
    { en: "travel", ru: "путешествовать", phonetic: "/ˈtrævl/", example: "I travel by bus." },
    { en: "trip", ru: "поездка", phonetic: "/trɪp/", example: "A good trip." },
    { en: "hotel", ru: "отель", phonetic: "/hoʊˈtel/", example: "A hotel." },
    { en: "map", ru: "карта", phonetic: "/mæp/", example: "A map." },
    { en: "passport", ru: "паспорт", phonetic: "/ˈpɑːspɔːrt/", example: "My passport." },
    { en: "luggage", ru: "багаж", phonetic: "/ˈlʌɡɪdʒ/", example: "My luggage." },
    { en: "country", ru: "страна", phonetic: "/ˈkʌntri/", example: "A big country." },
    { en: "world", ru: "мир, мир", phonetic: "/wɜːrld/", example: "The world." }
  ],
  35: [
    { en: "restaurant", ru: "ресторан", phonetic: "/ˈrestərɒnt/", example: "At the restaurant." },
    { en: "menu", ru: "меню", phonetic: "/ˈmenjuː/", example: "The menu." },
    { en: "order", ru: "заказывать", phonetic: "/ˈɔːrdər/", example: "I order food." },
    { en: "plate", ru: "тарелка", phonetic: "/pleɪt/", example: "A plate." },
    { en: "glass", ru: "стакан", phonetic: "/ɡlæs/", example: "A glass of water." },
    { en: "cup", ru: "чашка", phonetic: "/kʌp/", example: "A cup of tea." },
    { en: "spoon", ru: "ложка", phonetic: "/spuːn/", example: "A spoon." },
    { en: "fork", ru: "вилка", phonetic: "/fɔːrk/", example: "A fork." },
    { en: "knife", ru: "нож", phonetic: "/naɪf/", example: "A knife." },
    { en: "salt", ru: "соль", phonetic: "/sɔːlt/", example: "Salt, please." },
    { en: "sugar", ru: "сахар", phonetic: "/ˈʃʊɡər/", example: "Sugar, please." },
    { en: "bill", ru: "счёт", phonetic: "/bɪl/", example: "The bill, please." }
  ],
  36: [
    { en: "cheese", ru: "сыр", phonetic: "/tʃiːz/", example: "I like cheese." },
    { en: "butter", ru: "масло", phonetic: "/ˈbʌtər/", example: "Butter and bread." },
    { en: "soup", ru: "суп", phonetic: "/suːp/", example: "Hot soup." },
    { en: "salad", ru: "салат", phonetic: "/ˈsæləd/", example: "A fresh salad." },
    { en: "chicken", ru: "курица", phonetic: "/ˈtʃɪkɪn/", example: "I eat chicken." },
    { en: "potato", ru: "картошка", phonetic: "/pəˈteɪtoʊ/", example: "A potato." },
    { en: "tomato", ru: "помидор", phonetic: "/təˈmeɪtoʊ/", example: "A tomato." },
    { en: "orange", ru: "апельсин", phonetic: "/ˈɒrɪndʒ/", example: "An orange." },
    { en: "banana", ru: "банан", phonetic: "/bəˈnænə/", example: "A banana." },
    { en: "cake", ru: "торт", phonetic: "/keɪk/", example: "A cake." },
    { en: "ice cream", ru: "мороженое", phonetic: "/aɪs kriːm/", example: "Ice cream!" },
    { en: "chocolate", ru: "шоколад", phonetic: "/ˈtʃɒklət/", example: "I like chocolate." }
  ],
  37: [
    { en: "will", ru: "буду (будущее время)", phonetic: "/wɪl/", example: "I will go." },
    { en: "plan", ru: "план", phonetic: "/plæn/", example: "My plan." },
    { en: "hope", ru: "надеяться", phonetic: "/hoʊp/", example: "I hope so." },
    { en: "wish", ru: "желать", phonetic: "/wɪʃ/", example: "I wish you well." },
    { en: "dream", ru: "мечта, сон", phonetic: "/driːm/", example: "My dream." },
    { en: "future", ru: "будущее", phonetic: "/ˈfjuːtʃər/", example: "In the future." },
    { en: "ready", ru: "готовый", phonetic: "/ˈredi/", example: "I am ready." },
    { en: "start", ru: "начинать", phonetic: "/stɑːrt/", example: "Start now!" },
    { en: "finish", ru: "заканчивать", phonetic: "/ˈfɪnɪʃ/", example: "Finish the book." },
    { en: "begin", ru: "начинать", phonetic: "/bɪˈɡɪn/", example: "Begin now!" },
    { en: "end", ru: "конец", phonetic: "/end/", example: "The end." },
    { en: "wait", ru: "ждать", phonetic: "/weɪt/", example: "Wait for me!" }
  ],
  38: [
    { en: "call", ru: "звонить", phonetic: "/kɔːl/", example: "Call me!" },
    { en: "answer", ru: "отвечать", phonetic: "/ˈænsər/", example: "Answer the phone." },
    { en: "question", ru: "вопрос", phonetic: "/ˈkwestʃən/", example: "A question." },
    { en: "idea", ru: "идея", phonetic: "/aɪˈdɪə/", example: "A good idea." },
    { en: "problem", ru: "проблема", phonetic: "/ˈprɒbləm/", example: "A problem." },
    { en: "thing", ru: "вещь", phonetic: "/θɪŋ/", example: "One thing." },
    { en: "way", ru: "путь, способ", phonetic: "/weɪ/", example: "This way." },
    { en: "place", ru: "место", phonetic: "/pleɪs/", example: "A nice place." },
    { en: "point", ru: "точка, смысл", phonetic: "/pɔɪnt/", example: "A good point." },
    { en: "part", ru: "часть", phonetic: "/pɑːrt/", example: "A part of the book." },
    { en: "side", ru: "сторона", phonetic: "/saɪd/", example: "This side." },
    { en: "kind", ru: "вид, добрый", phonetic: "/kaɪnd/", example: "What kind?" }
  ],
  39: [
    { en: "turn", ru: "поворачивать", phonetic: "/tɜːrn/", example: "Turn left." },
    { en: "cross", ru: "пересекать", phonetic: "/krɒs/", example: "Cross the street." },
    { en: "follow", ru: "следовать", phonetic: "/ˈfɒloʊ/", example: "Follow me!" },
    { en: "show", ru: "показывать", phonetic: "/ʃoʊ/", example: "Show me!" },
    { en: "find", ru: "находить", phonetic: "/faɪnd/", example: "I find the key." },
    { en: "lose", ru: "терять", phonetic: "/luːz/", example: "I lose my key." },
    { en: "bring", ru: "приносить", phonetic: "/brɪŋ/", example: "Bring me water." },
    { en: "carry", ru: "нести", phonetic: "/ˈkæri/", example: "I carry the bag." },
    { en: "hold", ru: "держать", phonetic: "/hoʊld/", example: "Hold my hand." },
    { en: "move", ru: "двигаться", phonetic: "/muːv/", example: "Move the chair." },
    { en: "stand", ru: "стоять", phonetic: "/stænd/", example: "Stand up!" },
    { en: "sit", ru: "сидеть", phonetic: "/sɪt/", example: "Sit down!" }
  ],
  40: [
    { en: "remember", ru: "помнить", phonetic: "/rɪˈmembər/", example: "I remember." },
    { en: "forget", ru: "забывать", phonetic: "/fərˈɡet/", example: "Don't forget!" },
    { en: "understand", ru: "понимать", phonetic: "/ˌʌndərˈstænd/", example: "I understand." },
    { en: "believe", ru: "верить", phonetic: "/bɪˈliːv/", example: "I believe you." },
    { en: "mean", ru: "означать", phonetic: "/miːn/", example: "What does it mean?" },
    { en: "sound", ru: "звучать", phonetic: "/saʊnd/", example: "It sounds good." },
    { en: "seem", ru: "казаться", phonetic: "/siːm/", example: "It seems good." },
    { en: "happen", ru: "случаться", phonetic: "/ˈhæpən/", example: "What happened?" },
    { en: "change", ru: "менять", phonetic: "/tʃeɪndʒ/", example: "Change the book." },
    { en: "keep", ru: "хранить", phonetic: "/kiːp/", example: "Keep the key." },
    { en: "let", ru: "позволять", phonetic: "/let/", example: "Let me go!" },
    { en: "begin", ru: "начинать", phonetic: "/bɪˈɡɪn/", example: "Let's begin!" }
  ],
  41: [
    { en: "always", ru: "всегда", phonetic: "/ˈɔːlweɪz/", example: "I always eat." },
    { en: "usually", ru: "обычно", phonetic: "/ˈjuːʒuəli/", example: "I usually walk." },
    { en: "often", ru: "часто", phonetic: "/ˈɒfn/", example: "I often read." },
    { en: "sometimes", ru: "иногда", phonetic: "/ˈsʌmtaɪmz/", example: "I sometimes cook." },
    { en: "rarely", ru: "редко", phonetic: "/ˈrerli/", example: "I rarely sleep late." },
    { en: "never", ru: "никогда", phonetic: "/ˈnevər/", example: "I never smoke." },
    { en: "again", ru: "снова", phonetic: "/əˈɡen/", example: "Do it again!" },
    { en: "already", ru: "уже", phonetic: "/ɔːlˈredi/", example: "I already know." },
    { en: "still", ru: "всё ещё", phonetic: "/stɪl/", example: "I am still here." },
    { en: "just", ru: "просто, только что", phonetic: "/dʒʌst/", example: "I just eat." },
    { en: "really", ru: "действительно", phonetic: "/ˈriːəli/", example: "I really like it." },
    { en: "quite", ru: "довольно", phonetic: "/kwaɪt/", example: "Quite good." }
  ],
  42: [
    { en: "more", ru: "больше", phonetic: "/mɔːr/", example: "More water." },
    { en: "most", ru: "больше всего", phonetic: "/moʊst/", example: "Most people." },
    { en: "less", ru: "меньше", phonetic: "/les/", example: "Less food." },
    { en: "few", ru: "немного", phonetic: "/fjuː/", example: "A few books." },
    { en: "enough", ru: "достаточно", phonetic: "/ɪˈnʌf/", example: "Enough food." },
    { en: "than", ru: "чем (при сравнении)", phonetic: "/ðæn/", example: "Bigger than." },
    { en: "same", ru: "такой же", phonetic: "/seɪm/", example: "The same book." },
    { en: "different", ru: "другой, разный", phonetic: "/ˈdɪfrənt/", example: "A different book." },
    { en: "better", ru: "лучше", phonetic: "/ˈbetər/", example: "Better than before." },
    { en: "worse", ru: "хуже", phonetic: "/wɜːrs/", example: "Worse than before." },
    { en: "best", ru: "лучший", phonetic: "/best/", example: "The best book." },
    { en: "worst", ru: "худший", phonetic: "/wɜːrst/", example: "The worst day." }
  ],
  43: [
    { en: "hobby", ru: "хобби", phonetic: "/ˈhɒbi/", example: "My hobby." },
    { en: "fun", ru: "веселье", phonetic: "/fʌn/", example: "It is fun!" },
    { en: "interesting", ru: "интересный", phonetic: "/ˈɪntrəstɪŋ/", example: "An interesting book." },
    { en: "boring", ru: "скучный", phonetic: "/ˈbɔːrɪŋ/", example: "A boring movie." },
    { en: "exciting", ru: "захватывающий", phonetic: "/ɪkˈsaɪtɪŋ/", example: "An exciting game." },
    { en: "free", ru: "свободный, бесплатный", phonetic: "/friː/", example: "Free time." },
    { en: "busy", ru: "занятый", phonetic: "/ˈbɪzi/", example: "I am busy." },
    { en: "alone", ru: "один, в одиночку", phonetic: "/əˈloʊn/", example: "I am alone." },
    { en: "together", ru: "вместе", phonetic: "/təˈɡeðər/", example: "We are together." },
    { en: "also", ru: "также", phonetic: "/ˈɔːlsoʊ/", example: "I also like it." },
    { en: "too", ru: "тоже", phonetic: "/tuː/", example: "Me too!" },
    { en: "either", ru: "тоже (отриц.)", phonetic: "/ˈiːðər/", example: "Me either." }
  ],
  44: [
    { en: "holiday", ru: "праздник, каникулы", phonetic: "/ˈhɒlədeɪ/", example: "Happy holiday!" },
    { en: "party", ru: "вечеринка", phonetic: "/ˈpɑːrti/", example: "A party." },
    { en: "gift", ru: "подарок", phonetic: "/ɡɪft/", example: "A gift." },
    { en: "present", ru: "подарок", phonetic: "/ˈpreznt/", example: "A present." },
    { en: "celebrate", ru: "праздновать", phonetic: "/ˈselɪbreɪt/", example: "We celebrate." },
    { en: "happy", ru: "счастливый", phonetic: "/ˈhæpi/", example: "Happy birthday!" },
    { en: "special", ru: "особенный", phonetic: "/ˈspeʃl/", example: "A special day." },
    { en: "important", ru: "важный", phonetic: "/ɪmˈpɔːrtənt/", example: "An important day." },
    { en: "family", ru: "семья", phonetic: "/ˈfæmɪli/", example: "With my family." },
    { en: "together", ru: "вместе", phonetic: "/təˈɡeðər/", example: "Together at home." },
    { en: "fun", ru: "весёлый", phonetic: "/fʌn/", example: "It is fun!" },
    { en: "remember", ru: "помнить", phonetic: "/rɪˈmembər/", example: "I remember this day." }
  ],
  45: [
    { en: "morning", ru: "утро", phonetic: "/ˈmɔːrnɪŋ/", example: "Every morning." },
    { en: "afternoon", ru: "день (после обеда)", phonetic: "/ˌæftərˈnuːn/", example: "In the afternoon." },
    { en: "evening", ru: "вечер", phonetic: "/ˈiːvnɪŋ/", example: "In the evening." },
    { en: "o'clock", ru: "часов", phonetic: "/əˈklɒk/", example: "At 7 o'clock." },
    { en: "half", ru: "половина", phonetic: "/hæf/", example: "Half past seven." },
    { en: "quarter", ru: "четверть", phonetic: "/ˈkwɔːrtər/", example: "A quarter past." },
    { en: "minute", ru: "минута", phonetic: "/ˈmɪnɪt/", example: "Five minutes." },
    { en: "second", ru: "секунда", phonetic: "/ˈsekənd/", example: "One second." },
    { en: "quick", ru: "быстрый", phonetic: "/kwɪk/", example: "A quick walk." },
    { en: "slow", ru: "медленный", phonetic: "/sloʊ/", example: "A slow walk." },
    { en: "early", ru: "рано", phonetic: "/ˈɜːrli/", example: "I wake up early." },
    { en: "late", ru: "поздно", phonetic: "/leɪt/", example: "I am late." }
  ],
  46: [
    { en: "paper", ru: "бумага", phonetic: "/ˈpeɪpər/", example: "A paper." },
    { en: "letter", ru: "письмо", phonetic: "/ˈletər/", example: "A letter." },
    { en: "word", ru: "слово", phonetic: "/wɜːrd/", example: "A new word." },
    { en: "sentence", ru: "предложение", phonetic: "/ˈsentəns/", example: "A sentence." },
    { en: "page", ru: "страница", phonetic: "/peɪdʒ/", example: "A page." },
    { en: "picture", ru: "картинка", phonetic: "/ˈpɪktʃər/", example: "A picture." },
    { en: "story", ru: "история", phonetic: "/ˈstɔːri/", example: "A story." },
    { en: "news", ru: "новости", phonetic: "/nuːz/", example: "The news." },
    { en: "language", ru: "язык", phonetic: "/ˈlæŋɡwɪdʒ/", example: "English language." },
    { en: "English", ru: "английский", phonetic: "/ˈɪŋɡlɪʃ/", example: "I study English." },
    { en: "Russian", ru: "русский", phonetic: "/ˈrʌʃn/", example: "I speak Russian." },
    { en: "easy", ru: "лёгкий", phonetic: "/ˈiːzi/", example: "English is easy." }
  ],
  47: [
    { en: "exercise", ru: "упражнение", phonetic: "/ˈeksərsaɪz/", example: "An exercise." },
    { en: "test", ru: "тест", phonetic: "/test/", example: "A test." },
    { en: "exam", ru: "экзамен", phonetic: "/ɪɡˈzæm/", example: "An exam." },
    { en: "homework", ru: "домашнее задание", phonetic: "/ˈhoʊmwɜːrk/", example: "My homework." },
    { en: "practice", ru: "практика", phonetic: "/ˈpræktɪs/", example: "Practice English." },
    { en: "improve", ru: "улучшать", phonetic: "/ɪmˈpruːv/", example: "I improve my English." },
    { en: "progress", ru: "прогресс", phonetic: "/ˈprɒɡres/", example: "Good progress." },
    { en: "mistake", ru: "ошибка", phonetic: "/mɪˈsteɪk/", example: "A mistake." },
    { en: "correct", ru: "правильный", phonetic: "/kəˈrekt/", example: "The correct answer." },
    { en: "wrong", ru: "неправильный", phonetic: "/rɒŋ/", example: "The wrong answer." },
    { en: "right", ru: "правильный", phonetic: "/raɪt/", example: "You are right!" },
    { en: "score", ru: "очки, счёт", phonetic: "/skɔːr/", example: "A good score." }
  ],
  48: [
    { en: "friend", ru: "друг", phonetic: "/frend/", example: "My best friend." },
    { en: "best", ru: "лучший", phonetic: "/best/", example: "My best friend." },
    { en: "meet", ru: "встречать", phonetic: "/miːt/", example: "Nice to meet you!" },
    { en: "talk", ru: "разговаривать", phonetic: "/tɔːk/", example: "We talk every day." },
    { en: "chat", ru: "болтать", phonetic: "/tʃæt/", example: "We chat online." },
    { en: "share", ru: "делиться", phonetic: "/ʃer/", example: "I share my food." },
    { en: "laugh", ru: "смеяться", phonetic: "/læf/", example: "We laugh together." },
    { en: "smile", ru: "улыбаться", phonetic: "/smaɪl/", example: "She smiles." },
    { en: "cry", ru: "плакать", phonetic: "/kraɪ/", example: "Don't cry!" },
    { en: "help", ru: "помощь", phonetic: "/help/", example: "I need help." },
    { en: "care", ru: "заботиться", phonetic: "/ker/", example: "I care about you." },
    { en: "trust", ru: "доверять", phonetic: "/trʌst/", example: "I trust you." }
  ],
  49: [
    { en: "everything", ru: "всё", phonetic: "/ˈevriθɪŋ/", example: "Everything is good." },
    { en: "something", ru: "что-то", phonetic: "/ˈsʌmθɪŋ/", example: "Something is wrong." },
    { en: "nothing", ru: "ничего", phonetic: "/ˈnʌθɪŋ/", example: "Nothing is wrong." },
    { en: "anything", ru: "что-нибудь", phonetic: "/ˈeniθɪŋ/", example: "Anything is possible." },
    { en: "everyone", ru: "все (люди)", phonetic: "/ˈevriwʌn/", example: "Everyone is here." },
    { en: "someone", ru: "кто-то", phonetic: "/ˈsʌmwʌn/", example: "Someone is here." },
    { en: "nobody", ru: "никто", phonetic: "/ˈnoʊbədi/", example: "Nobody is here." },
    { en: "everywhere", ru: "везде", phonetic: "/ˈevriwer/", example: "Everywhere is good." },
    { en: "somewhere", ru: "где-то", phonetic: "/ˈsʌmwer/", example: "Somewhere near." },
    { en: "nowhere", ru: "нигде", phonetic: "/ˈnoʊwer/", example: "Nowhere to go." },
    { en: "myself", ru: "себя", phonetic: "/maɪˈself/", example: "I do it myself." },
    { en: "yourself", ru: "себя (ты)", phonetic: "/jʊrˈself/", example: "Do it yourself!" }
  ],
  50: [
    { en: "life", ru: "жизнь", phonetic: "/laɪf/", example: "A good life." },
    { en: "world", ru: "мир", phonetic: "/wɜːrld/", example: "The world." },
    { en: "story", ru: "история", phonetic: "/ˈstɔːri/", example: "My story." },
    { en: "dream", ru: "мечта", phonetic: "/driːm/", example: "My dream." },
    { en: "goal", ru: "цель", phonetic: "/ɡoʊl/", example: "My goal." },
    { en: "success", ru: "успех", phonetic: "/səkˈses/", example: "Success!" },
    { en: "hard", ru: "трудный", phonetic: "/hɑːrd/", example: "Hard work." },
    { en: "easy", ru: "лёгкий", phonetic: "/ˈiːzi/", example: "Easy work." },
    { en: "possible", ru: "возможный", phonetic: "/ˈpɒsəbl/", example: "Everything is possible." },
    { en: "impossible", ru: "невозможный", phonetic: "/ɪmˈpɒsəbl/", example: "Nothing is impossible." },
    { en: "thank", ru: "благодарить", phonetic: "/θæŋk/", example: "Thank you!" },
    { en: "love", ru: "любовь", phonetic: "/lʌv/", example: "I love English!" }
  ]
};

// ============================================================
// GRAMMAR PROGRESSION — based on Murphy Grammar in Use + Sound Grammar
// ============================================================

const grammarByLesson = {
  1: { topic: "Verb 'to be' — am/is/are", topicRu: "Глагол 'to be'", points: [
    { rule: "I am (I'm)", explanationRu: "Для местоимения 'I' используем 'am'. Сокращение: I'm.", examples: ["I am fine.", "I'm good.", "I am happy."] },
    { rule: "He/She/It is", explanationRu: "Для третьего лица — 'is'. Сокращения: He's, She's, It's.", examples: ["He is good.", "She's nice.", "It's fine."] },
    { rule: "You/We/They are", explanationRu: "Для you, we, they — 'are'. Сокращения: You're, We're, They're.", examples: ["You are nice.", "We're fine.", "They're good."] }
  ]},
  2: { topic: "Pronouns — I, you, he, she, it, we, they", topicRu: "Личные местоимения", points: [
    { rule: "I — я, You — ты/вы", explanationRu: "I всегда с большой буквы. You = ты и вы.", examples: ["I am fine.", "You are nice."] },
    { rule: "He/She/It — он/она/оно", explanationRu: "He для мужчин, she для женщин, it для предметов.", examples: ["He is good.", "She is nice.", "It is fine."] },
    { rule: "We/They — мы/они", explanationRu: "We = говорящий + другие. They = группа без говорящего.", examples: ["We are fine.", "They are good."] }
  ]},
  3: { topic: "Articles — a/an/the", topicRu: "Артикли", points: [
    { rule: "a — перед согласным звуком", explanationRu: "Неопределённый артикль, один из многих.", examples: ["I am a student.", "She is a teacher.", "He is a doctor."] },
    { rule: "an — перед гласным звуком", explanationRu: "Для удобства произношения.", examples: ["I am an artist.", "She is an engineer."] },
    { rule: "the — определённый артикль", explanationRu: "Конкретный, известный предмет.", examples: ["The book is good.", "The house is big."] }
  ]},
  4: { topic: "Possessives — my, your, his, her", topicRu: "Притяжательные местоимения", points: [
    { rule: "my / your — мой / твой", explanationRu: "Ставятся перед существительным.", examples: ["My name is Anna.", "Your book is good."] },
    { rule: "his / her — его / её", explanationRu: "His для мужчин, her для женщин.", examples: ["His name is Tom.", "Her name is Anna."] },
    { rule: "our / their — наш / их", explanationRu: "Our = наш общий. Their = их (не наш).", examples: ["Our family is good.", "Their house is big."] }
  ]},
  5: { topic: "Numbers and plurals", topicRu: "Числа и множественное число", points: [
    { rule: "Обычно +s", explanationRu: "Большинство слов: просто добавляем s.", examples: ["one book → two books", "one cat → three cats"] },
    { rule: "После s, sh, ch, x, o +es", explanationRu: "Для удобства произношения.", examples: ["one bus → two buses", "one box → three boxes"] },
    { rule: "How many...?", explanationRu: "Вопрос о количестве для исчисляемых предметов.", examples: ["How many brothers?", "How many books?"] }
  ]},
  6: { topic: "Adjectives — описание предметов", topicRu: "Прилагательные", points: [
    { rule: "Прилагательное перед существительным", explanationRu: "В английском прилагательное всегда перед словом.", examples: ["A red car.", "A big house.", "A nice friend."] },
    { rule: "I like / I don't like", explanationRu: "Выражение предпочтения.", examples: ["I like blue.", "I don't like black."] },
    { rule: "What color...?", explanationRu: "Вопрос о цвете.", examples: ["What color is it?", "What color do you like?"] }
  ]},
  7: { topic: "This/That/These/Those + Where", topicRu: "Указательные местоимения + где", points: [
    { rule: "This (близко, ед.) / That (далеко, ед.)", explanationRu: "This = вот этот. That = вон тот.", examples: ["This is my book.", "That is a car."] },
    { rule: "These (близко, мн.) / Those (далеко, мн.)", explanationRu: "These = вот эти. Those = вон те.", examples: ["These are my shoes.", "Those are birds."] },
    { rule: "Where...?", explanationRu: "Вопрос о месте.", examples: ["Where are you?", "Where is the book?"] }
  ]},
  8: { topic: "Have/Has — иметь", topicRu: "Глагол have", points: [
    { rule: "I/You/We/They have", explanationRu: "Для этих местоимений — have.", examples: ["I have a book.", "You have a bag.", "They have a car."] },
    { rule: "He/She/It has", explanationRu: "Для третьего лица — has.", examples: ["He has a phone.", "She has a key.", "It has a door."] },
    { rule: "I want / I need", explanationRu: "Выражение желания и необходимости.", examples: ["I want water.", "I need food."] }
  ]},
  9: { topic: "Present Simple — основные глаголы", topicRu: "Настоящее простое время", points: [
    { rule: "I/You/We/They + глагол", explanationRu: "Для этих местоимений глагол без изменений.", examples: ["I eat food.", "You drink water.", "We sleep at night."] },
    { rule: "He/She/It + глагол + s", explanationRu: "Для третьего лица добавляем s.", examples: ["He eats food.", "She drinks water."] },
    { rule: "I can / I can't", explanationRu: "Умение или возможность.", examples: ["I can swim.", "I can't drive."] }
  ]},
  10: { topic: "A/An с профессиями", topicRu: "Артикли с профессиями", points: [
    { rule: "I am a/an + профессия", explanationRu: "Для обозначения профессии используем a/an.", examples: ["I am a student.", "She is a doctor.", "He is an engineer."] },
    { rule: "What do you do?", explanationRu: "Вопрос о профессии.", examples: ["What do you do?", "What does she do?"] },
    { rule: "I work at/in...", explanationRu: "Где работаешь.", examples: ["I work at school.", "I work in a hospital."] }
  ]},
  11: { topic: "Время — what time / when", topicRu: "Вопросы о времени", points: [
    { rule: "What time...?", explanationRu: "Вопрос о точном времени.", examples: ["What time is it?", "What time do you eat?"] },
    { rule: "At + время", explanationRu: "Для указания точного времени.", examples: ["At 7 o'clock.", "At 8:30."] },
    { rule: "Every + день/неделя", explanationRu: "Регулярные действия.", examples: ["Every day.", "Every week."] }
  ]},
  12: { topic: "Imperatives — команды и просьбы", topicRu: "Повелительное наклонение", points: [
    { rule: "Глагол без подлежащего", explanationRu: "Для команд, инструкций, просьб.", examples: ["Get up!", "Sit down!", "Help me, please."] },
    { rule: "Don't + глагол", explanationRu: "Для запретов.", examples: ["Don't go!", "Don't sleep!"] },
    { rule: "Let's + глагол", explanationRu: "Предложение сделать вместе.", examples: ["Let's go!", "Let's eat!"] }
  ]},
  13: { topic: "Present Simple — еда и напитки", topicRu: "Настоящее простое: еда", points: [
    { rule: "I eat/drink + еда", explanationRu: "Рассказ о том, что ешь/пьёшь.", examples: ["I eat bread.", "I drink milk.", "She eats an apple."] },
    { rule: "Do you like...?", explanationRu: "Вопрос о предпочтениях в еде.", examples: ["Do you like tea?", "Does she like coffee?"] },
    { rule: "I don't like...", explanationRu: "Отрицание предпочтений.", examples: ["I don't like coffee.", "She doesn't like milk."] }
  ]},
  14: { topic: "Prepositions of place — in, on, at", topicRu: "Предлоги места", points: [
    { rule: "in — внутри", explanationRu: "Внутри чего-то.", examples: ["In the room.", "In the kitchen."] },
    { rule: "on — на поверхности", explanationRu: "На поверхности чего-то.", examples: ["On the table.", "On the bed."] },
    { rule: "at — у, при", explanationRu: "В определённом месте.", examples: ["At home.", "At school."] }
  ]},
  15: { topic: "Like + verb-ing — хобби", topicRu: "Любить делать что-то", points: [
    { rule: "I like + verb-ing", explanationRu: "Люблю делать что-то.", examples: ["I like reading.", "I like playing.", "She likes watching TV."] },
    { rule: "I don't like + verb-ing", explanationRu: "Не люблю делать что-то.", examples: ["I don't like running.", "He doesn't like cooking."] },
    { rule: "Do you like + verb-ing?", explanationRu: "Вопрос о хобби.", examples: ["Do you like playing football?", "Does she like reading?"] }
  ]},
  16: { topic: "Can / Can't — умения", topicRu: "Модальный глагол can", points: [
    { rule: "I/You/He/She/It/We/They + can + глагол", explanationRu: "Can не меняется! После can всегда глагол без to.", examples: ["I can swim.", "She can sing.", "They can cook."] },
    { rule: "Can't = cannot (не могу)", explanationRu: "Отрицательная форма.", examples: ["I can't drive.", "He can't dance."] },
    { rule: "Can you...?", explanationRu: "Вопрос об умении.", examples: ["Can you swim?", "Can she cook?"] }
  ]},
  17: { topic: "How much / How many", topicRu: "Сколько стоит / сколько штук", points: [
    { rule: "How much...? (неисчисляемые)", explanationRu: "Для денег, воды, времени.", examples: ["How much money?", "How much water?"] },
    { rule: "How many...? (исчисляемые)", explanationRu: "Для предметов, людей.", examples: ["How many books?", "How many people?"] },
    { rule: "It costs...", explanationRu: "Сколько стоит.", examples: ["It costs five dollars.", "How much does it cost?"] }
  ]},
  18: { topic: "Transport — I take/go by", topicRu: "Транспорт", points: [
    { rule: "I take the bus/train/taxi", explanationRu: "Пользуюсь транспортом.", examples: ["I take the bus.", "She takes the train."] },
    { rule: "I go by bus/train/bike", explanationRu: "Передвигаюсь на транспорте.", examples: ["I go by bus.", "He goes by bike."] },
    { rule: "I walk", explanationRu: "Иду пешком.", examples: ["I walk to school.", "She walks home."] }
  ]},
  19: { topic: "Adverbs of frequency", topicRu: "Наречия частоты", points: [
    { rule: "always (100%) → usually → often → sometimes → never (0%)", explanationRu: "Показывают как часто что-то происходит.", examples: ["I always eat breakfast.", "I sometimes walk.", "I never smoke."] },
    { rule: "Позиция: перед глаголом", explanationRu: "Но после am/is/are.", examples: ["I often read.", "She is always happy."] },
    { rule: "On + день недели", explanationRu: "Для указания дня.", examples: ["On Monday.", "On Saturday."] }
  ]},
  20: { topic: "Weather — It is...", topicRu: "Погода", points: [
    { rule: "It is + погода", explanationRu: "Описание погоды.", examples: ["It is hot.", "It is cold.", "It is sunny."] },
    { rule: "What's the weather like?", explanationRu: "Вопрос о погоде.", examples: ["What's the weather like today?", "It's rainy."] },
    { rule: "In + сезон", explanationRu: "Для указания сезона.", examples: ["In summer.", "In winter."] }
  ]},
  21: { topic: "Months — in + месяц", topicRu: "Месяцы", points: [
    { rule: "In + месяц", explanationRu: "Для указания месяца.", examples: ["In January.", "In December."] },
    { rule: "When is your birthday?", explanationRu: "Вопрос о дне рождения.", examples: ["When is your birthday?", "My birthday is in March."] },
    { rule: "How old are you?", explanationRu: "Вопрос о возрасте.", examples: ["How old are you?", "I am twenty."] }
  ]},
  22: { topic: "Comparative adjectives", topicRu: "Сравнительная степень", points: [
    { rule: "Короткие: +er", explanationRu: "Для прилагательных из 1-2 слогов.", examples: ["big → bigger", "tall → taller", "fast → faster"] },
    { rule: "Длинные: more + прилагательное", explanationRu: "Для прилагательных из 3+ слогов.", examples: ["more beautiful", "more expensive"] },
    { rule: "X is + сравн. + than Y", explanationRu: "Сравнение двух предметов.", examples: ["He is taller than me.", "This book is better."] }
  ]},
  23: { topic: "There is / There are", topicRu: "Есть/имеется", points: [
    { rule: "There is + ед.ч.", explanationRu: "Для одного предмета.", examples: ["There is a cat.", "There is a dog."] },
    { rule: "There are + мн.ч.", explanationRu: "Для нескольких предметов.", examples: ["There are two cats.", "There are many birds."] },
    { rule: "Is there...? / Are there...?", explanationRu: "Вопрос о наличии.", examples: ["Is there a park?", "Are there any shops?"] }
  ]},
  24: { topic: "Body parts — my/your/his/her", topicRu: "Части тела", points: [
    { rule: "My/Your/His/Her + часть тела", explanationRu: "Притяжательные + части тела.", examples: ["My head.", "Her eyes.", "His hands."] },
    { rule: "I have + часть тела + adjective", explanationRu: "Описание внешности.", examples: ["I have blue eyes.", "She has long hair."] },
    { rule: "My + часть тела + hurts", explanationRu: "Что болит.", examples: ["My head hurts.", "My leg hurts."] }
  ]},
  25: { topic: "Clothes — I wear / I put on", topicRu: "Одежда", points: [
    { rule: "I wear + одежда", explanationRu: "Что носишь.", examples: ["I wear a shirt.", "She wears a dress."] },
    { rule: "Put on / Take off", explanationRu: "Надевать / снимать.", examples: ["Put on your coat!", "Take off your shoes!"] },
    { rule: "What size?", explanationRu: "Вопрос о размере.", examples: ["What size?", "What color?"] }
  ]},
  26: { topic: "Feelings — I am / I feel", topicRu: "Чувства и состояние", points: [
    { rule: "I am + чувство", explanationRu: "Как себя чувствуешь.", examples: ["I am happy.", "I am tired.", "I am hungry."] },
    { rule: "I feel + чувство", explanationRu: "Что чувствуешь.", examples: ["I feel good.", "I feel sick."] },
    { rule: "Are you...?", explanationRu: "Вопрос о состоянии.", examples: ["Are you OK?", "Are you hungry?"] }
  ]},
  27: { topic: "Past Simple — was/were", topicRu: "Прошедшее время: was/were", points: [
    { rule: "I/He/She/It was", explanationRu: "Was — прошедшее время от am/is.", examples: ["I was tired.", "He was at home."] },
    { rule: "You/We/They were", explanationRu: "Were — прошедшее время от are.", examples: ["You were right.", "They were late."] },
    { rule: "Was/Were + подлежащее?", explanationRu: "Вопрос в прошедшем.", examples: ["Were you at school?", "Was she happy?"] }
  ]},
  28: { topic: "Prepositions of place — под, между, рядом", topicRu: "Предлоги места (продолжение)", points: [
    { rule: "under — под", explanationRu: "Под чем-то.", examples: ["Under the table.", "Under the bed."] },
    { rule: "between — между", explanationRu: "Между двумя предметами.", examples: ["Between two chairs.", "Between the bank and the park."] },
    { rule: "next to — рядом с", explanationRu: "Рядом с чем-то.", examples: ["Next to the shop.", "Next to me."] }
  ]},
  29: { topic: "Quantifiers — all, some, any, no", topicRu: "Количественные местоимения", points: [
    { rule: "some — немного, некоторые", explanationRu: "В утверждениях.", examples: ["Some food.", "Some people."] },
    { rule: "any — какой-нибудь, любой", explanationRu: "В вопросах и отрицаниях.", examples: ["Do you have any books?", "I don't have any water."] },
    { rule: "no — никакой, нет", explanationRu: "Отрицание.", examples: ["No water.", "No people."] }
  ]},
  30: { topic: "Conjunctions — because, so, if", topicRu: "Союзы", points: [
    { rule: "because — потому что", explanationRu: "Причина.", examples: ["I eat because I am hungry."] },
    { rule: "so — поэтому", explanationRu: "Результат.", examples: ["I am tired, so I sleep."] },
    { rule: "if — если", explanationRu: "Условие.", examples: ["If you want, come with me."] }
  ]},
  31: { topic: "Numbers 11-100", topicRu: "Числа 11-100", points: [
    { rule: "11-19: eleven, twelve, thirteen...", explanationRu: "Особые формы.", examples: ["Eleven people.", "Twelve months."] },
    { rule: "20, 30, 40...: twenty, thirty, forty...", explanationRu: "Десятки.", examples: ["Twenty dollars.", "Thirty people."] },
    { rule: "How much is...?", explanationRu: "Сколько стоит?", examples: ["How much is it?", "It costs fifty dollars."] }
  ]},
  32: { topic: "Professions — He/She is a...", topicRu: "Профессии (продолжение)", points: [
    { rule: "He/She is a/an + профессия", explanationRu: "Кем работает.", examples: ["He is a nurse.", "She is an engineer."] },
    { rule: "What does he/she do?", explanationRu: "Вопрос о профессии третьего лица.", examples: ["What does he do?", "She is a pilot."] },
    { rule: "He/She works at/in...", explanationRu: "Где работает.", examples: ["He works at a hospital.", "She works in a school."] }
  ]},
  33: { topic: "Technology — I use...", topicRu: "Технологии", points: [
    { rule: "I use + устройство", explanationRu: "Что используешь.", examples: ["I use a computer.", "I use my phone."] },
    { rule: "I send/get + сообщение", explanationRu: "Отправляю/получаю.", examples: ["I send an email.", "I get a message."] },
    { rule: "On the internet/TV", explanationRu: "Где смотришь.", examples: ["On the internet.", "On TV."] }
  ]},
  34: { topic: "Travel — I go by / I travel to", topicRu: "Путешествия", points: [
    { rule: "I travel by plane/train/ship", explanationRu: "На чём путешествуешь.", examples: ["I travel by plane.", "She travels by ship."] },
    { rule: "I go to + страна/город", explanationRu: "Куда едешь.", examples: ["I go to Russia.", "She goes to London."] },
    { rule: "I need a passport/ticket", explanationRu: "Что нужно для поездки.", examples: ["I need a passport.", "I need a ticket."] }
  ]},
  35: { topic: "Restaurant — I'd like...", topicRu: "В ресторане", points: [
    { rule: "I'd like + еда", explanationRu: "Вежливый заказ.", examples: ["I'd like a pizza.", "I'd like water."] },
    { rule: "Can I have...?", explanationRu: "Ещё один способ заказа.", examples: ["Can I have a coffee?", "Can I have the bill?"] },
    { rule: "How much is it?", explanationRu: "Сколько стоит?", examples: ["How much is it?", "The bill, please."] }
  ]},
  36: { topic: "Food — countable/uncountable", topicRu: "Еда: исчисляемые/неисчисляемые", points: [
    { rule: "a/an + исчисляемое", explanationRu: "Для отдельных предметов.", examples: ["An apple.", "A tomato.", "An egg."] },
    { rule: "some + неисчисляемое", explanationRu: "Для того, что нельзя посчитать.", examples: ["Some water.", "Some rice.", "Some cheese."] },
    { rule: "I like / I don't like + еда", explanationRu: "Предпочтения в еде.", examples: ["I like cheese.", "I don't like soup."] }
  ]},
  37: { topic: "Future — will", topicRu: "Будущее время: will", points: [
    { rule: "I will + глагол", explanationRu: "Будущее действие.", examples: ["I will go.", "She will come.", "They will eat."] },
    { rule: "I won't = I will not", explanationRu: "Отрицание в будущем.", examples: ["I won't go.", "She won't come."] },
    { rule: "Will you...?", explanationRu: "Вопрос о будущем.", examples: ["Will you go?", "Will she come?"] }
  ]},
  38: { topic: "Question words — what, who, where, when, why, how", topicRu: "Вопросительные слова", points: [
    { rule: "What? — что, какой", explanationRu: "Вопрос о предмете или качестве.", examples: ["What is this?", "What color?"] },
    { rule: "Who? — кто", explanationRu: "Вопрос о человеке.", examples: ["Who is she?", "Who is your teacher?"] },
    { rule: "Why? — почему", explanationRu: "Вопрос о причине.", examples: ["Why?", "Why are you sad?"] }
  ]},
  39: { topic: "Directions — turn, go, cross", topicRu: "Направления", points: [
    { rule: "Turn left/right", explanationRu: "Поверни налево/направо.", examples: ["Turn left.", "Turn right."] },
    { rule: "Go straight", explanationRu: "Иди прямо.", examples: ["Go straight.", "Go straight to the bank."] },
    { rule: "Cross the street", explanationRu: "Перейди улицу.", examples: ["Cross the street.", "Cross the road."] }
  ]},
  40: { topic: "Verbs of thinking — know, think, understand", topicRu: "Глаголы мышления", points: [
    { rule: "I know / I don't know", explanationRu: "Знание.", examples: ["I know the answer.", "I don't know."] },
    { rule: "I think (that)...", explanationRu: "Мнение.", examples: ["I think it is good.", "I think so."] },
    { rule: "I understand / I don't understand", explanationRu: "Понимание.", examples: ["I understand.", "I don't understand."] }
  ]},
  41: { topic: "Adverbs of frequency — always, usually, often, sometimes, never", topicRu: "Наречия частоты (продолжение)", points: [
    { rule: "always → usually → often → sometimes → rarely → never", explanationRu: "От 100% до 0%.", examples: ["I always eat.", "I sometimes cook.", "I never smoke."] },
    { rule: "Позиция: перед основным глаголом", explanationRu: "Но после am/is/are.", examples: ["I often read.", "She is always happy."] },
    { rule: "How often...?", explanationRu: "Вопрос о частоте.", examples: ["How often do you read?", "How often does she cook?"] }
  ]},
  42: { topic: "Comparatives and superlatives", topicRu: "Сравнительная и превосходная степень", points: [
    { rule: "better / worse", explanationRu: "Исключения: good → better, bad → worse.", examples: ["Better than before.", "Worse than yesterday."] },
    { rule: "the best / the worst", explanationRu: "Превосходная степень.", examples: ["The best book.", "The worst day."] },
    { rule: "more / less / most", explanationRu: "Для длинных прилагательных.", examples: ["More beautiful.", "The most beautiful."] }
  ]},
  43: { topic: "Hobbies — I like + verb-ing", topicRu: "Хобби (продолжение)", points: [
    { rule: "I like / love / enjoy + verb-ing", explanationRu: "Что любишь делать.", examples: ["I like reading.", "I love playing.", "I enjoy walking."] },
    { rule: "My hobby is...", explanationRu: "Моё хобби — это...", examples: ["My hobby is reading.", "My hobby is playing football."] },
    { rule: "It is fun/boring/interesting", explanationRu: "Описание хобби.", examples: ["It is fun!", "It is interesting."] }
  ]},
  44: { topic: "Holidays — celebrate, gift, party", topicRu: "Праздники", points: [
    { rule: "We celebrate + праздник", explanationRu: "Празднуем.", examples: ["We celebrate birthday.", "We celebrate New Year."] },
    { rule: "I give/get a gift/present", explanationRu: "Дарю/получаю подарок.", examples: ["I give a gift.", "I get a present."] },
    { rule: "Happy + праздник!", explanationRu: "Поздравление.", examples: ["Happy birthday!", "Happy holiday!"] }
  ]},
  45: { topic: "Time — o'clock, half, quarter", topicRu: "Время (продолжение)", points: [
    { rule: "It is + время + o'clock", explanationRu: "Точное время.", examples: ["It is 7 o'clock.", "It is 3 o'clock."] },
    { rule: "Half past + час", explanationRu: "Половина после.", examples: ["Half past seven.", "Half past three."] },
    { rule: "A quarter past/to + час", explanationRu: "Четверть после/до.", examples: ["A quarter past seven.", "A quarter to eight."] }
  ]},
  46: { topic: "Language — I study / I speak", topicRu: "Язык и учёба", points: [
    { rule: "I study + язык/предмет", explanationRu: "Что изучаешь.", examples: ["I study English.", "I study Russian."] },
    { rule: "I speak + язык", explanationRu: "На каком языке говоришь.", examples: ["I speak English.", "I speak Russian."] },
    { rule: "I read/write + что", explanationRu: "Что читаешь/пишешь.", examples: ["I read a book.", "I write a letter."] }
  ]},
  47: { topic: "Tests and progress", topicRu: "Тесты и прогресс", points: [
    { rule: "I do a test/exam", explanationRu: "Сдаю тест.", examples: ["I do a test.", "I have an exam."] },
    { rule: "I make a mistake", explanationRu: "Делаю ошибку.", examples: ["I make a mistake.", "Don't make mistakes!"] },
    { rule: "I improve / I make progress", explanationRu: "Улучшаюсь.", examples: ["I improve my English.", "I make progress."] }
  ]},
  48: { topic: "Friendship — talk, share, help", topicRu: "Дружба", points: [
    { rule: "I talk/chat with + человек", explanationRu: "Разговариваю с кем-то.", examples: ["I talk with my friend.", "I chat with her."] },
    { rule: "I share + что", explanationRu: "Делюсь чем-то.", examples: ["I share my food.", "I share my book."] },
    { rule: "I help + человек", explanationRu: "Помогаю кому-то.", examples: ["I help my friend.", "I help you."] }
  ]},
  49: { topic: "Pronouns — everything, something, nothing, everyone", topicRu: "Неопределённые местоимения", points: [
    { rule: "everything/something/nothing/anything", explanationRu: "Для предметов.", examples: ["Everything is good.", "Something is wrong.", "Nothing is impossible."] },
    { rule: "everyone/someone/nobody/anyone", explanationRu: "Для людей.", examples: ["Everyone is here.", "Someone is here.", "Nobody is here."] },
    { rule: "everywhere/somewhere/nowhere", explanationRu: "Для мест.", examples: ["Everywhere is good.", "Somewhere near.", "Nowhere to go."] }
  ]},
  50: { topic: "Review — all grammar A1", topicRu: "Повторение всей грамматики A1", points: [
    { rule: "To Be + Present Simple + Past Simple + Future", explanationRu: "Все времена A1.", examples: ["I am a student.", "I study English.", "I was happy.", "I will improve."] },
    { rule: "Can / Can't / Like / Don't like", explanationRu: "Модальные глаголы и предпочтения.", examples: ["I can swim.", "I like reading.", "I don't like cooking."] },
    { rule: "Comparatives + Prepositions + Quantifiers", explanationRu: "Сравнения, предлоги, количества.", examples: ["Better than before.", "In the room.", "Some food."] }
  ]}
};

// ============================================================
// DIALOGUE TEMPLATES — using ONLY words from cumulative pool
// ============================================================

const dialogueTemplates = {
  1: [
    { title: "Знакомство", lines: [
      { speaker: "A", text: "Hello!" },
      { speaker: "B", text: "Hello! I am fine." },
      { speaker: "A", text: "Good! Thank you!" },
      { speaker: "B", text: "Goodbye!" },
      { speaker: "A", text: "Goodbye!" }
    ]},
    { title: "Вежливость", lines: [
      { speaker: "A", text: "Please!" },
      { speaker: "B", text: "Thank you!" },
      { speaker: "A", text: "OK!" },
      { speaker: "B", text: "Yes! Thanks!" }
    ]}
  ],
  2: [
    { title: "Как меня зовут", lines: [
      { speaker: "A", text: "My name is Anna." },
      { speaker: "B", text: "I am Tom." },
      { speaker: "A", text: "You are nice, Tom." },
      { speaker: "B", text: "Thank you, Anna!" }
    ]},
    { title: "О друзьях", lines: [
      { speaker: "A", text: "He is my friend." },
      { speaker: "B", text: "She is my friend too." },
      { speaker: "A", text: "We are friends." },
      { speaker: "B", text: "Yes! They are friends too." }
    ]}
  ],
  3: [
    { title: "Друзья", lines: [
      { speaker: "Man", text: "You are my friend." },
      { speaker: "Woman", text: "I am happy. You are nice." },
      { speaker: "Man", text: "He is not bad." },
      { speaker: "Woman", text: "And she is nice. His name is Tom." }
    ]},
    { title: "Хорошо и плохо", lines: [
      { speaker: "Man", text: "I am happy." },
      { speaker: "Woman", text: "I am not sad." },
      { speaker: "Man", text: "You are my friend." },
      { speaker: "Woman", text: "Yes! And your name is nice." }
    ]}
  ],
  4: [
    { title: "My family", lines: [
      { speaker: "A", text: "My mother is nice." },
      { speaker: "B", text: "My father is good." },
      { speaker: "A", text: "I love my family." },
      { speaker: "B", text: "My brother is big. My sister is small." }
    ]},
    { title: "Family size", lines: [
      { speaker: "A", text: "My family is big." },
      { speaker: "B", text: "My family is small." },
      { speaker: "A", text: "I love my son and daughter." },
      { speaker: "B", text: "My husband is good. My wife is nice." }
    ]}
  ],
  5: [
    { title: "How many?", lines: [
      { speaker: "A", text: "I have one brother." },
      { speaker: "B", text: "I have two sisters." },
      { speaker: "A", text: "How many brothers?" },
      { speaker: "B", text: "Three brothers. Four sisters. Five friends." }
    ]},
    { title: "Counting", lines: [
      { speaker: "A", text: "One, two, three." },
      { speaker: "B", text: "Four, five, six." },
      { speaker: "A", text: "Seven, eight, nine." },
      { speaker: "B", text: "Ten! How many? Many people!" }
    ]}
  ],
  6: [
    { title: "Colors", lines: [
      { speaker: "A", text: "I like blue." },
      { speaker: "B", text: "I like red." },
      { speaker: "A", text: "The sky is blue." },
      { speaker: "B", text: "The car is red. The cat is black." }
    ]},
    { title: "What color?", lines: [
      { speaker: "A", text: "What color?" },
      { speaker: "B", text: "Green and yellow." },
      { speaker: "A", text: "I like pink." },
      { speaker: "B", text: "I like brown. The flower is pink." }
    ]}
  ],
  7: [
    { title: "This and that", lines: [
      { speaker: "A", text: "This is my book." },
      { speaker: "B", text: "That is a car." },
      { speaker: "A", text: "These are my shoes." },
      { speaker: "B", text: "Those are birds." }
    ]},
    { title: "Where?", lines: [
      { speaker: "A", text: "Where are you?" },
      { speaker: "B", text: "I am here." },
      { speaker: "A", text: "Where is she?" },
      { speaker: "B", text: "She is there. From Russia." }
    ]}
  ],
  8: [
    { title: "I have", lines: [
      { speaker: "A", text: "I have a book." },
      { speaker: "B", text: "I have a bag." },
      { speaker: "A", text: "She has a phone." },
      { speaker: "B", text: "He has a key. I want water." }
    ]},
    { title: "I need", lines: [
      { speaker: "A", text: "I need food." },
      { speaker: "B", text: "I need water." },
      { speaker: "A", text: "She has a book." },
      { speaker: "B", text: "He has a car. The house is big." }
    ]}
  ],
  9: [
    { title: "I eat", lines: [
      { speaker: "A", text: "I eat food." },
      { speaker: "B", text: "I drink water." },
      { speaker: "A", text: "I go home." },
      { speaker: "B", text: "I see a cat. I want food." }
    ]},
    { title: "I know", lines: [
      { speaker: "A", text: "I know the answer." },
      { speaker: "B", text: "I think so." },
      { speaker: "A", text: "Look at this!" },
      { speaker: "B", text: "I see a book. I need water." }
    ]}
  ],
  10: [
    { title: "Jobs", lines: [
      { speaker: "A", text: "I am a student." },
      { speaker: "B", text: "She is a teacher." },
      { speaker: "A", text: "He is a doctor." },
      { speaker: "B", text: "I work at school. I go to school." }
    ]},
    { title: "People", lines: [
      { speaker: "A", text: "The man is good." },
      { speaker: "B", text: "The woman is nice." },
      { speaker: "A", text: "The boy is small." },
      { speaker: "B", text: "The girl is happy. People are good." }
    ]}
  ]
};

// ============================================================
// EXERCISE GENERATORS — strictly using cumulative vocabulary
// ============================================================

function getCumulativeVocabulary(upToLesson) {
  const vocab = [];
  for (let i = 1; i <= upToLesson; i++) {
    if (vocabularyByLesson[i]) {
      vocab.push(...vocabularyByLesson[i].map(w => ({ ...w, lesson: i })));
    }
  }
  return vocab;
}

function getCumulativeGrammar(upToLesson) {
  const grammar = [];
  for (let i = 1; i <= upToLesson; i++) {
    if (grammarByLesson[i]) {
      grammar.push({ ...grammarByLesson[i], lesson: i });
    }
  }
  return grammar;
}

function shuffleArray(arr) {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateMultipleChoice(vocab, count = 10) {
  const exercises = [];
  const words = shuffleArray(vocab).slice(0, count);

  for (const word of words) {
    const options = [word.ru];
    const others = vocab.filter(w => w.en !== word.en);
    const shuffledOthers = shuffleArray(others).slice(0, 3);
    for (const other of shuffledOthers) {
      options.push(other.ru);
    }
    while (options.length < 4) options.push('...');

    const shuffledOptions = shuffleArray(options);
    exercises.push({
      question: `Как переводится "${word.en}"?`,
      options: shuffledOptions,
      correctIndex: shuffledOptions.indexOf(word.ru),
      wordEn: word.en,
      wordRu: word.ru
    });
  }

  return exercises;
}

function generateFillInBlank(vocab, count = 10) {
  const exercises = [];
  const words = shuffleArray(vocab).slice(0, count);

  for (const word of words) {
    const escapedWord = word.en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const sentenceWithBlank = word.example.replace(new RegExp(escapedWord, 'i'), '___');
    const hasBlank = sentenceWithBlank.includes('___');

    if (hasBlank && sentenceWithBlank.replace(/[^a-zA-Z\s]/g, '').trim().length > 3) {
      exercises.push({
        sentence: sentenceWithBlank,
        sentenceRu: `Вставь пропущенное слово`,
        blank: word.en,
        hint: `Перевод: "${word.ru}"`
      });
    } else {
      exercises.push({
        sentence: `___`,
        sentenceRu: `Напиши на английском: "${word.ru}"`,
        blank: word.en,
        hint: `Подумай, как это будет по-английски`
      });
    }
  }

  return exercises;
}

function generateMatchPairs(vocab, count = 8) {
  return shuffleArray(vocab).slice(0, count).map(w => ({ left: w.en, right: w.ru }));
}

function generateTranslateExercises(vocab, count = 5) {
  return shuffleArray(vocab).slice(0, count).map(w => ({
    ru: w.ru,
    en: w.en,
    hint: `Подумай, как это будет на английском`
  }));
}

function generateListenAndType(dialogues, count = 5) {
  const exercises = [];
  for (const dialogue of dialogues) {
    for (const line of dialogue.lines) {
      if (exercises.length >= count) break;
      exercises.push({
        audio: line.text,
        correct: line.text,
        hint: `Слушайте и напишите`
      });
    }
  }
  return exercises;
}

// ============================================================
// HOMEWORK GENERATOR — uses cumulative vocab + 1-2 preview words
// ============================================================

function generateHomework(lessonNum) {
  const cumulative = getCumulativeVocabulary(lessonNum);
  const preview = vocabularyByLesson[lessonNum + 1] ? vocabularyByLesson[lessonNum + 1].slice(0, 2) : [];
  const lessonVocab = vocabularyByLesson[lessonNum] || [];

  const taskTemplates = [
    `Напиши 5 предложений используя новые слова урока: ${lessonVocab.slice(0, 4).map(w => `"${w.en}"`).join(', ')}.`,
    `Напиши короткий рассказ о себе (5 предложений), используя изученные слова.`,
    `Составь 5 предложений с новыми словами урока и покажи их другу.`,
    `Опиши свой день (5 предложений) используя изученную грамматику и слова.`,
    `Напиши диалог между двумя людьми (6-8 реплик), используя слова из этого урока.`
  ];

  const task = taskTemplates[lessonNum % taskTemplates.length];

  let hint = '';
  if (preview.length > 0) {
    hint = ` Подсказка: в следующем уроке ты узнаешь слова — ${preview.map(w => `${w.en} = ${w.ru}`).join(', ')}`;
  }

  const firstWords = lessonVocab.slice(0, 5);
  const exampleSentence = firstWords.length >= 3
    ? `Например: "${firstWords[0].en}! ${firstWords[1].en}! ${firstWords[2].en}!"`
    : `Например: "${lessonVocab[0]?.example || '...'}"`;

  return {
    taskRu: task + hint,
    example: exampleSentence
  };
}

// ============================================================
// MAIN GENERATION
// ============================================================

for (let lessonNum = 1; lessonNum <= 50; lessonNum++) {
  const vocab = vocabularyByLesson[lessonNum] || [];
  const grammar = grammarByLesson[lessonNum] || { topic: '', topicRu: '', points: [] };
  const dialogues = dialogueTemplates[lessonNum] || dialogueTemplates[1];
  const cumulative = getCumulativeVocabulary(lessonNum);

  const lesson = {
    id: `a1-lesson-${String(lessonNum).padStart(2, '0')}`,
    level: 'A1',
    number: lessonNum,
    title: grammar.topic.split('—')[0].trim() || `Lesson ${lessonNum}`,
    titleRu: grammar.topicRu || `Урок ${lessonNum}`,
    grammar: {
      topic: grammar.topic,
      topicRu: grammar.topicRu,
      points: grammar.points
    },
    vocabulary: vocab.map(w => ({
      en: w.en,
      ru: w.ru,
      transcription: w.phonetic,
      example: w.example
    })),
    dialogues: dialogues,
    exercises: {
      multipleChoice: generateMultipleChoice(cumulative),
      fillInBlank: generateFillInBlank(cumulative),
      matchPairs: generateMatchPairs(cumulative),
      translate: generateTranslateExercises(cumulative),
      listenAndType: generateListenAndType(dialogues)
    },
    homework: generateHomework(lessonNum)
  };

  const fileName = `lesson-${String(lessonNum).padStart(2, '0')}.json`;
  const filePath = path.join(outDir, fileName);
  fs.writeFileSync(filePath, JSON.stringify(lesson, null, 2), 'utf-8');
  console.log(`✓ Lesson ${lessonNum}: ${lesson.titleRu} (${vocab.length} new words, ${cumulative.length} total)`);
}

console.log(`\n✅ Done! Generated 50 lessons in ${outDir}`);
console.log(`Total words across all lessons: ${Object.values(vocabularyByLesson).flat().length}`);
