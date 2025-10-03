	import Loader from "$lib/components/Loader.svelte";
	import { context } from "./context.svelte";

	let { children } = $props();

	// $effect(() => {
	// 	if (context.user) {
	// 		if (context.projects) {
	// 			loading = false;
	// 		}
	// 	} else if (!localStorage.getItem("bearer")) {
	// 		goto("/login");
	// 	} else if (!localStorage.getItem("user")) {
	// 		getCurrentUser().then((user) => {
	// 			if (!user) {
	// 				console.log("User from bearer not found");
	// 				localStorage.removeItem("bearer");
	// 				goto("/login");
	// 			} else {
	// 				setContextUser(user);
	// 			}
	// 		});
	// 	} else {
	// 		context.user = JSON.parse(localStorage.getItem("user")!);
	// 	}
	// });
</script>

<Loader />

<!--
<div class="min-h-[100dvh]">
	{@render children?.()}
</div> -->
