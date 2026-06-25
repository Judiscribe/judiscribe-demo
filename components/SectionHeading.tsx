interface SectionHeadingProps {
	eyebrow: string;
	title: string;
	lead?: string;
}

// Shared section opener: a mono eyebrow drawn to a hairline rule,
// a serif title, and an optional lead. Keeps every section in register.
export default function SectionHeading({
	eyebrow,
	title,
	lead,
}: SectionHeadingProps) {
	return (
		<div className="max-w-2xl">
			<div className="flex items-center gap-3 mb-4">
				<span className="eyebrow text-accent">{eyebrow}</span>
				<span className="h-px flex-1 bg-rule" />
			</div>
			<h2 className="font-display text-3xl sm:text-4xl text-ink leading-tight">
				{title}
			</h2>
			{lead && <p className="mt-3 text-base text-muted leading-relaxed">{lead}</p>}
		</div>
	);
}
