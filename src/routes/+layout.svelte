<script lang="ts">
	import favicon from '$lib/assets/logo.svg';
	import type { LayoutData } from './$types';
	import Navbar from '$lib/components/Navbar.svelte';
	import '../styles/global.css'
	let { children, data }: { children: import('svelte').Snippet; data: LayoutData } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#121418" />
</svelte:head>

<Navbar user={data.user} />

{@render children()}
