<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import ThemeToggle from "$lib/components/ThemeToggle.svelte";
	import {
		ArrowRight,
		Database,
		Github,
		Linkedin,
		Twitter,
	} from "lucide-svelte";
	import { defineContent } from "$lib/i18n/locale";

	const content = defineContent({
		en: {
			appName: "smart-dash",
			features: "Features",
			howItWorks: "How it Works",
			pricing: "Pricing",
			signIn: "Sign In",
			getStarted: "Get Started",
			footerDescription:
				"AI-powered dashboard builder that transforms your database into stunning visual insights.",
			product: "Product",
			integrations: "Integrations",
			api: "API",
			support: "Support",
			documentation: "Documentation",
			helpCenter: "Help Center",
			contact: "Contact",
			status: "Status",
			copyright: "2024 smart-dash. All rights reserved.",
		},
	});
</script>

<!-- Header -->
<header
	class="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b h-16"
>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<a href="/" class="flex items-center space-x-2">
				<div
					class="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-lg flex items-center justify-center"
				>
					<Database class="w-5 h-5 text-neutral-0" />
				</div>
				<span
					class="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
				>
					{$content.appName}
				</span>
			</a>

			<nav class="hidden md:flex items-center space-x-8">
				<a
					href="/#features"
					class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
				>
					{$content.features}
				</a>
				<a
					href="/#how-it-works"
					class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
				>
					{$content.howItWorks}
				</a>
				<a
					href="/pricing"
					class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
				>
					{$content.pricing}
				</a>
			</nav>

			<div class="flex items-center space-x-4">
				<ThemeToggle />
				<a
					href="/login"
					class="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
				>
					{$content.signIn}</a
				>
				<a href="/login">
					<Button size="sm">
						{$content.getStarted}
						<ArrowRight class="w-4 h-4 ml-2" />
					</Button>
				</a>
			</div>
		</div>
	</div>
</header>

<main class="pt-16">
	<slot />
</main>

<!-- Footer -->
<footer class="bg-neutral-0 text-neutral-1000 py-12">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div
			class="bg-neutral-0 to-primary-50 p-8 sm:p-12 text-neutral-1000 border-t-neutral-300 border-t-1"
		>
			<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
				<div class="md:col-span-2">
					<div class="flex items-center space-x-2 mb-4">
						<div
							class="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-600 rounded-lg flex items-center justify-center"
						>
							<Database class="w-5 h-5 text-neutral-0" />
						</div>
						<span class="text-xl font-bold text-neutral-1000"
							>{$content.appName}</span
						>
					</div>
					<p class="text-neutral-600 mb-4 max-w-md">
						{$content.footerDescription}
					</p>
					<div class="flex space-x-4">
						<a
							href="/#"
							class="text-neutral-600 hover:text-neutral-0 transition-colors"
						>
							<Twitter class="w-5 h-5" />
						</a>
						<a
							href="/#"
							class="text-neutral-600 hover:text-neutral-0 transition-colors"
						>
							<Github class="w-5 h-5" />
						</a>
						<a
							href="/#"
							class="text-neutral-600 hover:text-neutral-0 transition-colors"
						>
							<Linkedin class="w-5 h-5" />
						</a>
					</div>
				</div>

				<div>
					<h3 class="text-neutral-1000 font-semibold mb-4">
						{$content.product}
					</h3>
					<ul class="space-y-2 text-neutral-600">
						<li>
							<a href="/#" class="hover:text-neutral-1000 transition-colors"
								>{$content.features}</a
							>
						</li>
						<li>
							<a
								href="/pricing"
								class="hover:text-neutral-1000 transition-colors"
								>{$content.pricing}</a
							>
						</li>
						<li>
							<a href="/#" class="hover:text-neutral-1000 transition-colors"
								>{$content.integrations}</a
							>
						</li>
						<li>
							<a href="/#" class="hover:text-neutral-1000 transition-colors"
								>{$content.api}</a
							>
						</li>
					</ul>
				</div>

				<div>
					<h3 class="font-semibold mb-4">{$content.support}</h3>
					<ul class="space-y-2 text-neutral-600">
						<li>
							<a href="/#" class="hover:text-neutral-1000 transition-colors"
								>{$content.documentation}</a
							>
						</li>
						<li>
							<a href="/#" class="hover:text-neutral-1000 transition-colors"
								>{$content.helpCenter}</a
							>
						</li>
						<li>
							<a href="/#" class="hover:text-neutral-1000 transition-colors"
								>{$content.contact}</a
							>
						</li>
						<li>
							<a href="/#" class="hover:text-neutral-1000 transition-colors"
								>{$content.status}</a
							>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="border-t border-neutral-300 pt-8 text-center">
			<p class="text-neutral-400 text-sm">
				&copy; {$content.copyright}
			</p>
		</div>
	</div>
</footer>

<style>
	:global([data-sveltekit-scroller]) {
		padding-top: 4rem; /* 64px to account for fixed header */
	}

	a {
		cursor: pointer;
	}

	a:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
		border-radius: 0.25rem;
	}
</style>
