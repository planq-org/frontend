<svelte:head>
    <title>Dashboard - Planq</title>
    <meta name="description" content="Your exam prep dashboard" />
</svelte:head>

<script lang="ts">
    import type { PageData } from './$types';

    type ActivityCell = {
        date: string;
        level: number;
    };

    let { data }: { data: PageData } = $props();

    const user = $derived(data.user);
    const tests = $derived((user?.test_ids ?? []).slice().reverse());
    const recentTests = $derived(tests.slice(0, 3));

    const finalExamDate = new Date('2026-12-15T09:00:00');

    const countdown = $derived.by(() => {
        const now = new Date();
        const diff = finalExamDate.getTime() - now.getTime();

        if (diff <= 0) {
            return { months: 0, days: 0, hours: 0 };
        }

        const totalHours = Math.floor(diff / (1000 * 60 * 60));
        const months = Math.floor(totalHours / (24 * 30));
        const days = Math.floor((totalHours % (24 * 30)) / 24);
        const hours = totalHours % 24;

        return { months, days, hours };
    });

    function hashSeed(input: string): number {
        let hash = 0;
        for (let i = 0; i < input.length; i += 1) {
            hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
        }
        return hash;
    }

    function pseudoRandom(seed: number): number {
        const value = Math.sin(seed) * 10000;
        return value - Math.floor(value);
    }

    const activityCells = $derived.by(() => {
        if (!user) {
            return [] as ActivityCell[];
        }

        const output: ActivityCell[] = [];
        const today = new Date();
        const testsCount = user.test_ids?.length ?? 0;
        const density = Math.min(0.08 + testsCount * 0.015, 0.62);
        const baseSeed = hashSeed(`${user.id}-${user.created_at}-${testsCount}`);

        for (let offset = 364; offset >= 0; offset -= 1) {
            const date = new Date(today);
            date.setDate(today.getDate() - offset);

            const daySeed = baseSeed + offset * 17;
            const roll = pseudoRandom(daySeed);
            let level = 0;

            if (roll < density) {
                const intensityRoll = pseudoRandom(daySeed + 99);
                if (intensityRoll < 0.35) {
                    level = 1;
                } else if (intensityRoll < 0.62) {
                    level = 2;
                } else if (intensityRoll < 0.84) {
                    level = 3;
                } else {
                    level = 4;
                }
            }

            output.push({
                date: date.toISOString().slice(0, 10),
                level,
            });
        }

        return output;
    });

    const heatmapWeeks = $derived.by(() => {
        const weeks: ActivityCell[][] = [];

        for (let i = 0; i < activityCells.length; i += 7) {
            weeks.push(activityCells.slice(i, i + 7));
        }

        return weeks;
    });

    const recentActivity = $derived.by(() => {
        if (!user) {
            return [] as { title: string; link: string; time: string }[];
        }

        const testItems = (user.test_ids ?? []).slice(-5).reverse().map((id, idx) => ({
            title: `Completed test #${idx + 1}`,
            link: `/tests/${id}`,
            time: `${idx + 1} day${idx === 0 ? '' : 's'} ago`,
        }));

        const questionItems = (user.test_ids ?? []).slice(0, 2).map((id, idx) => ({
            title: `Solved question set from ${id}`,
            link: `/questions`,
            time: `${idx + 2} days ago`,
        }));

        return [...testItems, ...questionItems].slice(0, 6);
    });

    const upcomingDeadlines = $derived.by(() => {
        if (!user) {
            return [] as { title: string; due: string; link: string }[];
        }

        const today = new Date();
        const deadlineOffsets = [3, 7, 12];

        return deadlineOffsets.map((days, idx) => {
            const dueDate = new Date(today);
            dueDate.setDate(today.getDate() + days);

            return {
                title: idx === 0 ? 'Weekly mixed mock test' : idx === 1 ? 'Subject revision checkpoint' : 'Full syllabus simulation',
                due: dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                link: idx === 1 ? '/questions' : '/tests',
            };
        });
    });
</script>

