<script lang="ts">
	import { Moon, Sun } from 'lucide-svelte';
	import { theme } from '$lib/stores/theme.svelte';
	import { Button } from '$lib/components/ui/button';

	let { class: className = '' }: { class?: string } = $props();
</script>

<Button
	variant="ghost"
	size="icon"
	class={className}
	onclick={() => theme.toggle()}
	aria-label={theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
>
	{#if theme.isDark}
		<Sun class="h-5 w-5" />
	{:else}
		<Moon class="h-5 w-5" />
	{/if}
</Button>
