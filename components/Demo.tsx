import { useState, useRef, useEffect } from "react";
import {
  PlayIcon,
  StopIcon,
  MicrophoneIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  ArchiveBoxIcon,
  ShareIcon,
  SpeakerWaveIcon,
  ClockIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { demoTranscript } from "@/data/demoTrancsript";


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

  const showAlert = (action: string) => {
    alert(`${action} feature will be available in the full version.`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isActive) return null;

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Session Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col space-y-4">
          {/* Case Information */}
          <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <DocumentTextIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">FHC/ABJ/CS/123/2025</h2>
              <p className="text-sm sm:text-base text-gray-600">Federal High Court Session</p>
              <p className="text-xs sm:text-sm text-gray-500">Hon. Justice A. Adebayo • Contract Dispute</p>
            </div>
          </div>
          
          {/* Session Stats */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 py-3 border-t border-gray-100">
            <div className="text-center">
              <div className="text-base sm:text-lg font-semibold text-gray-900">{formatTime(sessionDuration)}</div>
              <div className="text-xs sm:text-sm text-gray-500 flex items-center justify-center mt-1">
                <ClockIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Duration
              </div>
            </div>
            <div className="text-center">
              <div className="text-base sm:text-lg font-semibold text-green-600">{accuracy}%</div>
              <div className="text-xs sm:text-sm text-gray-500 flex items-center justify-center mt-1">
                <ChartBarIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                Accuracy
              </div>
            </div>
            <div className="text-center">
              <div className="text-base sm:text-lg font-semibold text-blue-600">{wordCount}</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1">Words</div>
            </div>
          </div>
        </div>
        
        {/* Recording Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center mt-4 sm:mt-6 space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={toggleRecording}
            className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
              isRecording
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isRecording ? <StopIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
            <span>{isRecording ? "Stop Recording" : "Start Recording"}</span>
          </button>
          
          <div className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gray-50 rounded-lg border">
            <div className={`w-2 h-2 rounded-full ${isRecording ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}></div>
            <span className="text-xs sm:text-sm text-gray-600 font-medium">
              {isRecording ? "Recording Active" : "Ready to Record"}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Transcript Panel */}
        <div className="order-1 lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-3 sm:p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <SpeakerWaveIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Live Transcript</h3>
              </div>
              <div className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                {accuracy}%
              </div>
            </div>
          </div>

          {/* Transcript Content */}
          <div ref={transcriptRef} className="p-3 sm:p-4 h-64 sm:h-80 lg:h-96 overflow-y-auto">
            {transcriptEntries.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 px-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <MicrophoneIcon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                </div>
                <h4 className="text-base sm:text-lg font-medium text-gray-600 mb-2 text-center">Ready to Transcribe</h4>
                <p className="text-center text-xs sm:text-sm text-gray-500 max-w-md leading-relaxed">
                  Click "Start Recording" to begin real-time AI-powered transcription with speaker identification
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {transcriptEntries.map((entry, index) => (
                  <div key={index} className="border-l-3 sm:border-l-4 border-blue-500 pl-3 sm:pl-4 py-2 hover:bg-gray-50 rounded-r-lg transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 mb-1">
                      <span className="font-semibold text-blue-700 text-sm sm:text-base">{entry.speaker}</span>
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded w-fit">
                        {entry.time}
                      </span>
                    </div>
                    <p className="text-gray-800 leading-relaxed text-sm sm:text-base">{entry.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="order-2 space-y-4 sm:space-y-6">
          {/* AI Summary */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">AI</span>
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900">Case Summary</h4>
            </div>
            <div className="text-gray-700">
              {summary ? (
                <div className="bg-gray-50 rounded-lg p-3 border text-xs sm:text-sm leading-relaxed">
                  {summary}
                </div>
              ) : (
                <div className="text-center py-4 sm:py-6">
                  <ChartBarIcon className="w-8 h-8 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2 sm:mb-3" />
                  <p className="text-gray-400 text-xs sm:text-sm italic px-2">
                    AI summary will be generated automatically during recording...
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Quick Actions</h4>
            <div className="space-y-2">
              {[
                {
                  icon: DocumentTextIcon,
                  label: "Export to PDF",
                  color: "text-red-600",
                  bgColor: "hover:bg-red-50"
                },
                {
                  icon: EnvelopeIcon,
                  label: "Email Summary",
                  color: "text-blue-600",
                  bgColor: "hover:bg-blue-50"
                },
                {
                  icon: ArchiveBoxIcon,
                  label: "Archive Session",
                  color: "text-green-600",
                  bgColor: "hover:bg-green-50"
                },
                {
                  icon: ShareIcon,
                  label: "Share Transcript",
                  color: "text-purple-600",
                  bgColor: "hover:bg-purple-50"
                },
              ].map((action, index) => (
                <button
                  key={index}
                  onClick={() => showAlert(action.label)}
                  className={`w-full flex items-center space-x-2 sm:space-x-3 px-3 py-2 sm:py-3 text-left rounded-lg transition-colors border ${action.bgColor} active:scale-95`}
                >
                  <action.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${action.color}`} />
                  <span className="text-gray-700 font-medium text-sm sm:text-base">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}