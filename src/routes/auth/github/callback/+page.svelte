<script lang="ts">
	import { onMount } from "svelte";
	import type { PageProps } from "./$types";
	import { goto } from "$app/navigation";

	let { data }: PageProps = $props();

	onMount(() => {
		if (!data.session) {
			goto("/auth/error");
		} else {
			localStorage.setItem("bearer", data.session);
			goto("/app");
		}
	});
</script>
