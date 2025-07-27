import { features } from "@/data/features";

interface FeaturesProps {
	isActive: boolean;
}

export default function Features({ isActive }: FeaturesProps) {
	if (!isActive) return null;

	return (
		<div className="max-w-7xl mx-auto space-y-12">
			{/* Header Section */}
			<div className="text-center space-y-4">
				<h2 className="text-2xl md:text-3xl font-bold text-gray-900">Core Features</h2>
				<p className="text-lg text-gray-600 max-w-3xl mx-auto">
					Discover the powerful capabilities that make Judiscribe the most
					advanced court transcription solution for the Nigerian judiciary
					system
				</p>
			</div>

			{/* Features Grid */}
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{features.map((feature, index) => (
					<div
						key={index}
						className="bg-white rounded-lg p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
					>
						{/* Icon */}
						<div
							className={`inline-flex items-center justify-center w-12 h-12 rounded-xl shadow-lg transition-all duration-500 mb-4  ${"bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600"}`}
						>
							<span>{feature.icon}</span>
						</div>

						{/* Title */}
						<h3 className="text-xl font-semibold text-gray-900 mb-3">
							{feature.title}
						</h3>

						{/* Description */}
						<p className="text-gray-600 leading-relaxed">
							{feature.description}
						</p>
					</div>
				))}
			</div>

			{/* Benefits Section */}
			<div className="bg-white rounded-lg border border-gray-200 p-8">
				<div className="grid md:grid-cols-3 gap-8">
					<div className="text-center">
						<div className="text-3xl font-bold text-blue-600 mb-2">99%</div>
						<div className="text-gray-600">Transcription Accuracy</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-green-600 mb-2">75%</div>
						<div className="text-gray-600">Time Reduction</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
						<div className="text-gray-600">System Availability</div>
					</div>
				</div>
			</div>
		</div>
	);
}
