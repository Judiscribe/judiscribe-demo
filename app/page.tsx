"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import LiveDemo from "@/components/Demo";
import Features from "@/components/Features";
import Workflow from "@/components/Workflow";
import Impact from "@/components/Impact";

export default function Home() {
	const [activeSection, setActiveSection] = useState("live-demo");
	const [mounted, setMounted] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const navigationItems = [
		{ id: "live-demo", label: "Live Demo" },
		{ id: "features", label: "Features" },
		{ id: "workflow", label: "Workflow" },
		{ id: "impact", label: "Impact" },
	];

	useEffect(() => {
		setMounted(true);
	}, []);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	if (!mounted) {
		return null;
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
			{/* Header */}
			<div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
					<div className="text-center">
						{/* Enhanced Logo */}
						<div className="relative mx-auto mb-8 w-16 h-16">
							<div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg transform rotate-3"></div>
							<div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl">
								<span className="text-3xl md:text-4xl">⚖️</span>
								<div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
							</div>
						</div>

						<h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text text-transparent mb-6">
							Judiscribe
						</h1>
						<p className="text-xl sm:text-2xl text-gray-700 mb-4 font-medium">
							AI-Powered Court Transcription System
						</p>
						<p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
							Modernizing the Nigerian Judiciary with accurate, real-time
							transcription and intelligent case documentation
						</p>

						<div className="flex flex-wrap justify-center gap-3 mt-10">
							<span className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow">
								⚡ Real-time Accuracy
							</span>
							<span className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow">
								🤖 AI Summarization
							</span>
							<span className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-shadow">
								🔒 Secure & Compliant
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Responsive Navigation */}
			<div className="bg-white shadow-sm sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6">
					{/* Desktop Navigation */}
					<nav className="hidden md:flex space-x-8 py-4">
						{navigationItems.map((item) => (
							<button
								key={item.id}
								onClick={() => setActiveSection(item.id)}
								className={`py-2 px-4 font-medium transition-colors border-b-2 ${
									activeSection === item.id
										? "text-blue-600 border-blue-600"
										: "text-gray-600 border-transparent hover:text-gray-900"
								}`}
							>
								{item.label}
							</button>
						))}
					</nav>

					{/* Mobile Navigation */}
					<div className="md:hidden">
						{/* Mobile Header */}
						<div className="flex items-center justify-between py-4">
							<div className="font-medium text-gray-900">
								{navigationItems.find((item) => item.id === activeSection)
									?.label || "Navigation"}
							</div>
							<button
								onClick={toggleMobileMenu}
								className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
								aria-label="Toggle menu"
							>
								{isMobileMenuOpen ? (
									<X className="h-6 w-6" />
								) : (
									<Menu className="h-6 w-6" />
								)}
							</button>
						</div>

						{/* Mobile Menu Dropdown */}
						{isMobileMenuOpen && (
							<div className="border-t border-gray-200 py-2">
								<div className="space-y-1">
									{navigationItems.map((item) => (
										<button
											key={item.id}
											onClick={() => {
												setActiveSection(item.id);
												setIsMobileMenuOpen(false);
											}}
											className={`block w-full text-left px-4 py-3 font-medium transition-colors ${
												activeSection === item.id
													? "text-blue-600 bg-blue-50"
													: "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
											}`}
										>
											{item.label}
										</button>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
				<LiveDemo isActive={activeSection === "live-demo"} />
				<Features isActive={activeSection === "features"} />
				<Workflow isActive={activeSection === "workflow"} />
				<Impact isActive={activeSection === "impact"} />
			</div>
		</div>
	);
}
