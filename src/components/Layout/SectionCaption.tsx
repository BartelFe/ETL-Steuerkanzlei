interface Props {
  number: string;
  label: string;
}

export function SectionCaption({ number, label }: Props) {
  return (
    <div className="caption" data-reveal>
      <span className="text-accent">{number}</span>
      <span className="mx-2 opacity-60">—</span>
      <span>{label}</span>
    </div>
  );
}
