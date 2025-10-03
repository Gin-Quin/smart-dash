<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import {
		ArrowRight,
		Database,
		Sparkles,
		BarChart3,
		Zap,
		Shield,
	} from "lucide-svelte";
	import { defineContent } from "$lib/i18n/locale";

	const content = defineContent({
		en: {
			aiPoweredBadge: "Powered by Advanced AI",
			heroTitle: "Build Smart Dashboards with",
			heroTitleHighlight: "AI-Powered Intelligence",
			heroDescription:
				"Transform your database into stunning, interactive dashboards in minutes. Our AI understands your data and creates visualizations that actually matter.",
			watchDemo: "Watch Demo",
			startFreeTrial: "Start Free Trial",
			featuresTitle: "Everything you need to create amazing dashboards",
			featuresDescription:
				"Built with cutting-edge AI technology to deliver insights that drive decisions",
			feature1Title: "Instant Connection",
			feature1Description:
				"Connect to any database in seconds. PostgreSQL, MySQL, MongoDB, and more.",
			feature2Title: "AI-Powered Insights",
			feature2Description:
				"Our AI analyzes your data and suggests the most impactful visualizations.",
			feature3Title: "Enterprise Security",
			feature3Description:
				"Bank-level encryption and compliance with SOC 2, GDPR, and more.",
			howItWorksTitle: "Build dashboards in 3 simple steps",
			howItWorksDescription:
				"No coding required. Our AI does the heavy lifting so you can focus on insights.",
			step1Title: "Connect Your Database",
			step1Description:
				"Simply provide your database credentials. We support all major database systems.",
			step2Title: "Query Data in Plain English",
			step2Description:
				"Simply ask what you want to see in natural language. No SQL or complex queries required.",
			step3Title: "Create Beautiful Dashboards",
			step3Description:
				"Customize and share your interactive dashboards with your team in seconds.",
			ctaTitle: "Ready to transform your data?",
			ctaDescription:
				"Join thousands of companies using smart-dash to make data-driven decisions faster.",
			scheduleDemo: "Schedule Demo",
		},
	});
</script>

<!-- Hero Section -->
<section class="relative pt-8 pb-12 lg:pt-16 lg:pb-20 overflow-hidden">
	<div class="hero-gradient absolute inset-0"></div>

	<div class="relative container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="max-w-4xl mx-auto text-center">
			<div
				class="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-primary-100 text-primary-800 mb-8"
			>
				<Sparkles class="w-4 h-4 mr-2" />
				{$content.aiPoweredBadge}
			</div>

			<h1
				class="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6"
			>
				{$content.heroTitle}
				<span
					class="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
				>
					{$content.heroTitleHighlight}
				</span>
			</h1>

			<p class="text-lg sm:text-xl text-neutral-700 mb-8 max-w-2xl mx-auto">
				{$content.heroDescription}
			</p>

			<div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
				<Button variant="outline" size="lg" class="text-lg px-8">
					{$content.watchDemo}
				</Button>
				<Button size="lg" class="text-lg px-8">
					{$content.startFreeTrial}
					<ArrowRight class="w-5 h-5 ml-2" />
				</Button>
			</div>

			<div class="relative mx-auto max-w-5xl">
				<div class="bg-neutral-0 rounded-2xl shadow-2xl p-2 lg:p-4">
					<div
						class="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl h-64 lg:h-80 flex items-center justify-center"
					>
						<BarChart3 class="w-32 h-32 text-primary-500 opacity-50" />
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Features Section -->
<section id="features" class="py-20 lg:py-32 bg-neutral-0">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
				{$content.featuresTitle}
			</h2>
			<p class="text-lg text-neutral-600 max-w-2xl mx-auto">
				{$content.featuresDescription}
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<!-- Feature 1 -->
			<div
				class="bg-neutral-0 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border"
			>
				<div
					class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4"
				>
					<Zap class="w-6 h-6 text-primary-600" />
				</div>
				<h3 class="text-xl font-semibold text-neutral-900 mb-2">
					{$content.feature1Title}
				</h3>
				<p class="text-neutral-600">
					{$content.feature1Description}
				</p>
			</div>

			<!-- Feature 2 -->
			<div
				class="bg-neutral-0 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border"
			>
				<div
					class="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4"
				>
					<Sparkles class="w-6 h-6 text-secondary-600" />
				</div>
				<h3 class="text-xl font-semibold text-neutral-900 mb-2">
					{$content.feature2Title}
				</h3>
				<p class="text-neutral-600">
					{$content.feature2Description}
				</p>
			</div>

			<!-- Feature 3 -->
			<div
				class="bg-neutral-0 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border"
			>
				<div
					class="w-12 h-12 bg-quinary-100 rounded-lg flex items-center justify-center mb-4"
				>
					<Shield class="w-6 h-6 text-quinary-600" />
				</div>
				<h3 class="text-xl font-semibold text-neutral-900 mb-2">
					{$content.feature3Title}
				</h3>
				<p class="text-neutral-600">
					{$content.feature3Description}
				</p>
			</div>
		</div>
	</div>
