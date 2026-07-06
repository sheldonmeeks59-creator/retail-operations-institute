export function ReflectionQuestions({ questions }: { questions: string[] }) {
  return (
    <div className="my-8 rounded-sm border border-navy-700 bg-navy-950 p-6 text-paper">
      <p className="text-xs font-semibold uppercase tracking-wide text-gold-500">
        Reflection Questions for Executives
      </p>
      <ol className="mt-3 space-y-3">
        {questions.map((question, index) => (
          <li key={question} className="flex gap-3 text-sm leading-relaxed text-paper/90">
            <span className="font-serif-display text-gold-500">{index + 1}.</span>
            {question}
          </li>
        ))}
      </ol>
    </div>
  );
}
