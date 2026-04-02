<svelte:head>
    <title>Dashboard - Planq</title>
    <meta name="description" content="Daily exam prep dashboard for Planq students" />
</svelte:head>

<script lang="ts">
    import type { PageData } from './$types';
    import Button from "$lib/components/Button.svelte";

    let { data }: { data: PageData } = $props();

    const user = $derived(data.user);
    const points = $derived(user?.points ?? 0);
    const testIds = $derived(user?.test_ids ?? []);
    const testsTaken = $derived(testIds.length);
    const avgPointsPerTest = $derived(testsTaken > 0 ? Math.round(points / testsTaken) : 0);
    const completion = $derived(Math.min(100, 20 + testsTaken * 12 + Math.min(50, Math.floor(points / 10))));
    const nextMilestone = $derived(points < 100 ? 100 : points < 250 ? 250 : points < 500 ? 500 : 1000);
    const pointsToMilestone = $derived(Math.max(0, nextMilestone - points));
    const dailyGoalTests = 2;
    const dailyGoalProgress = $derived(Math.min(100, Math.round((testsTaken / dailyGoalTests) * 100)));

    const todayLabel = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric'
    }).format(new Date());

    const displayName = $derived(user?.username || user?.email || 'Student');

    function handleLogout() {
        window.location.href = '/';
    }

    function formatJoinDate(value: string | undefined): string {
        if (!value) {
            return 'Unknown';
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return 'Unknown';
        }

        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(date);
    }
</script>

