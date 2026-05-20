export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-2 animate-fade-in">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-[var(--text-tertiary)]"
          style={{
            animation: `typing 1.4s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
