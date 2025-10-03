<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle,
	} from "$lib/components/ui/card";
	import { Check } from "lucide-svelte";
	import { defineContent } from "$lib/i18n/locale";

	const content = defineContent({
		en: {
			pageTitle: "Pricing - Smart Dash",
			pageDescription:
				"Choose the perfect plan for your data visualization needs",
			heading: "Choose Your Plan",
			subheading: "Select the perfect plan for your data visualization needs",
			freePlanName: "Free",
			freePlanPrice: "€0",
			freePlanDescription: "Perfect for individuals getting started",
			freePlanFeature1: "1 dashboard maximum",
			freePlanFeature2: "Query database using natural language",
			freePlanFeature3: "Visualize data with charts and graphs",
			freePlanFeature4: "Basic support",
			premiumPlanName: "Premium",
			premiumPlanPrice: "€12",
			premiumPlanDescription: "For professionals and teams",
			premiumPlanFeature1: "Unlimited dashboards",
			premiumPlanFeature2: "Query database using natural language",
			premiumPlanFeature3: "Visualize data with charts and graphs",
			premiumPlanFeature4: "Priority support",
			premiumPlanFeature5: "Advanced chart types",
			premiumPlanFeature6: "Export capabilities",
			mostPopular: "Most Popular",
			perMonth: "/month",
			getStarted: "Get Started",
			footerNote:
				"All plans include core features like natural language queries and data visualization",
			backToHome: "Back to Home",
			contactSupport: "Contact Support",
		},
	});

	interface Plan {
		name: string;
		price: string;
		description: string;
		features: string[];
		popular?: boolean;
	}

	const plans: Plan[] = [
		{
			name: $content.freePlanName,
			price: $content.freePlanPrice,
			description: $content.freePlanDescription,
			features: [
				$content.freePlanFeature1,
				$content.freePlanFeature2,
				$content.freePlanFeature3,
				$content.freePlanFeature4,
			],
		},
		{
			name: $content.premiumPlanName,
			price: $content.premiumPlanPrice,
			description: $content.premiumPlanDescription,
			features: [
				$content.premiumPlanFeature1,
				$content.premiumPlanFeature2,
				$content.premiumPlanFeature3,
				$content.premiumPlanFeature4,
				$content.premiumPlanFeature5,
				$content.premiumPlanFeature6,
			],
			popular: true,
		},
	];
</script>

<svelte:head>
	<title>{$content.pageTitle}</title>
	<meta name="description" content={$content.pageDescription} />
</svelte:head>

<div class="container mx-auto px-4 py-16 max-w-7xl">
	<div class="text-center mb-12">
		<h1 class="text-4xl font-bold mb-4">{$content.heading}</h1>
		<p class="text-xl text-muted-foreground">
			{$content.subheading}
		</p>
	</div>

	<div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
		{#each plans as plan}
			<Card
				class={`relative flex flex-col ${plan.popular ? "border-primary shadow-lg" : ""}`}
				style="height: 34rem;"
			>
				{#if plan.popular}
					<div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
						<span
							class="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium"
						>
							{$content.mostPopular}
						</span>
					</div>
				{/if}

				<CardHeader class="text-center">
					<CardTitle class="text-2xl mb-2">{plan.name}</CardTitle>
					<div class="mb-4">
						<span class="text-4xl font-bold">{plan.price}</span>
						<span class="text-muted-foreground">{$content.perMonth}</span>
					</div>
					<CardDescription>{plan.description}</CardDescription>
				</CardHeader>

				<CardContent class="py-8 flex-grow flex flex-col">
					<ul class="space-y-3 mb-8 flex-grow">
						{#each plan.features as feature}
							<li class="flex items-start">
								<Check class="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
								<span class="text-muted-foreground">{feature}</span>
							</li>
						{/each}
					</ul>

					<Button
						class="w-full mt-auto"
						variant={plan.popular ? "default" : "outline"}
						size="lg"
					>
						{$content.getStarted}
					</Button>
				</CardContent>
			</Card>
		{/each}
	</div>

	<div class="text-center mt-16">
		<p class="text-muted-foreground mb-4">
			{$content.footerNote}
		</p>
		<div class="flex justify-center space-x-4">
			<Button variant="outline" href="/">{$content.backToHome}</Button>
			<Button variant="ghost" href="mailto:support@smart-dash.com">
				{$content.contactSupport}
			</Button>
		</div>
	</div>
</div>
