interface SealProps {
	className?: string;
	tone?: "ink" | "paper";
}

/*
 * The Judiscribe seal — a court stamp rendered as line art.
 * A double ring carrying the wordmark around a pair of scales.
 * This is the page's signature mark; it replaces the emoji logo.
 */
export default function Seal({ className = "", tone = "ink" }: SealProps) {
	const stroke = tone === "paper" ? "var(--color-paper)" : "var(--color-ink)";
	const accent = "var(--color-accent)";

	return (
		<svg
			viewBox="0 0 100 100"
			className={className}
			role="img"
			aria-label="Judiscribe seal"
			fill="none"
		>
			<circle cx="50" cy="50" r="47" stroke={stroke} strokeWidth="1" />
			<circle cx="50" cy="50" r="38" stroke={stroke} strokeWidth="0.75" />

			{/* circular wordmark */}
			<defs>
				<path
					id="seal-arc-top"
					d="M 50 9 A 41 41 0 0 1 50 91"
					transform="rotate(-90 50 50)"
				/>
				<path
					id="seal-arc-bottom"
					d="M 50 91 A 41 41 0 0 1 50 9"
					transform="rotate(90 50 50)"
				/>
			</defs>
			<text
				fill={stroke}
				style={{
					fontFamily: "var(--font-mono)",
					fontSize: "7px",
					letterSpacing: "3.5px",
				}}
			>
				<textPath href="#seal-arc-top" startOffset="50%" textAnchor="middle">
					JUDISCRIBE
				</textPath>
			</text>
			<text
				fill={stroke}
				style={{
					fontFamily: "var(--font-mono)",
					fontSize: "7px",
					letterSpacing: "3.5px",
				}}
			>
				<textPath href="#seal-arc-bottom" startOffset="50%" textAnchor="middle">
					DE JURE
				</textPath>
			</text>

			{/* scales of justice, centered */}
			<g stroke={stroke} strokeWidth="1.4" strokeLinecap="round">
				<line x1="50" y1="34" x2="50" y2="66" />
				<line x1="34" y1="40" x2="66" y2="40" />
				<line x1="44" y1="66" x2="56" y2="66" />
				{/* left pan */}
				<path d="M 34 40 L 29 52 L 39 52 Z" fill="none" />
				{/* right pan */}
				<path d="M 66 40 L 61 52 L 71 52 Z" fill="none" />
			</g>
			<circle cx="50" cy="33" r="2" fill={accent} stroke="none" />
		</svg>
	);
}
