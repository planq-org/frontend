<svelte:head>
    <title>Questions - Planq</title>
</svelte:head>

<main class="page">
    <section class="panel">
        <h1>Questions</h1>
        <p>Practice questions by topic and difficulty. This page is available to all users.</p>
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
