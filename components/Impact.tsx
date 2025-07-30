import { impactFeatures, impactStats } from "@/data/features";

interface ImpactProps {
	isActive: boolean;
}

export default function Impact({ isActive }: ImpactProps) {
	if (!isActive) return null;

	return (
		<div className="max-w-7xl mx-auto space-y-12">
			{/* Header Section */}
			<div className="text-center space-y-4">
				<h2 className="text-2xl md:text-3xl font-bold text-gray-900">
					Projected Impact & ROI
				</h2>
				<p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
					Measurable improvements across efficiency, cost reduction, and service
					quality for the Nigerian judicial system
				</p>
			</div>

			{/* Key Statistics */}
			<div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
				<h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
					Expected Performance Metrics
				</h3>
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
					{impactStats.map((stat, index) => (
						<div
							key={index}
							className="text-center p-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors duration-200"
						>
							<div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">
								{stat.number}
							</div>
							<div className="text-sm md:text-base text-gray-600 font-medium">
								{stat.label}
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Impact Areas */}
			<div className="space-y-6">
				<h3 className="text-2xl font-semibold text-gray-900 text-center">
					Key Impact Areas
				</h3>

				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
					{impactFeatures.map((feature, index) => (
						<div
							key={index}
							className="bg-white rounded-lg p-6 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 group"
						>
							{/* Icon */}
							<div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
								<div className="text-2xl text-blue-600">{feature.icon}</div>
							</div>

							{/* Title */}
							<h4 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-800 transition-colors">
								{feature.title}
							</h4>

							{/* Description */}
							<p className="text-gray-600 leading-relaxed text-sm md:text-base">
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* ROI Summary */}
			<div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 md:p-8 border border-blue-100">
				<div className="grid md:grid-cols-2 gap-8 items-center">
					<div>
						<h3 className="text-2xl font-bold text-gray-900 mb-4">
							Return on Investment
						</h3>
						<p className="text-gray-700 leading-relaxed mb-4">
							Implementation of Judiscribe is projected to deliver significant
							cost savings through reduced administrative overhead, faster case
							processing, and improved accuracy in judicial documentation.
						</p>
						<ul className="space-y-2 text-gray-600">
							<li className="flex items-center">
								<div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
								Access to 1400+ courts across Nigeria
							</li>
							<li className="flex items-center">
								<div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
								Reduced transcription costs by up to 80%
							</li>
							<li className="flex items-center">
								<div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
								Faster case resolution and reduced backlog
							</li>
							<li className="flex items-center">
								<div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
								Enhanced accessibility and transparency
							</li>
							<li className="flex items-center">
								<div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
								Targeting $50M total addressable market
							</li>
						</ul>
					</div>

					<div className="bg-white rounded-lg p-6 border border-gray-200">
						<h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
							Projected Annual Savings
						</h4>
						<div className="text-center">
							<div className="text-4xl font-bold text-green-600 mb-2">$10M</div>
							<div className="text-gray-600 text-sm">
								Projected Annual Revenue
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4 mt-6">
							<div className="text-center">
								<div className="text-xl font-semibold text-blue-600">75%</div>
								<div className="text-xs text-gray-500">Time Reduction</div>
							</div>
							<div className="text-center">
								<div className="text-xl font-semibold text-purple-600">20%</div>
								<div className="text-xs text-gray-500">Market Share</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Implementation Timeline */}
			<div className="bg-white rounded-lg border border-gray-200 p-6 md:p-8">
				<h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
					Implementation Roadmap
				</h3>

				<div className="grid sm:grid-cols-3 gap-6">
					<div className="text-center">
						<div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mx-auto mb-4 font-bold">
							1
						</div>
						<h4 className="font-semibold text-gray-900 mb-2">Phase 1</h4>
						<p className="text-sm text-gray-600">
							Pilot implementation in select Federal High Courts
						</p>
						<div className="text-xs text-blue-600 mt-2 font-medium">
							3-6 months
						</div>
					</div>

					<div className="text-center">
						<div className="w-12 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center mx-auto mb-4 font-bold">
							2
						</div>
						<h4 className="font-semibold text-gray-900 mb-2">Phase 2</h4>
						<p className="text-sm text-gray-600">
							Rollout to all Federal Courts and training programs
						</p>
						<div className="text-xs text-green-600 mt-2 font-medium">
							6-12 months
						</div>
					</div>

					<div className="text-center">
						<div className="w-12 h-12 bg-purple-600 text-white rounded-lg flex items-center justify-center mx-auto mb-4 font-bold">
							3
						</div>
						<h4 className="font-semibold text-gray-900 mb-2">Phase 3</h4>
						<p className="text-sm text-gray-600">
							Expansion to State Courts and advanced features
						</p>
						<div className="text-xs text-purple-600 mt-2 font-medium">
							12-18 months
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
