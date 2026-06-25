import { useState, useRef, useEffect } from "react";
import {
	PlayIcon,
	StopIcon,
	MicrophoneIcon,
	DocumentTextIcon,
	EnvelopeIcon,
	ArchiveBoxIcon,
	ShareIcon,
	ClockIcon,
	ChartBarIcon,
	CheckIcon,
} from "@heroicons/react/24/outline";
import SectionHeading from "@/components/SectionHeading";

// Mock demo transcript data
const demoTranscript = [
	{
		speaker: "Justice A. Adebayo",
		time: "09:00:15",
		text: "Good morning. We are here today for the matter between Zenith Bank PLC and Lagos State Development Corporation. Case number FHC/ABJ/CS/123/2025.",
	},
	{
		speaker: "Counsel for Plaintiff",
		time: "09:01:32",
		text: "Thank you, My Lord. We are seeking damages in the sum of ₦500 million for breach of contract. The defendant failed to make payment as agreed in the construction contract signed in January 2024.",
	},
	{
		speaker: "Counsel for Defendant",
		time: "09:03:45",
		text: "My Lord, we respectfully disagree. The plaintiff did not complete the work as specified in the contract terms. We have evidence of substandard construction that does not meet the agreed specifications.",
	},
	{
		speaker: "Justice A. Adebayo",
		time: "09:05:12",
		text: "I have reviewed the preliminary documents. Counsel for plaintiff, can you provide evidence of completion of the construction work as per the contract specifications?",
	},
];

interface LiveDemoProps {
	isActive: boolean;
}

