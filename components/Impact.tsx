import { impactFeatures, impactStats } from "@/data/features";
import SectionHeading from "@/components/SectionHeading";

interface ImpactProps {
	isActive: boolean;
}

const phases = [
	{
		phase: "Phase 1",
		window: "3–6 months",
		body: "Pilot in selected Federal High Courts, with recorders and clerks onboarded.",
	},
	{
		phase: "Phase 2",
		window: "6–12 months",
		body: "Rollout across the Federal Courts alongside structured training programmes.",
	},
	{
		phase: "Phase 3",
		window: "12–18 months",
		body: "Expansion to the State Courts with advanced search and analytics.",
	},
];

const roiPoints = [
	"Access to 1,400+ courts across Nigeria",
	"Transcription costs reduced by up to 80%",
	"Faster case resolution and a smaller backlog",
	"Greater accessibility and transparency of records",
];

export default function Impact({ isActive }: ImpactProps) {
	if (!isActive) return null;

	return (
		<div className="space-y-12">
			<SectionHeading
				eyebrow="Impact"
				title="The case for adoption"
				lead="Measurable gains in efficiency, cost, and the quality of the record across the Nigerian judicial system."
			/>

			{/* Key statistics */}
			<div className="grid grid-cols-2 lg:grid-cols-4 border border-rule rounded-sm divide-x divide-y lg:divide-y-0 divide-rule">
				{impactStats.map((stat, index) => (
					<div key={index} className="px-4 py-8 text-center">
						<div className="font-display text-3xl sm:text-4xl text-ink tabular-nums">
							{stat.number}
						</div>
						<div className="eyebrow text-muted mt-2">{stat.label}</div>
					</div>
				))}
			</div>

			{/* Impact areas — ledger */}
			<div className="border-t border-rule">
				{impactFeatures.map((feature, index) => (
					<article
						key={index}
						className="group grid sm:grid-cols-[auto_auto_1fr] gap-x-6 gap-y-2 items-start py-7 border-b border-rule"
					>
						<span className="font-mono text-xs text-muted tabular-nums pt-1">
							{String(index + 1).padStart(2, "0")}
						</span>
						<div className="text-ink-soft group-hover:text-accent transition-colors">
							{feature.icon}
						</div>
						<div className="sm:max-w-2xl">
							<h3 className="font-display text-xl text-ink mb-1.5">
								{feature.title}
							</h3>
							<p className="text-sm sm:text-base text-muted leading-relaxed">
								{feature.description}
							</p>
						</div>
					</article>
				))}
			</div>

			{/* ROI — ink panel */}
			<div className="bg-ink text-paper rounded-sm grid grid-cols-1 md:grid-cols-2">
				<div className="p-8 sm:p-10">
					<span className="eyebrow text-accent-soft">Return on investment</span>
					<p className="mt-4 text-paper/75 leading-relaxed">
						Judiscribe is projected to deliver substantial savings through lower
						administrative overhead, faster case processing, and a more accurate
						judicial record.
					</p>
					<ul className="mt-6 space-y-3">
						{roiPoints.map((point) => (
							<li key={point} className="flex items-start gap-3 text-sm text-paper/80">
								<span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent-soft shrink-0" />
								{point}
							</li>
						))}
					</ul>
				</div>

				<div className="p-8 sm:p-10 border-t md:border-t-0 md:border-l border-rule-ink flex flex-col justify-center">
					<span className="eyebrow text-paper/50">Projected annual revenue</span>
					<div className="font-display text-5xl sm:text-6xl mt-3 tabular-nums">
						$10M
					</div>
					<div className="grid grid-cols-2 gap-6 mt-8 pt-6 border-t border-rule-ink">
						<div>
							<div className="font-mono text-2xl text-paper tabular-nums">75%</div>
							<div className="eyebrow text-paper/50 mt-1">Time reduction</div>
						</div>
						<div>
							<div className="font-mono text-2xl text-paper tabular-nums">20%</div>
							<div className="eyebrow text-paper/50 mt-1">Target market share</div>
						</div>
					</div>
				</div>
			</div>

			{/* Roadmap */}
			<div>
				<div className="flex items-center gap-3 mb-6">
					<span className="eyebrow text-ink-soft">Implementation roadmap</span>
					<span className="h-px flex-1 bg-rule" />
				</div>
				<ol className="grid sm:grid-cols-3 gap-px bg-rule border border-rule rounded-sm overflow-hidden">
					{phases.map((p, index) => (
						<li key={p.phase} className="bg-paper-raised p-6">
							<div className="flex items-baseline justify-between">
								<span className="font-mono text-xs text-accent tabular-nums">
									{String(index + 1).padStart(2, "0")}
								</span>
								<span className="font-mono text-xs text-muted">{p.window}</span>
							</div>
							<h4 className="font-display text-lg text-ink mt-3">{p.phase}</h4>
							<p className="text-sm text-muted leading-relaxed mt-1.5">
								{p.body}
							</p>
						</li>
					))}
				</ol>
			</div>
		</div>
	);
}
