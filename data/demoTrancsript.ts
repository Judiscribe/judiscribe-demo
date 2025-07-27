export interface TranscriptEntry {
  speaker: string;
  time: string;
  text: string;
}

export const demoTranscript: TranscriptEntry[] = [
    {speaker: "COURT CLERK", time: "10:00:15", text: "Court is now in session. The Honorable Justice A. Adebayo presiding."},
    {speaker: "JUDGE", time: "10:00:32", text: "Good morning. We are here for the matter of Zenith Bank PLC versus Lagos State Development Corporation. Suit number FHC/ABJ/CS/123/2025."},
    {speaker: "COUNSEL FOR PLAINTIFF", time: "10:01:05", text: "May it please your Lordship, I am Barrister M. Okafor appearing for the plaintiff in this contract dispute matter."},
    {speaker: "JUDGE", time: "10:01:28", text: "Thank you. And for the defense?"},
    {speaker: "COUNSEL FOR DEFENDANT", time: "10:01:35", text: "I am Barrister F. Adeyemi representing Lagos State Development Corporation, the defendant in this matter."},
    {speaker: "JUDGE", time: "10:01:52", text: "Very well. Barrister Okafor, you may proceed with your opening statement regarding the alleged breach of construction contract."},
    {speaker: "COUNSEL FOR PLAINTIFF", time: "10:02:15", text: "Thank you, My Lord. This case centers on a N500 million construction contract signed in January 2024, where the defendant failed to make scheduled payments as agreed."}
  ];