<svelte:head>
    <title>Dashboard - Planq</title>
    <meta name="description" content="Your Planq Dashboard" />
</svelte:head>

<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import { onMount } from "svelte";

    let user: any = null;
    let isLoading = true;

    onMount(async () => {
        // Fetch user data from the backend
        try {
            const response = await fetch('http://localhost:8080/api/me', {
                credentials: 'include',
            });
            if (response.ok) {
                user = await response.json();
            }
        } catch (error) {
            console.error('Failed to fetch user:', error);
        }
        isLoading = false;
    });

    function handleLogout() {
        // Clear cookies and redirect to home
        document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/';
    }
</script>

<style>
    .dashboard {
        min-height: 100vh;
        padding: 2rem;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 3rem;
        padding-bottom: 2rem;
        border-bottom: 1px solid var(--border-color);
    }

    .header-content h1 {
        font-weight: 700;
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
    }

    .header-content p {
        color: var(--text-secondary);
        font-size: 1rem;
    }

    .user-info {
        text-align: right;
    }

    .user-name {
        font-weight: 600;
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
    }

    .user-email {
        color: var(--text-secondary);
        font-size: 0.9rem;
        margin-bottom: 1rem;
    }

    .content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }

    .card {
        background-color: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-lg);
        padding: 2rem;
        box-shadow: var(--shadow-md);
        transition: all var(--transition-normal);
    }

    .card:hover {
        border-color: var(--accent-primary);
        box-shadow: var(--shadow-lg);
    }

    .card h3 {
        font-weight: 600;
        font-size: 1.25rem;
        margin-bottom: 1rem;
        color: var(--accent-primary);
    }

    .card p {
        color: var(--text-secondary);
        margin-bottom: 1.5rem;
        line-height: 1.6;
    }

    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 50vh;
        color: var(--text-secondary);
        font-size: 1.1rem;
    }

    .stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 1rem;
        margin-bottom: 2rem;
    }

    .stat-box {
        background-color: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-lg);
        padding: 1.5rem;
        text-align: center;
    }

    .stat-value {
        font-size: 2rem;
        font-weight: 700;
        background: linear-gradient(to right, var(--accent-primary), var(--accent-secondary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 0.5rem;
    }

    .stat-label {
        color: var(--text-secondary);
        font-size: 0.9rem;
    }
</style>

<div class="dashboard">
    <div class="header">
        <div class="header-content">
            <h1 class="gradient-text">Planq</h1>
            <p>Welcome back to your exam prep dashboard</p>
        </div>
        <div class="user-info">
            {#if !isLoading && user}
                <div class="user-name">{user.username || user.email}</div>
                <div class="user-email">{user.email}</div>
                <Button variant="secondary" size="sm" onclick={handleLogout}>Logout</Button>
            {:else if isLoading}
                <p class="muted">Loading...</p>
            {:else}
                <p class="muted">Not authenticated</p>
            {/if}
        </div>
    </div>

    {#if !isLoading && user}
        <div class="stats">
            <div class="stat-box">
                <div class="stat-value">0</div>
                <div class="stat-label">Tests Taken</div>
            </div>
            <div class="stat-box">
                <div class="stat-value">0</div>
                <div class="stat-label">Points Earned</div>
            </div>
            <div class="stat-box">
                <div class="stat-value">0%</div>
                <div class="stat-label">Average Score</div>
            </div>
            <div class="stat-box">
                <div class="stat-value">0</div>
                <div class="stat-label">Days Streak</div>
            </div>
        </div>

        <div class="content">
            <div class="card">
                <h3>Start a Test</h3>
                <p>Choose from our curated collection of entrance exams and practice tests to improve your preparation.</p>
                <Button size="sm">Browse Tests</Button>
            </div>

            <div class="card">
                <h3>My Progress</h3>
                <p>Track your performance across different subjects and topics. See your improvement over time.</p>
                <Button size="sm" variant="secondary">View Progress</Button>
            </div>

            <div class="card">
                <h3>Study Materials</h3>
                <p>Access comprehensive study notes, formulas, and tips curated by top students.</p>
                <Button size="sm">View Materials</Button>
            </div>

            <div class="card">
                <h3>Leaderboard</h3>
                <p>See how you rank among other students. Compete and motivate each other to excel.</p>
                <Button size="sm" variant="secondary">View Rankings</Button>
            </div>

            <div class="card">
                <h3>My Tests</h3>
                <p>Revisit your past tests, check answers, and review concepts you might need to strengthen.</p>
                <Button size="sm">View History</Button>
            </div>

            <div class="card">
                <h3>Settings</h3>
                <p>Manage your profile, preferences, and notification settings to customize your experience.</p>
                <Button size="sm" variant="secondary">Go to Settings</Button>
            </div>
        </div>
    {:else if isLoading}
        <div class="loading">Loading your dashboard...</div>
    {:else}
        <div class="loading">Please log in to access the dashboard</div>
    {/if}
</div>
