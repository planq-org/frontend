<script lang="ts">
	import favicon from '$lib/assets/logo.svg';
	import '../styles/global.css'
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#121418" />
</svelte:head>

{@render children()}