<style>
    .page {
        width: min(1120px, 100% - 1.5rem);
        margin: 0.9rem auto 1.4rem;
    }

    .welcome {
        border: 1px solid color-mix(in srgb, var(--border-color) 74%, white 26%);
        border-radius: 1rem;
        background: linear-gradient(145deg, rgba(29, 34, 40, 0.96), rgba(21, 24, 29, 0.96));
        padding: 1rem 1.1rem;
        margin-bottom: 0.9rem;
    }

    .welcome h1 {
        font-size: clamp(1.2rem, 2.1vw, 1.65rem);
        margin-bottom: 0.3rem;
    }

    .welcome p {
        color: var(--text-secondary);
        line-height: 1.5;
    }

    .layout {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 0.8rem;
    }

    .panel {
        border: 1px solid color-mix(in srgb, var(--border-color) 74%, white 26%);
        border-radius: 0.95rem;
        background: rgba(25, 29, 34, 0.95);
        padding: 0.95rem;
    }

    .panel h2 {
        font-size: 1rem;
        margin-bottom: 0.65rem;
    }

    .countdown-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 0.55rem;
    }

    .countdown-box {
        border: 1px solid rgba(107, 138, 253, 0.25);
        border-radius: 0.8rem;
        background: rgba(107, 138, 253, 0.06);
        padding: 0.8rem;
        text-align: center;
    }

    .countdown-value {
        font-size: 1.5rem;
        font-weight: 700;
        letter-spacing: -0.02em;
    }

    .countdown-label {
        color: var(--text-secondary);
        font-size: 0.79rem;
        text-transform: uppercase;
        letter-spacing: 0.06em;
    }

    .heatmap-wrap {
        overflow-x: auto;
        padding-bottom: 0.2rem;
    }

    .heatmap {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 0.72rem;
        grid-template-rows: repeat(7, 0.72rem);
        gap: 0.2rem;
        width: max-content;
    }

    .cell {
        width: 0.72rem;
        height: 0.72rem;
        border-radius: 0.15rem;
        background: rgba(120, 125, 133, 0.25);
    }

    .level-1 { background: #254661; }
    .level-2 { background: #2f6e91; }
    .level-3 { background: #3d9ec8; }
    .level-4 { background: #6fd3ef; }

    .legend {
        margin-top: 0.6rem;
        color: var(--text-secondary);
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        gap: 0.45rem;
    }

    .legend-scale {
        display: inline-flex;
        gap: 0.2rem;
    }

    .legend-scale span {
        width: 0.62rem;
        height: 0.62rem;
        border-radius: 0.12rem;
    }

    .activity-list,
    .deadline-list,
    .recent-tests {
        list-style: none;
        display: grid;
        gap: 0.5rem;
    }

    .item {
        border: 1px solid rgba(107, 138, 253, 0.2);
        border-radius: 0.75rem;
        padding: 0.65rem 0.7rem;
        background: rgba(107, 138, 253, 0.05);
        display: grid;
        gap: 0.2rem;
    }

    .item a {
        text-decoration: none;
        color: #d9e0ff;
        font-weight: 500;
        font-size: 0.9rem;
    }

    .meta {
        color: var(--text-secondary);
        font-size: 0.78rem;
    }

    .empty {
        border: 1px dashed var(--border-color);
        border-radius: 0.75rem;
        padding: 0.75rem;
        font-size: 0.9rem;
        color: var(--text-secondary);
    }

    @media (max-width: 980px) {
        .layout {
            grid-template-columns: 1fr;
        }

        .countdown-grid {
            grid-template-columns: 1fr;
        }
    }
</style>

{#if user}
    <main class="page">
        <section class="welcome">
            <h1>Welcome back, {user.username}.</h1>
            <p>Your exam prep dashboard is tuned for daily practice and weekly progress.</p>
        </section>

        <section class="layout">
            <div>
                <article class="panel">
                    <h2>Time Until Final Exam</h2>
                    <div class="countdown-grid">
                        <div class="countdown-box">
                            <div class="countdown-value">{countdown.months}</div>
                            <div class="countdown-label">Months</div>
                        </div>
                        <div class="countdown-box">
                            <div class="countdown-value">{countdown.days}</div>
                            <div class="countdown-label">Days</div>
                        </div>
                        <div class="countdown-box">
                            <div class="countdown-value">{countdown.hours}</div>
                            <div class="countdown-label">Hours</div>
                        </div>
                    </div>
                </article>

                <article class="panel" style="margin-top: 0.75rem;">
                    <h2>Activity Heatmap (Last 12 Months)</h2>
                    <div class="heatmap-wrap">
                        <div class="heatmap">
                            {#each heatmapWeeks as week}
                                {#each week as day}
                                    <div class={`cell level-${day.level}`} title={`${day.date} · activity ${day.level}`}></div>
                                {/each}
                            {/each}
                        </div>
                    </div>
                    <div class="legend">
                        <span>Less</span>
                        <span class="legend-scale">
                            <span class="cell"></span>
                            <span class="cell level-1"></span>
                            <span class="cell level-2"></span>
                            <span class="cell level-3"></span>
                            <span class="cell level-4"></span>
                        </span>
                        <span>More</span>
                    </div>
                </article>

                <article class="panel" style="margin-top: 0.75rem;">
                    <h2>Recent Activity</h2>
                    {#if recentActivity.length > 0}
                        <ul class="activity-list">
                            {#each recentActivity as activity}
                                <li class="item">
                                    <a href={activity.link}>{activity.title}</a>
                                    <span class="meta">{activity.time}</span>
                                </li>
                            {/each}
                        </ul>
                    {:else}
                        <div class="empty">No recent activity yet. Start with a test or question set today.</div>
                    {/if}
                </article>

                <article class="panel" style="margin-top: 0.75rem;">
                    <h2>Upcoming Deadlines & Events</h2>
                    <ul class="deadline-list">
                        {#each upcomingDeadlines as event}
                            <li class="item">
                                <a href={event.link}>{event.title}</a>
                                <span class="meta">Due {event.due}</span>
                            </li>
                        {/each}
                    </ul>
                </article>
            </div>

            <aside class="panel">
                <h2>3 Recent Tests</h2>
                {#if recentTests.length > 0}
                    <ul class="recent-tests">
                        {#each recentTests as testId, index}
                            <li class="item">
                                <a href={`/tests/${testId}`}>Test #{index + 1}</a>
                                <span class="meta">ID: {testId}</span>
                            </li>
                        {/each}
                    </ul>
                {:else}
                    <div class="empty">No tests generated yet. Create your first test from the Tests page.</div>
                {/if}
            </aside>
        </section>
    </main>
{/if}
