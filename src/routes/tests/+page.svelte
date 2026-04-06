<svelte:head>
    <title>Tests - Planq</title>
</svelte:head>

<main class="page">
    <section class="panel">
        <h1>Tests</h1>
        <p>Your test library will appear here. Generate, review, and reattempt tests from this section.</p>
    </section>
</main>

<style>
    .page {
        width: min(1080px, 100% - 1.5rem);
        margin: 0.9rem auto 1.3rem;
    }

    .panel {
        border: 1px solid color-mix(in srgb, var(--border-color) 72%, white 28%);
        border-radius: 1rem;
        background: rgba(25, 29, 34, 0.95);
        padding: 1rem;
    }

    h1 {
        margin-bottom: 0.45rem;
    }

    p {
        color: var(--text-secondary);
    }
</style>
