<script lang="ts">
	import "../app.css";
	import { Toaster } from "svelte-sonner";
	import { onMount } from "svelte";

	let { children } = $props();

	onMount(() => {
		const originalFetch = window.fetch;

		globalThis.fetch = ((...args) => {
			const bearer = localStorage.getItem("bearer");

			if (bearer) {
				// If there's a bearer token, add the Authorization header
				const [url, init = {}] = args;
				const headers = new Headers(init.headers);
				headers.set("Authorization", `Bearer ${bearer}`);

				args[1] = {
					...init,
					headers,
				};
			}

			return originalFetch.apply(globalThis, args);
		}) as typeof globalThis.fetch;
	});

	// Initialize theme on mount
	$effect(() => {
		// Theme store automatically initializes and applies theme
		theme.current;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
<Toaster />

{@render children?.()}