</section>

<!-- How It Works Section -->
<section id="how-it-works" class="relative py-20 lg:py-32">
	<div
		class="absolute inset-0 bg-gradient-to-bl from-primary-100 via-neutral-0 to-tertiary-100 opacity-40 dark:opacity-60"
	></div>
	<div class="relative container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
				{$content.howItWorksTitle}
			</h2>
			<p class="text-lg text-neutral-600 max-w-2xl mx-auto">
				{$content.howItWorksDescription}
			</p>
		</div>

		<div class="max-w-3xl mx-auto">
			<div class="relative">
				<!-- Vertical line connecting steps -->
				<div
					class="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 via-secondary-300 to-tertiary-300"
				></div>

				<div class="space-y-14">
					<!-- Step 1 -->
					<div class="relative flex gap-6">
						<div
							class="relative z-10 w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-500 dark:to-primary-300 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0"
						>
							1
						</div>
						<div class="flex-1 pt-1 flex flex-col gap-1">
							<h3 class="text-2xl font-semibold text-neutral-900 mb-2">
								{$content.step1Title}
							</h3>
							<p class="text-neutral-600 mb-4">
								{$content.step1Description}
							</p>
							<div
								class="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-8 flex items-center justify-center border border-primary-200"
							>
								<Database class="w-16 h-16 text-primary-600" />
							</div>
						</div>
					</div>

					<!-- Step 2 -->
					<div class="relative flex gap-6">
						<div
							class="relative z-10 w-12 h-12 bg-gradient-to-br from-secondary-400 to-secondary-500 dark:to-secondary-300 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0"
						>
							2
						</div>
						<div class="flex-1 pt-1 flex flex-col gap-1">
							<h3 class="text-2xl font-semibold text-neutral-900 mb-2">
								{$content.step2Title}
							</h3>
							<p class="text-neutral-600 mb-4">
								{$content.step2Description}
							</p>
							<div
								class="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-8 flex items-center justify-center border border-secondary-200"
							>
								<Sparkles class="w-16 h-16 text-secondary-600" />
							</div>
						</div>
					</div>

					<!-- Step 3 -->
					<div class="relative flex gap-6">
						<div
							class="relative z-10 w-12 h-12 bg-gradient-to-br from-tertiary-400 to-tertiary-500 dark:to-tertiary-300 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0"
						>
							3
						</div>
						<div class="flex-1 pt-1 flex flex-col gap-1">
							<h3 class="text-2xl font-semibold text-neutral-900 mb-2">
								{$content.step3Title}
							</h3>
							<p class="text-neutral-600 mb-4">
								{$content.step3Description}
							</p>
							<div
								class="bg-gradient-to-br from-tertiary-50 to-tertiary-100 rounded-xl p-8 flex items-center justify-center border border-tertiary-200"
							>
								<BarChart3 class="w-16 h-16 text-tertiary-600" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="py-20 lg:py-32 bg-neutral-0">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<h2 class="text-3xl sm:text-4xl font-bold text-neutral-1000 mb-6">
			{$content.ctaTitle}
		</h2>
		<p class="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
			{$content.ctaDescription}
		</p>
		<div class="flex flex-col sm:flex-row gap-4 justify-center">
			<Button size="lg" class="text-lg px-8" variant="outline">
				{$content.scheduleDemo}
			</Button>
			<Button size="lg" class="text-lg px-8">
				{$content.startFreeTrial}
				<ArrowRight class="w-5 h-5 ml-2" />
			</Button>
		</div>
	</div>
</section>

<style>
	.hero-gradient {
		background: linear-gradient(
			to bottom right,
			oklch(from var(--primary-200) l c h) 0%,
			oklch(from var(--neutral-0) l c h) 40%,
			oklch(from var(--neutral-0) l c h) 60%,
			oklch(from var(--secondary-200) l c h) 100%
		);
		opacity: 0.4;
	}

	:global(:root.dark) .hero-gradient {
		background: linear-gradient(
			to bottom right,
			oklch(from var(--primary-200) l c h) 0%,
			oklch(from var(--neutral-0) l c h) 50%,
			oklch(from var(--secondary-200) l c h) 100%
		);
		opacity: 0.6;
	}
</style>
