import SectionHeading from "@/components/SectionHeading";

interface WorkflowProps {
	isActive: boolean;
}

type Step = { title: string; description: string; time: string };

const manualSteps: Step[] = [
	{
		title: "Manual note-taking",
		description:
			"A clerk writes the proceedings by hand during the session, often missing detail at the speed of speech.",
		time: "2–3 hrs",
	},
	{
		title: "Document compilation",
		description:
			"Handwritten notes are organised and typed into a complete record once the court rises.",
		time: "2–4 hrs",
	},
	{
		title: "Review & corrections",
		description:
			"The draft is checked for accuracy and corrected, frequently over several revisions.",
		time: "1–2 hrs",
	},
	{
		title: "Distribution & filing",
		description:
			"Copies are delivered to the parties and filed by hand into the registry archive.",
		time: "1–3 days",
	},
];

const judiscribeSteps: Step[] = [
	{
		title: "Real-time transcription",
		description:
			"Every word is captured with speaker attribution and timestamps as the proceedings happen.",
		time: "Real-time",
	},
	{
		title: "Instant summary",
		description:
			"A case summary with the key legal points and relief sought is drafted the moment the session ends.",
		time: "< 1 min",
	},
	{
		title: "Quality assurance",
		description:
			"Accuracy is verified automatically, leaving only a brief human sign-off before approval.",
		time: "2–3 min",
	},
	{
		title: "Distribution & archive",
		description:
			"The record is delivered to authorised parties and filed into a searchable digital archive.",
		time: "Instant",
	},
];

export default function Workflow({ isActive }: WorkflowProps) {
	if (!isActive) return null;

	return (
		<div className="space-y-12">
			<SectionHeading
				eyebrow="Workflow"
				title="From four hours to four minutes"
				lead="The same record, produced two ways. Judiscribe collapses a multi-day manual chain into a single live pass."
			/>

			{/* Headline time comparison */}
			<div className="grid sm:grid-cols-[1fr_auto_1fr] items-stretch border border-rule rounded-sm overflow-hidden">
				<div className="p-8 text-center">
					<div className="eyebrow text-muted mb-3">Manual process</div>
					<div className="font-display text-4xl sm:text-5xl text-ink-soft tabular-nums">
						4–6 hrs
					</div>
					<p className="text-sm text-muted mt-3">Slow · Error-prone · Manual</p>
				</div>
				<div className="hidden sm:flex items-center px-6 border-x border-rule">
					<span className="font-mono text-2xl text-accent">→</span>
				</div>
				<div className="p-8 text-center bg-ink text-paper">
					<div className="eyebrow text-accent-soft mb-3">With Judiscribe</div>
					<div className="font-display text-4xl sm:text-5xl tabular-nums">
						5–10 min
					</div>
					<p className="text-sm text-paper/60 mt-3">Fast · Accurate · Automated</p>
				</div>
			</div>

			{/* Two-column step comparison */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
				<StepColumn label="Current manual process" steps={manualSteps} />
				<StepColumn
					label="With Judiscribe"
					steps={judiscribeSteps}
					highlight
				/>
			</div>

			{/* Impact */}
			<div className="grid grid-cols-2 lg:grid-cols-4 border border-rule rounded-sm divide-x divide-y lg:divide-y-0 divide-rule">
				{[
					{ value: "98%", label: "Time reduction" },
					{ value: "99%", label: "Accuracy rate" },
					{ value: "100%", label: "Digital process" },
					{ value: "₦5.8B", label: "Addressable market" },
				].map((stat) => (
					<div key={stat.label} className="px-4 py-7 text-center">
						<div className="font-display text-3xl text-ink tabular-nums">
							{stat.value}
						</div>
						<div className="eyebrow text-muted mt-2">{stat.label}</div>
					</div>
				))}
			</div>
		</div>
	);
}

function StepColumn({
	label,
	steps,
	highlight,
}: {
	label: string;
	steps: Step[];
	highlight?: boolean;
}) {
	return (
		<div>
			<div className="flex items-center gap-3 mb-2">
				<span
					className={`eyebrow ${highlight ? "text-accent" : "text-muted"}`}
				>
					{label}
				</span>
			</div>
			<ol className="relative border-l border-rule ml-3">
				{steps.map((step, index) => (
					<li key={index} className="relative pl-8 pb-8 last:pb-0">
						{/* node */}
						<span
							className={`absolute -left-[9px] top-0.5 w-4 h-4 rounded-full border-2 bg-paper ${
								highlight ? "border-accent" : "border-rule-strong"
							}`}
						/>
						<div className="flex items-baseline justify-between gap-4">
							<h4 className="font-display text-lg text-ink">
								<span className="font-mono text-xs text-muted mr-2 tabular-nums">
									{String(index + 1).padStart(2, "0")}
								</span>
								{step.title}
							</h4>
							<span
								className={`shrink-0 font-mono text-xs px-2 py-1 rounded-sm border ${
									highlight
										? "border-accent/40 text-accent"
										: "border-rule text-muted"
								}`}
							>
								{step.time}
							</span>
						</div>
						<p className="mt-2 text-sm text-muted leading-relaxed">
							{step.description}
						</p>
					</li>
				))}
			</ol>
		</div>
	);
}