<style>
    .page {
        min-height: 100vh;
        padding: 1.25rem;
    }

    .dashboard {
        width: min(1080px, 100%);
        margin: 0 auto;
        display: grid;
        gap: 1rem;
    }

    .panel {
        border: 1px solid color-mix(in srgb, var(--border-color) 75%, white 25%);
        background: linear-gradient(180deg, rgba(27, 31, 37, 0.96), rgba(24, 28, 33, 0.96));
        border-radius: 1rem;
        box-shadow: 0 10px 22px rgba(0, 0, 0, 0.15);
    }

    .topbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
        padding: 0.9rem 1rem;
        animation: fadeUp 280ms ease-out;
    }

    .topbar-left h1 {
        font-size: clamp(1.2rem, 2vw, 1.55rem);
        letter-spacing: -0.02em;
        margin-bottom: 0.15rem;
    }

    .subtle {
        color: var(--text-secondary);
        font-size: 0.88rem;
    }

    .hero {
        display: grid;
        grid-template-columns: 1.25fr 1fr;
        gap: 0.9rem;
        animation: fadeUp 360ms ease-out;
    }

    .hero-main,
    .hero-side {
        padding: 1.1rem;
    }

    .label {
        display: inline-flex;
        align-items: center;
        border: 1px solid rgba(107, 138, 253, 0.35);
        border-radius: 999px;
        color: #b9c7ff;
        font-size: 0.72rem;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        padding: 0.3rem 0.55rem;
        margin-bottom: 0.7rem;
    }

    .hero-main h2 {
        font-size: clamp(1.4rem, 2.6vw, 1.95rem);
        line-height: 1.15;
        letter-spacing: -0.02em;
        margin-bottom: 0.55rem;
    }

    .hero-main p {
        color: var(--text-secondary);
        max-width: 58ch;
        margin-bottom: 0.9rem;
    }

    .action-row {
        display: flex;
        gap: 0.65rem;
        flex-wrap: wrap;
    }

    .hero-side {
        display: grid;
        align-content: space-between;
        gap: 0.9rem;
    }

    .goal {
        border: 1px solid rgba(129, 199, 132, 0.26);
        border-radius: 0.75rem;
        padding: 0.85rem;
        background: rgba(129, 199, 132, 0.06);
    }

    .goal-title {
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #bad9bb;
        margin-bottom: 0.4rem;
    }

    .goal-value {
        font-size: 1.3rem;
        font-weight: 700;
        letter-spacing: -0.02em;
    }

    .metrics {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 0.75rem;
        animation: fadeUp 440ms ease-out;
    }

    .metric {
        padding: 0.85rem;
    }

    .metric dt {
        color: var(--text-tertiary);
        font-size: 0.75rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        margin-bottom: 0.4rem;
    }

    .metric dd {
        font-size: clamp(1.05rem, 1.9vw, 1.45rem);
        font-weight: 700;
        letter-spacing: -0.02em;
    }

    .main {
        display: grid;
        grid-template-columns: 1.45fr 1fr;
        gap: 0.75rem;
        animation: fadeUp 520ms ease-out;
    }

    .section {
        padding: 1rem;
    }

    .section h3 {
        font-size: 1rem;
        margin-bottom: 0.75rem;
    }

    .list {
        list-style: none;
        display: grid;
        gap: 0.6rem;
    }

    .list li {
        border: 1px solid rgba(107, 138, 253, 0.2);
        border-radius: 0.7rem;
        padding: 0.65rem 0.75rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.8rem;
        background: rgba(107, 138, 253, 0.05);
    }

    .chip {
        font-size: 0.73rem;
        color: #b8c5fa;
        background: rgba(107, 138, 253, 0.2);
        border-radius: 999px;
        padding: 0.2rem 0.48rem;
        flex-shrink: 0;
    }

    .empty {
        border: 1px dashed var(--border-color);
        border-radius: 0.7rem;
        padding: 0.8rem;
        color: var(--text-secondary);
        font-size: 0.9rem;
    }

    .progress-label {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 0.42rem;
        color: var(--text-secondary);
        font-size: 0.85rem;
    }

    .track {
        width: 100%;
        height: 0.56rem;
        background: rgba(120, 125, 133, 0.23);
        border-radius: 999px;
        overflow: hidden;
        margin-bottom: 0.8rem;
    }

    .fill {
        height: 100%;
        width: 0;
        border-radius: inherit;
        background: linear-gradient(90deg, #6b8afd, #7bcba0);
        transition: width 360ms ease;
    }

    .account p {
        font-size: 0.9rem;
        color: var(--text-secondary);
        margin-bottom: 0.38rem;
        word-break: break-word;
    }

    .error {
        border: 1px solid rgba(229, 115, 115, 0.45);
        background: rgba(229, 115, 115, 0.08);
        color: #f1c3c3;
        border-radius: 0.75rem;
        padding: 0.75rem 0.9rem;
        font-size: 0.88rem;
    }

    @keyframes fadeUp {
        from {
            opacity: 0;
            transform: translateY(6px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 920px) {
        .hero,
        .main {
            grid-template-columns: 1fr;
        }

        .metrics {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    @media (max-width: 640px) {
        .page {
            padding: 0.75rem;
        }

        .topbar {
            align-items: flex-start;
            flex-direction: column;
        }

        .metrics {
            grid-template-columns: 1fr;
        }
    }
</style>

<div class="page">
    <div class="dashboard">
        <header class="panel topbar">
            <div class="topbar-left">
                <h1>{displayName}'s Study Space</h1>
                <p class="subtle">{todayLabel} · consistent work beats cramming</p>
            </div>
            <Button variant="secondary" size="sm" onclick={handleLogout}>Back to Home</Button>
        </header>

        {#if data.apiError}
            <div class="error">{data.apiError}</div>
        {/if}

        {#if user}
            <section class="hero">
                <article class="panel hero-main">
                    <span class="label">Daily Focus</span>
                    <h2>Build momentum with one strong practice session.</h2>
                    <p>
                        You have completed {testsTaken} tests and collected {points} points. Keep today's session short,
                        focused, and review one weak topic after practice.
                    </p>
                    <div class="action-row">
                        <Button size="sm">Start Practice</Button>
                        <Button size="sm" variant="secondary">Review Mistakes</Button>
                    </div>
                </article>

                <aside class="panel hero-side">
                    <div class="goal">
                        <p class="goal-title">Next Milestone</p>
                        <p class="goal-value">{pointsToMilestone} points left</p>
                        <p class="subtle">Target: {nextMilestone} points</p>
                    </div>
                    <div>
                        <p class="subtle">Member since {formatJoinDate(user.created_at)}</p>
                    </div>
                </aside>
            </section>

            <dl class="metrics">
                <div class="panel metric">
                    <dt>Total Points</dt>
                    <dd>{points}</dd>
                </div>
                <div class="panel metric">
                    <dt>Tests Completed</dt>
                    <dd>{testsTaken}</dd>
                </div>
                <div class="panel metric">
                    <dt>Avg Points/Test</dt>
                    <dd>{avgPointsPerTest}</dd>
                </div>
                <div class="panel metric">
                    <dt>Readiness</dt>
                    <dd>{completion}%</dd>
                </div>
            </dl>

            <section class="main">
                <article class="panel section">
                    <h3>Today's Plan</h3>
                    <ul class="list">
                        <li>
                            <span>Complete one timed practice set</span>
                            <span class="chip">Priority</span>
                        </li>
                        <li>
                            <span>Review your last test and note 3 mistakes</span>
                            <span class="chip">Review</span>
                        </li>
                        <li>
                            <span>Spend 20 minutes on weak concepts</span>
                            <span class="chip">Concepts</span>
                        </li>
                    </ul>

                    <h3 style="margin-top: 1rem;">Recent Test IDs</h3>
                    {#if testsTaken > 0}
                        <ul class="list">
                            {#each testIds as testId, index}
                                <li>
                                    <span>Practice #{index + 1}: {testId}</span>
                                    <span class="chip">Saved</span>
                                </li>
                            {/each}
                        </ul>
                    {:else}
                        <div class="empty">No tests recorded yet. Start your first practice session to build your streak.</div>
                    {/if}
                </article>

                <aside class="panel section">
                    <h3>Consistency</h3>
                    <div class="progress-label">
                        <span>Daily practice goal</span>
                        <span>{Math.min(100, dailyGoalProgress)}%</span>
                    </div>
                    <div class="track">
                        <div class="fill" style={`width: ${Math.min(100, dailyGoalProgress)}%`}></div>
                    </div>
                    <p class="subtle">Goal: {dailyGoalTests} completed tests. Current: {testsTaken}.</p>

                    <h3 style="margin-top: 1rem;">Account</h3>
                    <div class="account">
                        <p><strong>Name:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>User ID:</strong> {user.id}</p>
                    </div>
                </aside>
            </section>
        {:else}
            <section class="panel section">
                <h3>Dashboard unavailable</h3>
                <p class="subtle">Your session exists, but we could not load your profile data right now.</p>
            </section>
        {/if}
    </div>
</div>
