interface SealProps {
	className?: string;
	tone?: "ink" | "paper";
}

/*
 * The Judiscribe mark — a gavel poised over an open book.
 * Rendered as solid shapes so it reads cleanly at any size.
 * On paper (light surfaces) it carries the blue accent; on the
 * navy cover it inverts to white for contrast.
 */
export default function Seal({ className = "", tone = "ink" }: SealProps) {
	const fill = tone === "paper" ? "var(--color-paper)" : "var(--color-accent)";

	return (
		<svg
			viewBox="0 0 100 100"
			className={className}
			role="img"
			aria-label="Judiscribe logo"
			fill={fill}
		>
			{/* Gavel — head poised over the book, handle to the lower right */}
			<g transform="rotate(-32 50 36)">
				{/* striking face cap (left band) */}
				<rect x="30" y="23" width="6.5" height="22" rx="3.25" />
				{/* barrel / head */}
				<rect x="35" y="27" width="30" height="14" rx="7" />
				{/* opposite cap (right band) */}
				<rect x="63.5" y="23" width="6.5" height="22" rx="3.25" />
				{/* handle */}
				<rect x="46" y="40" width="8" height="32" rx="4" />
			</g>

			{/* Open book — two pages fanned from a central spine */}
			<path d="M 50 64 C 36 57, 22 55, 11 58 L 11 67 C 22 64, 36 66, 50 76 Z" />
			<path d="M 50 64 C 64 57, 78 55, 89 58 L 89 67 C 78 64, 64 66, 50 76 Z" />
		</svg>
	);
}
