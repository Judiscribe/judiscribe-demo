import {
	CheckCircleIcon,
	XCircleIcon,
	ArrowRightIcon,
	ClockIcon,
	BoltIcon,
	CogIcon,
} from "@heroicons/react/24/outline";

interface WorkflowProps {
	isActive: boolean;
}

const WorkflowStep = ({
	step,
	title,
	description,
	isNew = false,
	time,
	position = "center",
}: {
	step: number;
	title: string;
	description: string;
	isNew?: boolean;
	time?: string;
	position?: "left" | "right" | "center";
}) => (
	<div
		className={`relative group ${
			position === "left"
				? "mr-8 md:mr-16"
				: position === "right"
				? "ml-8 md:ml-16"
				: ""
		}`}
	>
		{/* Step Card */}
		<div
			className={`relative p-6 rounded-2xl border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${
				isNew
					? "bg-white border-slate-200 hover:border-slate-300 shadow-lg"
					: "bg-white border-gray-200 hover:border-gray-300 shadow-lg"
			}`}
		>
			{/* Step Number with Glow Effect */}
			<div
				className={`absolute -top-4 ${
					position === "left"
						? "-right-4"
						: position === "right"
						? "-left-4"
						: "left-1/2 -translate-x-1/2"
				} w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg transition-all duration-300 group-hover:scale-110 ${
					isNew
						? "bg-gradient-to-br from-emerald-500 to-teal-600"
						: "bg-gradient-to-br from-slate-500 to-gray-600"
				}`}
			>
				{step}
				<div
					className={`absolute inset-0 rounded-full animate-pulse ${
						isNew ? "bg-emerald-400" : "bg-slate-400"
					} opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
				/>
			</div>

			<div className="pt-4">
				<div className="flex items-center justify-between mb-4">
					<h4
						className={`font-bold text-lg ${
							isNew ? "text-slate-800" : "text-gray-800"
						}`}
					>
						{title}
					</h4>
					{time && (
						<div
							className={`flex items-center space-x-1 text-xs px-3 py-1.5 rounded-full font-semibold ${
								isNew
									? "bg-emerald-50 text-emerald-700 border border-emerald-200"
									: "bg-slate-50 text-slate-700 border border-slate-200"
							}`}
						>
							<ClockIcon className="w-3 h-3" />
							<span>{time}</span>
						</div>
					)}
				</div>
				<p className="text-gray-600 text-sm leading-relaxed">{description}</p>
			</div>
		</div>
	</div>
);

const FlowConnector = ({
	isNew = false,
	type = "straight",
}: {
	isNew?: boolean;
	type?: "straight" | "curved" | "zigzag";
}) => {
	const baseColor = isNew ? "stroke-emerald-300" : "stroke-slate-300";

	if (type === "curved") {
		return (
			<div className="flex justify-center my-4">
				<svg width="200" height="60" className="overflow-visible">
					<path
						d="M 20 30 Q 100 10 180 30"
						fill="none"
						strokeWidth="3"
						className={`${baseColor} transition-all duration-300`}
						strokeDasharray="5,5"
					>
						<animate
							attributeName="stroke-dashoffset"
							values="0;-10"
							dur="1s"
							repeatCount="indefinite"
						/>
					</path>
					<circle
						cx="180"
						cy="30"
						r="4"
						className={`${isNew ? "fill-emerald-400" : "fill-slate-400"}`}
					>
						<animate
							attributeName="r"
							values="4;6;4"
							dur="2s"
							repeatCount="indefinite"
						/>
					</circle>
				</svg>
			</div>
		);
	}

	if (type === "zigzag") {
		return (
			<div className="flex justify-center my-4">
				<svg width="160" height="80" className="overflow-visible">
					<path
						d="M 20 40 L 60 20 L 100 60 L 140 40"
						fill="none"
						strokeWidth="3"
						className={`${baseColor} transition-all duration-300`}
						strokeDasharray="8,4"
					>
						<animate
							attributeName="stroke-dashoffset"
							values="0;-12"
							dur="1.5s"
							repeatCount="indefinite"
						/>
					</path>
					<circle
						cx="140"
						cy="40"
						r="4"
						className={`${isNew ? "fill-emerald-400" : "fill-slate-400"}`}
					>
						<animate
							attributeName="r"
							values="4;7;4"
							dur="1.8s"
							repeatCount="indefinite"
						/>
					</circle>
				</svg>
			</div>
		);
	}

	return (
		<div className="flex justify-center my-0 -mt-2 -mb-2">
			<svg width="40" height="80" className="overflow-visible">
				<line
					x1="20"
					y1="0"
					x2="20"
					y2="80"
					strokeWidth="3"
					className={`${baseColor} transition-all duration-300`}
					strokeDasharray="6,6"
				>
					<animate
						attributeName="stroke-dashoffset"
						values="0;-12"
						dur="1s"
						repeatCount="indefinite"
					/>
				</line>
				<polygon
					points="15,75 25,75 20,85"
					className={`${isNew ? "fill-emerald-400" : "fill-slate-400"}`}
				>
					<animateTransform
						attributeName="transform"
						type="translate"
						values="0,0; 0,3; 0,0"
						dur="2s"
						repeatCount="indefinite"
					/>
				</polygon>
			</svg>
		</div>
	);
};

export default function Workflow({ isActive }: WorkflowProps) {
	if (!isActive) return null;

	return (
		<div className="max-w-7xl mx-auto space-y-12">
			{/* Header */}
			<div className="text-center space-y-4">
				<h2 className="text-2xl md:text-3xl font-bold text-gray-900">
					Current vs New Process
				</h2>
				<p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
					See how Judiscribe transforms court documentation from manual
					processes to automated workflows
				</p>
			</div>

			{/* Time Comparison with Dynamic Visual */}
			<div className="relative w-fit mx-auto bg-white rounded-2xl border border-gray-200 p-12 shadow-md overflow-hidden ">
				{/* Background Pattern */}
				<div className="absolute inset-0 opacity-5">
					<svg width="100%" height="100%" className="absolute inset-0">
						<defs>
							<pattern
								id="grid"
								width="40"
								height="40"
								patternUnits="userSpaceOnUse"
							>
								<path
									d="M 40 0 L 0 0 0 40"
									fill="none"
									stroke="currentColor"
									strokeWidth="1"
								/>
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#grid)" />
					</svg>
				</div>

				<h3 className="text-xl font-bold text-gray-900 text-center mb-8 relative z-10">
					Processing Time Transformation
				</h3>

				<div className="relative z-10 flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-16">
					{/* Old Process */}
					<div className="text-center relative">
						<div className="relative p-4 rounded-xl bg-gradient-to-br from-gray-50 to-slate-100 border-2 border-slate-200">
							<CogIcon
								className="w-8 h-8 text-slate-500 mx-auto mb-2 animate-spin"
								style={{ animationDuration: "3s" }}
							/>
							<div className="text-2xl font-bold text-slate-700 mb-1">
								4-6 hours
							</div>
							<div className="text-slate-600 font-semibold">Manual Process</div>
							<div className="text-xs text-slate-500 mt-2">
								Slow • Error-prone • Labor-intensive
							</div>
						</div>
					</div>

					{/* Transformation Arrow */}
					<div className="relative">
						<svg width="200" height="120" className="overflow-visible">
							<defs>
								<linearGradient
									id="arrowGradient"
									x1="0%"
									y1="0%"
									x2="100%"
									y2="0%"
								>
									<stop offset="0%" stopColor="#64748b" />
									<stop offset="100%" stopColor="#10b981" />
								</linearGradient>
							</defs>
							<path
								d="M 20 60 Q 100 20 180 60"
								fill="none"
								stroke="url(#arrowGradient)"
								strokeWidth="4"
								strokeDasharray="8,4"
							>
								<animate
									attributeName="stroke-dashoffset"
									values="0;-12"
									dur="2s"
									repeatCount="indefinite"
								/>
							</path>
							<polygon points="175,55 175,65 190,60" fill="#10b981">
								<animateTransform
									attributeName="transform"
									type="translate"
									values="0,0; 5,0; 0,0"
									dur="2s"
									repeatCount="indefinite"
								/>
							</polygon>
							<text
								x="100"
								y="15"
								textAnchor="middle"
								className="text-sm font-semibold fill-gray-600"
							>
								TRANSFORM
							</text>
						</svg>
					</div>

					{/* New Process */}
					<div className="text-center relative">
						<div className="relative p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-100 border-2 border-emerald-200">
							<BoltIcon className="w-8 h-8 text-emerald-600 mx-auto mb-1" />
							<div className="text-2xl font-bold text-emerald-700 mb-1">
								5-10 min
							</div>
							<div className="text-emerald-600 font-semibold">AI-Powered</div>
							<div className="text-xs text-emerald-600 mt-2">
								Fast • Accurate • Automated
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Creative Workflow Comparison */}
			<div className="grid lg:grid-cols-2 gap-16">
				{/* Current Process - Chaotic Flow */}
				<div className="space-y-8">
					<div className="text-center p-6 bg-gradient-to-r from-slate-50 to-gray-50 rounded-2xl border-2 border-slate-200 mb-16">
						<XCircleIcon className="w-8 h-8 text-slate-600 mx-auto mb-2" />
						<h3 className="text-base md:text-lg font-bold text-slate-800">
							Current Manual Process
						</h3>
						<p className="text-slate-600 mt-2">
							Disconnected • Time-consuming • Manual
						</p>
					</div>

					{/* Chaotic Flow Pattern */}
					<div className="relative">
						<WorkflowStep
							step={1}
							title="Manual Note-taking"
							description="Court clerk manually writes proceedings during session, often missing important details due to speed of speech"
							time="2-3 hours"
							position="left"
						/>
						<FlowConnector type="zigzag" />

						<WorkflowStep
							step={2}
							title="Document Compilation"
							description="Hours spent organizing handwritten notes and typing up complete records after court session ends"
							time="2-4 hours"
							position="right"
						/>
						<FlowConnector type="curved" />

						<WorkflowStep
							step={3}
							title="Review & Corrections"
							description="Manual review process to verify accuracy and make corrections, often requiring multiple revisions"
							time="1-2 hours"
							position="left"
						/>
						<FlowConnector type="zigzag" />

						<WorkflowStep
							step={4}
							title="Distribution & Filing"
							description="Physical delivery or email distribution to relevant parties, followed by manual filing in archives"
							time="1-3 days"
							position="center"
						/>
					</div>
				</div>

				{/* New Process - Smooth Flow */}
				<div className="space-y-8">
					<div className="text-center p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200 mb-16">
						<CheckCircleIcon className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
						<h3 className="text-base md:text-lg font-bold text-emerald-800">
							With Judiscribe
						</h3>
						<p className="text-emerald-600 mt-2">
							Connected • Efficient • Intelligent
						</p>
					</div>

					{/* Smooth Flow Pattern */}
					<div className="relative">
						<WorkflowStep
							step={1}
							title="AI Real-time Transcription"
							description="Advanced AI captures every word with speaker identification, timestamps, and 99% accuracy as proceedings happen"
							time="Real-time"
							isNew={true}
							position="center"
						/>
						<FlowConnector isNew={true} type="straight" />

						<WorkflowStep
							step={2}
							title="Instant AI Summary"
							description="Automated generation of case summary with key legal points, decisions, and action items immediately after session"
							time="< 1 minute"
							isNew={true}
							position="center"
						/>
						<FlowConnector isNew={true} type="straight" />

						<WorkflowStep
							step={3}
							title="Quality Assurance"
							description="AI-powered accuracy verification with minimal human oversight required for final approval"
							time="2-3 minutes"
							isNew={true}
							position="center"
						/>
						<FlowConnector isNew={true} type="straight" />

						<WorkflowStep
							step={4}
							title="Auto Distribution & Archive"
							description="Secure automated delivery to authorized parties with searchable digital archiving in cloud storage"
							time="Instant"
							isNew={true}
							position="center"
						/>
					</div>
				</div>
			</div>

			{/* Benefits Summary */}
			<div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-md mb-4">
				<h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
					Transformation Impact
				</h3>
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
					{[
						{ value: "98%", label: "Time Reduction", color: "blue" },
						{ value: "99%", label: "Accuracy Rate", color: "emerald" },
						{ value: "100%", label: "Digital Process", color: "purple" },
						{ value: "$50M", label: "Total Addressable Market", color: "orange" },
					].map((stat, index) => (
						<div
							key={index}
							className={`p-6 rounded-2xl text-center transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-br ${
								stat.color === "blue"
									? "from-blue-50 to-indigo-50 border border-blue-200"
									: stat.color === "emerald"
									? "from-emerald-50 to-teal-50 border border-emerald-200"
									: stat.color === "purple"
									? "from-purple-50 to-violet-50 border border-purple-200"
									: "from-orange-50 to-amber-50 border border-orange-200"
							}`}
						>
							<div
								className={`text-3xl font-bold mb-2 ${
									stat.color === "blue"
										? "text-blue-700"
										: stat.color === "emerald"
										? "text-emerald-700"
										: stat.color === "purple"
										? "text-purple-700"
										: "text-orange-700"
								}`}
							>
								{stat.value}
							</div>
							<div
								className={`text-sm font-semibold ${
									stat.color === "blue"
										? "text-blue-600"
										: stat.color === "emerald"
										? "text-emerald-600"
										: stat.color === "purple"
										? "text-purple-600"
										: "text-orange-600"
								}`}
							>
								{stat.label}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
