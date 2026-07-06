export function DiagramBlock({ diagram }: { diagram: string }) {
  return (
    <pre className="my-8 overflow-x-auto rounded-sm border border-line bg-navy-950 px-6 py-5 font-mono text-sm leading-relaxed text-paper/90">
      <code>{diagram.trim()}</code>
    </pre>
  );
}