export default function LiveDemo({ isActive }: LiveDemoProps) {
	const [isRecording, setIsRecording] = useState(false);
	const [transcriptEntries, setTranscriptEntries] = useState<any[]>([]);
	const [accuracy, setAccuracy] = useState(95);
	const [summary, setSummary] = useState("");
	const [sessionDuration, setSessionDuration] = useState(0);
	const [wordCount, setWordCount] = useState(0);
	const [notification, setNotification] = useState<string>("");
	const [emailForm, setEmailForm] = useState({
		show: false,
		email: "",
		subject: "",
	});
	const [shareLink, setShareLink] = useState("");
	const [showShareModal, setShowShareModal] = useState(false);

	const transcriptRef = useRef<HTMLDivElement>(null);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const accuracyValues = [95, 94, 96, 93, 97, 94, 95];

	useEffect(() => {
		if (isRecording) {
			timerRef.current = setInterval(() => {
				setSessionDuration((prev) => prev + 1);
			}, 1000);
		} else {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		}

		return () => {
			if (timerRef.current) {
				clearInterval(timerRef.current);
			}
		};
	}, [isRecording]);

	const showNotification = (message: string) => {
		setNotification(message);
		setTimeout(() => setNotification(""), 3000);
	};

	const toggleRecording = () => {
		if (!isRecording) {
			setIsRecording(true);
			setTranscriptEntries([]);
			setSummary("");
			setSessionDuration(0);
			setWordCount(0);
			startDemoTranscription();
		} else {
			setIsRecording(false);
			stopDemoTranscription();
		}
	};

	const startDemoTranscription = () => {
		let currentIndex = 0;

		intervalRef.current = setInterval(() => {
			if (currentIndex < demoTranscript.length) {
				const newEntry = demoTranscript[currentIndex];
				setTranscriptEntries((prev) => [...prev, newEntry]);
				setWordCount((prev) => prev + newEntry.text.split(" ").length);
				setAccuracy(accuracyValues[currentIndex % accuracyValues.length]);
				currentIndex++;

				if (transcriptRef.current) {
					transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
				}
			} else {
				setTimeout(() => {
					setSummary(
						"Contract dispute between Zenith Bank PLC and Lagos State Development Corporation regarding a ₦500M construction contract. Key points: Contract signed January 2024, alleged payment breach, seeking damages and specific performance."
					);
				}, 2000);

				if (intervalRef.current) {
					clearInterval(intervalRef.current);
				}
			}
		}, 3000);
	};

	const stopDemoTranscription = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}
	};

	// Export to PDF function
	const exportToPDF = () => {
		if (transcriptEntries.length === 0) {
			showNotification("No transcript data to export. Start recording first.");
			return;
		}

		// Create PDF content
		const content = `
COURT TRANSCRIPT - FHC/ABJ/CS/123/2025
Federal High Court Session
Hon. Justice A. Adebayo • Contract Dispute
Session Duration: ${formatTime(sessionDuration)}
Accuracy: ${accuracy}%
Word Count: ${wordCount}

TRANSCRIPT:
${transcriptEntries
	.map((entry) => `[${entry.time}] ${entry.speaker}: ${entry.text}`)
	.join("\n\n")}

${summary ? `\nAI SUMMARY:\n${summary}` : ""}
    `.trim();

		// Create blob and download
		const blob = new Blob([content], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `court-transcript-${
			new Date().toISOString().split("T")[0]
		}.txt`;
		a.click();
		URL.revokeObjectURL(url);

		showNotification("Transcript exported successfully!");
	};

	// Email summary function
	const handleEmailSummary = () => {
		if (!summary) {
			showNotification("No summary available yet. Complete recording first.");
			return;
		}
		setEmailForm({
			show: true,
			email: "",
			subject: `Court Case Summary - FHC/ABJ/CS/123/2025`,
		});
	};

	const sendEmail = () => {
		if (!emailForm.email) {
			showNotification("Please enter an email address.");
			return;
		}

		// Simulate email sending
		const emailBody = `Subject: ${emailForm.subject}

Court Case: FHC/ABJ/CS/123/2025
Session Duration: ${formatTime(sessionDuration)}
Accuracy: ${accuracy}%

Summary:
${summary}

This email was generated automatically by the Court Transcription System.`;

		// In a real app, you'd make an API call here
		console.log("Sending email to:", emailForm.email);
		console.log("Email content:", emailBody);

		setEmailForm({ show: false, email: "", subject: "" });
		showNotification(`Summary sent to ${emailForm.email}!`);
	};

	// Archive session function
	const archiveSession = () => {
		if (transcriptEntries.length === 0) {
			showNotification("No session data to archive. Start recording first.");
			return;
		}

		// Simulate archiving process
		const sessionData = {
			caseNumber: "FHC/ABJ/CS/123/2025",
			date: new Date().toISOString(),
			duration: sessionDuration,
			accuracy: accuracy,
			wordCount: wordCount,
			transcript: transcriptEntries,
			summary: summary,
		};

		// In a real app, you'd save to database
		console.log("Archiving session:", sessionData);
		showNotification("Session archived successfully!");
	};

	// Share transcript function
	const shareTranscript = () => {
		if (transcriptEntries.length === 0) {
			showNotification("No transcript to share. Start recording first.");
			return;
		}

		// Generate a mock share link
		const mockShareId = Math.random().toString(36).substring(7);
		const shareUrl = `https://judiscribe.app/share/${mockShareId}`;
		setShareLink(shareUrl);
		setShowShareModal(true);
	};

	const copyShareLink = () => {
		navigator.clipboard.writeText(shareLink);
		showNotification("Share link copied to clipboard!");
		setShowShareModal(false);
	};

	const formatTime = (seconds: number) => {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins.toString().padStart(2, "0")}:${secs
			.toString()
			.padStart(2, "0")}`;
	};

	if (!isActive) return null;

	return (
		<div className="space-y-8">
			<SectionHeading
				eyebrow="Live Demo"
				title="A session, on the record"
				lead="Press record to watch Judiscribe capture proceedings in real time, attribute each speaker, and draft the case summary as it listens."
			/>

			{/* Notification */}
			{notification && (
				<div className="fixed top-20 right-5 bg-ink text-paper px-4 py-3 rounded-sm shadow-2xl flex items-center gap-2 z-50">
					<CheckIcon className="w-4 h-4 text-accent-soft" />
					<span className="text-sm">{notification}</span>
				</div>
			)}

			{/* Session header */}
			<div className="bg-paper-raised border border-rule rounded-sm">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 p-5 sm:p-6 border-b border-rule">
					<div className="flex items-center gap-4">
						<div className="w-11 h-11 bg-ink rounded-sm flex items-center justify-center flex-shrink-0">
							<DocumentTextIcon className="w-5 h-5 text-paper" />
						</div>
						<div className="min-w-0">
							<h3 className="font-mono text-base text-ink truncate">
								FHC/ABJ/CS/123/2025
							</h3>
							<p className="text-sm text-muted">
								Federal High Court · Hon. Justice A. Adebayo · Contract dispute
							</p>
						</div>
					</div>

					{/* Controls */}
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-2 px-3 py-2 border border-rule rounded-sm">
							<span
								className={`w-1.5 h-1.5 rounded-full ${
									isRecording ? "bg-accent animate-live" : "bg-rule-strong"
								}`}
							/>
							<span className="eyebrow text-muted">
								{isRecording ? "On record" : "Standby"}
							</span>
						</div>
						<button
							onClick={toggleRecording}
							className={`flex items-center gap-2 px-5 py-2.5 rounded-sm text-sm font-medium transition-colors ${
								isRecording
									? "bg-accent hover:bg-accent-soft text-paper"
									: "bg-ink hover:bg-ink-soft text-paper"
							}`}
						>
							{isRecording ? (
								<StopIcon className="w-4 h-4" />
							) : (
								<PlayIcon className="w-4 h-4" />
							)}
							<span>{isRecording ? "Stop recording" : "Start recording"}</span>
						</button>
					</div>
				</div>

				{/* Session stats */}
				<dl className="grid grid-cols-3 divide-x divide-rule">
					<SessionStat
						icon={<ClockIcon className="w-3.5 h-3.5" />}
						label="Duration"
						value={formatTime(sessionDuration)}
					/>
					<SessionStat
						icon={<ChartBarIcon className="w-3.5 h-3.5" />}
						label="Accuracy"
						value={`${accuracy}%`}
						accent
					/>
					<SessionStat label="Words" value={wordCount.toString()} />
				</dl>
			</div>

			{/* Main content */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Transcript */}
				<div className="lg:col-span-2 bg-paper-raised border border-rule rounded-sm overflow-hidden flex flex-col">
					<div className="flex items-center justify-between px-5 py-3 border-b border-rule">
						<span className="eyebrow text-ink-soft">Verbatim record</span>
						<span className="eyebrow text-accent flex items-center gap-1.5">
							{isRecording && (
								<span className="w-1.5 h-1.5 rounded-full bg-accent animate-live" />
							)}
							{accuracy}% accuracy
						</span>
					</div>

					<div
						ref={transcriptRef}
						className="p-5 h-80 lg:h-[26rem] overflow-y-auto"
					>
						{transcriptEntries.length === 0 ? (
							<div className="flex flex-col items-center justify-center h-full text-center px-6">
								<div className="w-12 h-12 border border-rule-strong rounded-full flex items-center justify-center mb-4">
									<MicrophoneIcon className="w-5 h-5 text-muted" />
								</div>
								<p className="font-display text-lg text-ink mb-1.5">
									Ready to transcribe
								</p>
								<p className="text-sm text-muted max-w-xs leading-relaxed">
									Start the recording to capture every word with speaker
									attribution and timestamps.
								</p>
							</div>
						) : (
							<div className="space-y-5">
								{transcriptEntries.map((entry, index) => (
									<div
										key={index}
										className="grid grid-cols-[auto_1fr] gap-x-4 group"
									>
										<span className="font-mono text-xs text-muted pt-0.5 tabular-nums">
											{entry.time}
										</span>
										<div className="border-l border-rule pl-4 group-hover:border-accent transition-colors">
											<span className="font-mono text-[11px] tracking-wider text-accent uppercase">
												{entry.speaker}
											</span>
											<p className="mt-1 text-sm leading-relaxed text-ink-soft">
												{entry.text}
											</p>
										</div>
									</div>
								))}
								{isRecording && (
									<div className="grid grid-cols-[auto_1fr] gap-x-4">
										<span />
										<span className="inline-block w-2 h-4 bg-accent/70 animate-live ml-4" />
									</div>
								)}
							</div>
						)}
					</div>
				</div>

				{/* Sidebar */}
				<div className="space-y-6">
					{/* AI Summary */}
					<div className="bg-paper-raised border border-rule rounded-sm">
						<div className="flex items-center gap-2 px-5 py-3 border-b border-rule">
							<span className="eyebrow text-accent">AI</span>
							<span className="eyebrow text-ink-soft">Case summary</span>
						</div>
						<div className="p-5">
							{summary ? (
								<p className="text-sm leading-relaxed text-ink-soft">{summary}</p>
							) : (
								<p className="text-sm text-muted leading-relaxed">
									The summary is drafted automatically once recording is
									underway, with the key legal points and relief sought.
								</p>
							)}
						</div>
					</div>

					{/* Quick actions */}
					<div className="bg-paper-raised border border-rule rounded-sm">
						<div className="px-5 py-3 border-b border-rule">
							<span className="eyebrow text-ink-soft">Actions</span>
						</div>
						<div className="p-2">
							<ActionRow
								icon={<DocumentTextIcon className="w-4 h-4" />}
								label="Export to PDF"
								onClick={exportToPDF}
							/>
							<ActionRow
								icon={<EnvelopeIcon className="w-4 h-4" />}
								label="Email summary"
								onClick={handleEmailSummary}
							/>
							<ActionRow
								icon={<ArchiveBoxIcon className="w-4 h-4" />}
								label="Archive session"
								onClick={archiveSession}
							/>
							<ActionRow
								icon={<ShareIcon className="w-4 h-4" />}
								label="Share transcript"
								onClick={shareTranscript}
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Email modal */}
			{emailForm.show && (
				<Modal title="Email summary" onClose={() => setEmailForm({ show: false, email: "", subject: "" })}>
					<div className="space-y-4">
						<Field label="Email address">
							<input
								type="email"
								value={emailForm.email}
								onChange={(e) =>
									setEmailForm({ ...emailForm, email: e.target.value })
								}
								className="w-full px-3 py-2 text-ink bg-paper border border-rule-strong rounded-sm focus:border-accent outline-none text-sm"
								placeholder="name@example.com"
							/>
						</Field>
						<Field label="Subject">
							<input
								type="text"
								value={emailForm.subject}
								onChange={(e) =>
									setEmailForm({ ...emailForm, subject: e.target.value })
								}
								className="w-full px-3 py-2 text-ink bg-paper border border-rule-strong rounded-sm focus:border-accent outline-none text-sm"
							/>
						</Field>
						<div className="flex gap-3 pt-2">
							<button
								onClick={() => setEmailForm({ show: false, email: "", subject: "" })}
								className="flex-1 px-4 py-2.5 text-ink-soft border border-rule rounded-sm hover:bg-paper transition-colors text-sm"
							>
								Cancel
							</button>
							<button
								onClick={sendEmail}
								className="flex-1 px-4 py-2.5 bg-ink text-paper rounded-sm hover:bg-ink-soft transition-colors text-sm"
							>
								Send email
							</button>
						</div>
					</div>
				</Modal>
			)}

			{/* Share modal */}
			{showShareModal && (
				<Modal title="Share transcript" onClose={() => setShowShareModal(false)}>
					<Field label="Share link">
						<div className="flex">
							<input
								type="text"
								value={shareLink}
								readOnly
								className="flex-1 px-3 py-2 text-ink-soft bg-paper border border-rule-strong rounded-l-sm text-sm font-mono"
							/>
							<button
								onClick={copyShareLink}
								className="px-4 py-2 bg-ink text-paper rounded-r-sm hover:bg-ink-soft transition-colors text-sm"
							>
								Copy
							</button>
						</div>
					</Field>
					<div className="flex justify-end pt-4">
						<button
							onClick={() => setShowShareModal(false)}
							className="px-5 py-2.5 text-ink-soft border border-rule rounded-sm hover:bg-paper transition-colors text-sm"
						>
							Close
						</button>
					</div>
				</Modal>
			)}
		</div>
	);
}

function SessionStat({
	icon,
	label,
	value,
	accent,
}: {
	icon?: React.ReactNode;
	label: string;
	value: string;
	accent?: boolean;
}) {
	return (
		<div className="px-5 py-4 text-center">
			<dd
				className={`font-mono text-lg tabular-nums ${
					accent ? "text-accent" : "text-ink"
				}`}
			>
				{value}
			</dd>
			<dt className="eyebrow text-muted flex items-center justify-center gap-1 mt-1">
				{icon}
				{label}
			</dt>
		</div>
	);
}

function ActionRow({
	icon,
	label,
	onClick,
}: {
	icon: React.ReactNode;
	label: string;
	onClick: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className="w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-sm text-ink-soft hover:bg-paper hover:text-ink transition-colors group"
		>
			<span className="text-muted group-hover:text-accent transition-colors">
				{icon}
			</span>
			<span className="text-sm font-medium">{label}</span>
		</button>
	);
}

function Modal({
	title,
	onClose,
	children,
}: {
	title: string;
	onClose: () => void;
	children: React.ReactNode;
}) {
	return (
		<div
			className="fixed inset-0 bg-ink/60 flex items-center justify-center z-50 p-4"
			onClick={onClose}
		>
			<div
				className="bg-paper-raised border border-rule-strong rounded-sm shadow-2xl max-w-md w-full p-6"
				onClick={(e) => e.stopPropagation()}
			>
				<h3 className="font-display text-xl text-ink mb-5">{title}</h3>
				{children}
			</div>
		</div>
	);
}

function Field({
	label,
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div>
			<label className="eyebrow text-muted block mb-1.5">{label}</label>
			{children}
		</div>
	);
}
