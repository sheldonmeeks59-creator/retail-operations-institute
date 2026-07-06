interface ChartFrameProps {
  title: string;
  purpose: string;
  insight: string;
  children: React.ReactNode;
  tableCaption: string;
  tableHeaders: string[];
  tableRows: (string | number)[][];
}

export function ChartFrame({
  title,
  purpose,
  insight,
  children,
  tableCaption,
  tableHeaders,
  tableRows,
}: ChartFrameProps) {
  return (
    <figure className="rounded-sm border border-line bg-paper-raised p-6">
      <figcaption className="mb-5">
        <h3 className="font-serif-display text-xl font-semibold text-navy-950">{title}</h3>
        <p className="mt-1 text-sm text-ink-muted">{purpose}</p>
      </figcaption>

      {children}

      <p className="mt-5 border-t border-line pt-4 text-sm leading-relaxed text-ink-muted">
        <span className="font-semibold text-navy-800">Insight: </span>
        {insight}
      </p>

      <details className="mt-3 text-sm">
        <summary className="cursor-pointer font-medium text-navy-800 hover:text-navy-950">
          View as table
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[24rem] border-collapse text-sm">
            <caption className="sr-only">{tableCaption}</caption>
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-ink-faint">
                {tableHeaders.map((header) => (
                  <th key={header} className="px-3 py-2 font-semibold">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, index) => (
                <tr key={index} className="border-b border-line last:border-0">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-3 py-2 text-ink-muted">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
