<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";
	import {
		Card,
		CardContent,
		CardHeader,
		CardTitle,
	} from "$lib/components/ui/card";
	import { Separator } from "$lib/components/ui/separator";
	import { defineContent } from "$lib/i18n/locale";
	import { Mail, ArrowRight } from "lucide-svelte";
	import { Google, GitHub } from "$lib/components/icons";
	import { page } from "$app/state";
	import { goto } from "$app/navigation";
	import PinInput from "$lib/components/PinInput.svelte";
	import type { sendAuthenticationEmail } from "$lib/server/login/index.remote";

	const content = defineContent({
		en: {
			pageTitle: "Sign In - Smart Dash",
			pageDescription: "Sign in to access your smart dashboards",
			heading: "Get Started",
			identify: "Identify yourself",
			subheading:
				"Sign in or create an account to access your smart dashboards",
			emailLabel: "Email",
			emailPlaceholder: "name@example.com",
			continueButton: "Continue with Email",
			orContinueWith: "Or continue with",
			googleButton: "Google",
			githubButton: "GitHub",
			noAccount: "Don't have an account?",
			signUp: "Sign up",
			validateCode: "Validate Code",
			checkEmailToGetCode: "Enter the code you received from your email",
		},
	});

	let email = $state("");
	let code = $state("");
	let loading = $state(false);
	let invalidToken = $state(false);
	let authenticationResponse =
		$state<Awaited<ReturnType<typeof sendAuthenticationEmail>>>();

	const stage = $derived(page.url.searchParams.get("stage"));

	$inspect({ stage });

	async function handleEmailSubmit(e: Event) {
		e.preventDefault();
		loading = true;

		if (stage != "code") {
			console.log("Email login:", { email });
			page.url.searchParams.set("stage", "code");
			authenticationResponse = await sendAuthenticationEmail({ email });
			await goto(page.url);
		} else {
			console.log("Code:", { code });
			// const response = await verifyCode({ email, code });
			// console.log("verifyCode response:", response);
			// if (response) {
			// 	localStorage.setItem("bearer", response);
			// 	goto("/");
			// } else {
			// 	invalidToken = true;
			// 	loading = false;
			// }
		}

		loading = false;
	}

	function handleGoogleLogin() {
		// TODO: Implement Google SSO
		console.log("Google SSO login");
	}

	function handleGithubLogin() {
		// TODO: Implement GitHub SSO
		console.log("GitHub SSO login");
	}
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

	<div class="max-w-md mx-auto">
		<Card>
			<CardHeader class="space-y-1">
				<CardTitle class="text-2xl font-bold text-center">
					{$content.identify}
				</CardTitle>
			</CardHeader>
			<CardContent class="space-y-4">
				<form onsubmit={handleEmailSubmit} class="space-y-4">
					{#if stage != "code"}
						<div class="space-y-2">
							<Label for="email">{$content.emailLabel}</Label>
							<Input
								id="email"
								type="email"
								placeholder={$content.emailPlaceholder}
								bind:value={email}
								required
							/>
						</div>
						<Button type="submit" variant="outline" class="w-full">
							<Mail class="mr-2 h-4 w-4" />
							{$content.continueButton}
						</Button>
					{:else}
						<div class="flex flex-col justify-center items-center gap-2">
							<div class="text-center text-sm text-neutral-600">
								{$content.checkEmailToGetCode}
							</div>
							<div class="pt-3 pb-2">
								<PinInput bind:value={code} />
							</div>
						</div>
						<Button type="submit" class="w-full">
							{$content.validateCode}
							<ArrowRight />
						</Button>
					{/if}
				</form>

				<div class="relative">
					<div class="absolute inset-0 flex items-center">
						<Separator class="w-full" />
					</div>
					<div class="relative flex justify-center text-xs uppercase">
						<span
							class="bg-white dark:bg-neutral-950 px-2 text-neutral-500 dark:text-neutral-400"
						>
							{$content.orContinueWith}
						</span>
					</div>
				</div>

				<div class="flex gap-2">
					<Button
						type="button"
						variant="outline"
						class="grow"
						onclick={handleGithubLogin}
					>
						<GitHub class="mr-2 h-4 w-4" />
						{$content.githubButton}
					</Button>

					<Button
						type="button"
						variant="outline"
						class="grow"
						onclick={handleGoogleLogin}
					>
						<Google class="mr-2 h-4 w-4" />
						{$content.googleButton}
					</Button>
				</div>

				<p
					class="mt-4 text-center text-xs text-neutral-500 dark:text-neutral-400"
				>
					By continuing, you agree to our Terms of Service and Privacy Policy
				</p>
			</CardContent>
		</Card>
	</div>
</div>
