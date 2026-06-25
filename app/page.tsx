"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import LiveDemo from "@/components/Demo";
import Features from "@/components/Features";
import Workflow from "@/components/Workflow";
import Impact from "@/components/Impact";
import Seal from "@/components/Seal";

const navigationItems = [
	{ id: "live-demo", label: "Live Demo" },
	{ id: "features", label: "Features" },
	{ id: "workflow", label: "Workflow" },
	{ id: "impact", label: "Impact" },
];

// The transcript thesis shown on the cover — the product is the record,
// so the record is the hero.
const coverRecord = [
	{ time: "10:00:32", speaker: "JUDGE", text: "We are here for the matter of Zenith Bank PLC versus Lagos State Development Corporation." },
	{ time: "10:01:05", speaker: "PLAINTIFF", text: "May it please your Lordship, I appear for the plaintiff in this contract dispute." },
	{ time: "10:02:15", speaker: "PLAINTIFF", text: "This case centres on a ₦500 million construction contract signed January 2024." },
];

export default function Home() {
	const [activeSection, setActiveSection] = useState("live-demo");
	const [mounted, setMounted] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div className="min-h-screen bg-paper overflow-x-clip">
			{/* Top utility bar — wordmark + nav */}
			<header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-sm border-b border-rule">
				<div className="max-w-6xl mx-auto px-5 sm:px-8">
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center gap-3">
							<Seal className="w-8 h-8" tone="ink" />
							<span className="font-display text-xl tracking-tight text-ink">
								Judiscribe
							</span>
						</div>

						{/* Desktop nav */}
						<nav className="hidden md:flex items-center gap-8">
							{navigationItems.map((item) => (
								<button
									key={item.id}
									onClick={() => setActiveSection(item.id)}
									className={`eyebrow py-1.5 transition-colors border-b ${
										activeSection === item.id
											? "text-accent border-accent"
											: "text-muted border-transparent hover:text-ink"
									}`}
								>
									{item.label}
								</button>
							))}
						</nav>

						{/* Mobile toggle */}
						<button
							onClick={() => setIsMobileMenuOpen((v) => !v)}
							className="md:hidden p-2 -mr-2 text-ink"
							aria-label="Toggle menu"
						>
							{isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
						</button>
					</div>

					{isMobileMenuOpen && (
						<nav className="md:hidden border-t border-rule py-2">
							{navigationItems.map((item) => (
								<button
									key={item.id}
									onClick={() => {
										setActiveSection(item.id);
										setIsMobileMenuOpen(false);
									}}
									className={`block w-full text-left eyebrow py-3 ${
										activeSection === item.id ? "text-accent" : "text-muted"
									}`}
								>
									{item.label}
								</button>
							))}
						</nav>
					)}
				</div>
			</header>

			{/* Cover — ink, like the boards of a bound volume */}
			<section className="bg-ink text-paper">
				<div className="max-w-6xl mx-auto px-5 sm:px-8 py-16 sm:py-20">
					<div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
						{/* Thesis copy */}
						<div className="min-w-0">
							<div className="flex items-center gap-3 mb-8">
								<span className="eyebrow text-accent-soft">
									Federal Republic of Nigeria
								</span>
								<span className="h-px w-8 bg-rule-ink" />
								<span className="eyebrow text-paper/60">Judiciary</span>
							</div>

							<h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] font-medium text-paper">
								The verbatim record,
								<br />
								<span className="text-paper/55">captured as it is spoken.</span>
							</h1>

							<p className="mt-6 text-base sm:text-lg leading-relaxed text-paper/70 max-w-md">
								Judiscribe transcribes proceedings in real time, attributes every
								speaker, and files an accurate, searchable record before the
								gavel falls.
							</p>

							<div className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
								<Stat value="99%" label="Transcription accuracy" />
								<Stat value="< 1 min" label="Summary after session" />
								<Stat value="1,400+" label="Courts in scope" />
							</div>
						</div>

						{/* Document card — the record itself */}
						<div className="relative min-w-0">
							<Seal
								tone="paper"
								className="hidden lg:block w-20 h-20 absolute -top-10 -right-4 opacity-90"
							/>
							<div className="bg-paper-raised text-ink rounded-sm border border-rule-strong shadow-2xl overflow-hidden">
								<div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-rule">
									<span className="font-mono text-xs text-ink-soft truncate">
										FHC/ABJ/CS/123/2025
									</span>
									<span className="flex items-center gap-2 eyebrow text-accent shrink-0">
										<span className="w-1.5 h-1.5 rounded-full bg-accent animate-live" />
										On record
									</span>
								</div>
								<div className="p-5 space-y-4">
									{coverRecord.map((line) => (
										<div key={line.time} className="grid grid-cols-[auto_1fr] gap-x-3 min-w-0">
											<span className="font-mono text-[11px] text-muted pt-1 tabular-nums">
												{line.time}
											</span>
											<div className="min-w-0">
												<span className="font-mono text-[10px] tracking-wider text-accent">
													{line.speaker}
												</span>
												<p className="font-mono text-[13px] leading-relaxed text-ink-soft">
													{line.text}
												</p>
											</div>
										</div>
									))}
									<div className="font-mono text-[13px] text-muted pl-[3.4rem]">
										<span className="inline-block w-2 h-4 bg-accent/70 animate-live align-text-bottom" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Content */}
			<main className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
				<LiveDemo isActive={activeSection === "live-demo"} />
				<Features isActive={activeSection === "features"} />
				<Workflow isActive={activeSection === "workflow"} />
				<Impact isActive={activeSection === "impact"} />
			</main>

			<footer className="border-t border-rule">
				<div className="max-w-6xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
					<div className="flex items-center gap-2.5">
						<Seal className="w-5 h-5" tone="ink" />
						<span className="font-mono text-xs text-muted">
							Judiscribe — court transcription for the Nigerian judiciary
						</span>
					</div>
					<span className="font-mono text-xs text-muted">Demo build</span>
				</div>
			</footer>
		</div>
	);
}

function Stat({ value, label }: { value: string; label: string }) {
	return (
		<div>
			<div className="font-display text-2xl sm:text-3xl text-paper tabular-nums">
				{value}
			</div>
			<div className="eyebrow text-paper/50 mt-1">{label}</div>
		</div>
	);
}
