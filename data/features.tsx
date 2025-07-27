import {  
	MicrophoneIcon,
	BoltIcon,
	CurrencyDollarIcon,
	ChartBarIcon,
	ShieldCheckIcon,
	DevicePhoneMobileIcon,
	CpuChipIcon,
	UserGroupIcon,
	ChartPieIcon
  } from '@heroicons/react/24/outline';
import { TargetIcon } from 'lucide-react';

export const features = [
    {
      icon: <MicrophoneIcon className="w-8 h-8" />,
      title: "Real-time STT",
      description: "Convert live speech to text in court, supporting multiple speakers with 95%+ accuracy for Nigerian English dialects."
    },
    {
      icon: <CpuChipIcon className="w-8 h-8" />,
      title: "AI Summarization",
      description: "Generate legal case summaries automatically using advanced AI trained on Nigerian legal terminology and procedures."
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: "Blockchain Audit",
      description: "Tamper-proof audit trail for all transcripts ensuring integrity and authenticity of court records."
    },
    {
      icon: <ChartPieIcon className="w-8 h-8" />,
      title: "Session Dashboard",
      description: "Manage and search recording sessions with powerful analytics and case management tools."
    },
    {
      icon: <DevicePhoneMobileIcon className="w-8 h-8" />,
      title: "Mobile Access",
      description: "Responsive web app optimized for tablets and phones, perfect for mobile court sessions."
    },
    {
      icon: <UserGroupIcon className="w-8 h-8" />,
      title: "Role-based Access",
      description: "Secure permissions for Judges, Clerks, Recorders, and Administrators with full access control."
    }
  ];

  export const impactStats = [
    { number: "80%", label: "Time Reduction in Documentation" },
    { number: "95%", label: "Accuracy Improvement" },
    { number: "3X", label: "Faster Case Processing" },
    { number: "₦2.5M", label: "Annual Savings per Court" }
  ];

  export const impactFeatures = [
    {
      icon: <BoltIcon className="w-8 h-8" />,
      title: "Operational Efficiency",
      description: "Judges can focus on legal decisions rather than documentation. Court sessions run smoother with real-time documentation."
    },
    {
      icon: <CurrencyDollarIcon className="w-8 h-8" />,
      title: "Cost Reduction",
      description: "Reduce administrative overhead, minimize transcription errors, and eliminate post-session documentation delays."
    },
    {
      icon: <ChartBarIcon className="w-8 h-8" />,
      title: "Quality Improvement",
      description: "Complete, accurate records with AI-powered summaries improve case outcomes and legal research capabilities."
    },
    {
      icon: <TargetIcon className="w-8 h-8" />,
      title: "Market Opportunity",
      description: "774 LGAs × 3 courts avg = 2,322 courts nationwide. Potential market size of ₦5.8B annually."
    }
  ];