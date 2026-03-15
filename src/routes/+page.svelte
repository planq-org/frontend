<svelte:head>
    <title>Planq - Entrance Exam Prep For Students</title>
    <meta name="description" content="Free entrance exam preparation platform built by students, for students." />
    <meta name="keywords" content="exam prep, entrance exam, studying, students" />
    <meta property="og:title" content="Planq - Entrance Exam Prep" />
    <meta property="og:description" content="Free entrance exam preparation platform built by students, for students." />
    <meta property="og:type" content="website" />
</svelte:head>

<script lang="ts">
    import Button from "$lib/components/Button.svelte";
</script>

<style>
    .container {
        min-height: 100vh;
        display: grid;
        place-items: center;
    }
    
    .hero {
        text-align: center;
    }

    .hero > h1 {
        font-weight: 700;
        font-size: 4rem;
    }

    .hero > h3 {
        font-weight: 500;
    }

    .btn-grp {
        margin: 1rem;
        display: grid;
        grid-auto-flow: column;
        gap: 1rem;
    }
</style>

<div class="container">
    <div class="hero">
        <h1 class="gradient-text">Planq</h1>
        <h3 class="muted">Entrance Exam Prep. For Students, By Students</h3>
        <div class="btn-grp">
            <Button size='sm'>Conitnue with Google</Button>
            <Button variant='secondary' size='sm'>Conitnue with Discord</Button>
        </div>
    </div>
</div>