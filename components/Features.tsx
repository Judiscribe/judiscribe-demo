import { features } from "@/data/features";
import SectionHeading from "@/components/SectionHeading";

interface FeaturesProps {
	isActive: boolean;
}

export default function Features({ isActive }: FeaturesProps) {
	if (!isActive) return null;

	return (
		<div className="space-y-12">
			<SectionHeading
				eyebrow="Features"
				title="Built for the bench, the bar, and the registry"
				lead="Every capability is shaped around how a Nigerian courtroom actually runs — from multi-speaker proceedings to the chain of custody a record must keep."
			/>

			{/* Feature ledger */}
			<div className="border-t border-rule">
				{features.map((feature, index) => (
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

			{/* Assurances */}
			<div className="grid grid-cols-3 border border-rule rounded-sm divide-x divide-rule">
				<Assurance value="99%" label="Transcription accuracy" />
				<Assurance value="75%" label="Less time on documentation" />
				<Assurance value="24/7" label="System availability" />
			</div>
		</div>
	);
}

function Assurance({ value, label }: { value: string; label: string }) {
	return (
		<div className="px-4 py-7 text-center">
			<div className="font-display text-3xl sm:text-4xl text-ink tabular-nums">
				{value}
			</div>
			<div className="eyebrow text-muted mt-2">{label}</div>
		</div>
	);
}
