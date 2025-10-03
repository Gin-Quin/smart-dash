<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import { defineContent } from "$lib/i18n/locale";
	import { House, Bug } from "lucide-svelte";

	const content = defineContent({
		en: {
			title: "Authentication Error",
			message: "Something went wrong during authentication. Please try again.",
			backButton: "Back to Home",
		},
	});
</script>

<div
	class="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5"
>
	<div class="mx-4 max-w-md text-center">
		<div class="mb-6 flex justify-center">
			<Bug class="h-16 w-16 text-primary-700" strokeWidth={1.5} />
		</div>
		<h1 class="mb-4 text-2xl font-bold text-foreground">
			{$content.title}
		</h1>
		<p class="mb-6 text-muted-foreground">
			{$content.message}
		</p>
		<Button href="/" class="px-6 py-3">
			<House class="h-4 w-4" />
			{$content.backButton}
		</Button>
	</div>
</div>
