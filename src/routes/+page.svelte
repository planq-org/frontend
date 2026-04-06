<svelte:head>
    <title>Planq - Entrance Exam Prep For Students</title>
    <meta name="description" content="Daily exam prep platform with tests, questions, and progress tracking." />
    <meta name="keywords" content="exam prep, entrance exam, daily practice, tests, questions" />
    <meta property="og:title" content="Planq - Daily Exam Prep" />
    <meta property="og:description" content="Build exam confidence every day with focused tests and question practice." />
    <meta property="og:type" content="website" />
</svelte:head>

<script lang="ts">
    import Button from "$lib/components/Button.svelte";

    const backendUrl = import.meta.env.VITE_BACKEND;

    function handleGoogleLogin() {
        window.location.href = `${backendUrl}/auth/login/google`;
    }

    function handleDiscordLogin() {
        window.location.href = `${backendUrl}/auth/login/discord`;
    }
</script>

<style>
    .landing {
        min-height: calc(100vh - 5.5rem);
        width: min(1080px, 100% - 1.5rem);
        margin: 0.75rem auto 1.5rem;
        display: grid;
        gap: 1rem;
    }

    .panel {
        border: 1px solid color-mix(in srgb, var(--border-color) 70%, white 30%);
        border-radius: 1rem;
        background: linear-gradient(180deg, rgba(29, 34, 40, 0.95), rgba(22, 26, 31, 0.95));
        box-shadow: var(--shadow-lg);
    }

    .hero {
        padding: clamp(1.25rem, 3.8vw, 2.3rem);
        display: grid;
        gap: 1rem;
    }

    .eyebrow {
        font-size: 0.76rem;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #b5c1f8;
    }

    .hero h1 {
        font-size: clamp(1.8rem, 4.8vw, 3.2rem);
        line-height: 1.08;
        max-width: 20ch;
        letter-spacing: -0.03em;
    }

    .hero p {
        color: var(--text-secondary);
        max-width: 64ch;
        font-size: 1.02rem;
        line-height: 1.6;
    }

    .btn-grp {
        display: flex;
        gap: 0.65rem;
        flex-wrap: wrap;
    }

    .features {
        padding: 1.1rem;
    }

    .features h2 {
        margin-bottom: 0.85rem;
        font-size: 1.15rem;
    }

    .feature-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 0.7rem;
    }

    .feature {
        border: 1px solid rgba(107, 138, 253, 0.22);
        border-radius: 0.85rem;
        padding: 0.9rem;
        background: rgba(107, 138, 253, 0.06);
    }

    .feature .icon {
        width: 1.9rem;
        height: 1.9rem;
        display: grid;
        place-items: center;
        border-radius: 0.52rem;
        background: rgba(120, 220, 188, 0.2);
        color: #9cf0d7;
        font-size: 1rem;
        margin-bottom: 0.55rem;
    }

    .feature h3 {
        font-size: 0.98rem;
        margin-bottom: 0.35rem;
    }

    .feature p {
        font-size: 0.88rem;
        color: var(--text-secondary);
        line-height: 1.52;
    }

    .footer {
        padding: 1rem 1.1rem;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.8rem;
        color: var(--text-secondary);
        font-size: 0.88rem;
    }

    .footer-links {
        display: inline-flex;
        gap: 0.85rem;
        flex-wrap: wrap;
    }

    .footer a {
        text-decoration: none;
        color: #c4cdf2;
    }

    .footer a:hover {
        color: white;
    }

    @media (max-width: 860px) {
        .feature-grid {
            grid-template-columns: 1fr;
        }
    }
</style>

<main class="landing">
    <section class="panel hero" id="get-started">
        <span class="eyebrow">Built for daily prep</span>
        <h1>Practice smarter every day and walk into your exam calm.</h1>
        <p>
            Planq helps students turn overwhelming exam prep into a clear routine with timed tests,
            topic-wise questions, and progress snapshots that keep you consistent.
        </p>
        <div class="btn-grp">
            <Button size="sm" onclick={handleGoogleLogin}>Continue with Google</Button>
            <Button variant="secondary" size="sm" onclick={handleDiscordLogin}>Continue with Discord</Button>
        </div>
    </section>

    <section class="panel features">
        <h2>What You Get</h2>
        <div class="feature-grid">
            <article class="feature">
                <div class="icon" aria-hidden="true">T</div>
                <h3>Timed Test Practice</h3>
                <p>Simulate exam pressure with focused tests designed for daily consistency.</p>
            </article>
            <article class="feature">
                <div class="icon" aria-hidden="true">Q</div>
                <h3>Question Bank</h3>
                <p>Practice topic-wise questions and improve weak concepts with structured review.</p>
            </article>
            <article class="feature">
                <div class="icon" aria-hidden="true">P</div>
                <h3>Progress Tracking</h3>
                <p>Track points, activity, and milestones so you always know your next move.</p>
            </article>
        </div>
    </section>

    <footer class="panel footer">
        <div>Planq © {new Date().getFullYear()}</div>
        <div class="footer-links">
            <a href="/questions">Questions</a>
            <a href="mailto:hello@planq.app">Contact</a>
            <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
            <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
        </div>
    </footer>
</main>