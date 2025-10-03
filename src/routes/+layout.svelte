<script lang="ts">
	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import { theme } from "$lib/stores/theme.svelte";

	let { children } = $props();

	// Initialize theme on mount
	$effect(() => {
		// Theme store automatically initializes and applies theme
		theme.current;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
