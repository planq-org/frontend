<script lang="ts">
	import { goto } from '$app/navigation';
	import logo from '$lib/assets/logo.svg';

	type NavUser = {
		id: string;
		email: string;
		username: string;
	};

	let { user }: { user: NavUser | null } = $props();

	const backendUrl = import.meta.env.VITE_BACKEND ?? 'http://localhost:8080';
	let mobileOpen = $state(false);
	let profileOpen = $state(false);

	const isLoggedIn = $derived(Boolean(user));
	const initials = $derived(
		user?.username
			?.split(/\s+/)
			.filter(Boolean)
			.map((part) => part[0])
			.join('')
			.slice(0, 2)
			.toUpperCase() || 'U'
	);

	function closeMenus() {
		mobileOpen = false;
		profileOpen = false;
	}

	async function handleLogout() {
		closeMenus();
		window.location.href = `${backendUrl}/auth/logout`;
	}

	function navigateTo(path: string) {
		closeMenus();
		goto(path);
	}
</script>

<nav class="nav-wrap">
	<div class="nav-shell">
		<a class="brand" href={isLoggedIn ? '/dashboard' : '/'} aria-label="Planq home">
			<img class="brand-logo" src={logo} alt="Planq logo" />
			<div class="brand-text">Planq</div>
		</a>

		<div class={`center-links ${mobileOpen ? 'open' : ''}`}>
			{#if isLoggedIn}
				<a href="/dashboard" onclick={closeMenus}>Home</a>
				<a href="/tests" onclick={closeMenus}>Tests</a>
				<a href="/questions" onclick={closeMenus}>Questions</a>
			{:else}
				<a href="/questions" onclick={closeMenus}>Questions</a>
			{/if}
		</div>

		<div class="right-area">
			{#if !isLoggedIn}
				<a class="login-btn" href="/#get-started">Login</a>
			{:else}
				<div class="profile-block">
					<button
						type="button"
						class="avatar-btn"
						onclick={() => (profileOpen = !profileOpen)}
						aria-haspopup="menu"
						aria-expanded={profileOpen}
					>
						<span class="avatar">{initials}</span>
					</button>
					{#if profileOpen}
						<div class="dropdown" role="menu">
							<button type="button" role="menuitem" onclick={() => navigateTo('/profile/settings')}>
								Profile Settings
							</button>
							<button type="button" role="menuitem" onclick={handleLogout}>Logout</button>
						</div>
					{/if}
				</div>
			{/if}

			<button
				type="button"
				class="mobile-toggle"
				onclick={() => (mobileOpen = !mobileOpen)}
				aria-label="Toggle menu"
			>
				<span></span>
				<span></span>
				<span></span>
			</button>
		</div>
	</div>
</nav>

<style>
	.nav-wrap {
		position: sticky;
		top: 0.65rem;
		z-index: 40;
		padding: 0 0.75rem;
		margin-bottom: 2rem;
	}

	.nav-shell {
		max-width: 1080px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 1rem;
		padding: 0.62rem 0.85rem;
		border-radius: var(--radius-lg);
		border: 1px solid rgba(80, 88, 99, 0.7);
		background: rgba(14, 17, 22, 0.82);
		backdrop-filter: blur(12px);
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		text-decoration: none;
	}

	.brand-logo {
		width: 1.72rem;
		height: 1.72rem;
		display: block;
		border-radius: var(--radius-sm);
		object-fit: cover;
	}

	.brand-text {
		font-weight: 700;
		letter-spacing: -0.01em;
		color: var(--text-primary);
	}

	.center-links {
		display: inline-flex;
		justify-content: center;
		gap: 0.95rem;
	}

	.center-links a {
		text-decoration: none;
		color: var(--text-secondary);
		font-size: 0.9rem;
		font-weight: 500;
		padding: 0.35rem 0.5rem;
		border-radius: var(--radius-sm);
		transition: color var(--transition-fast), background var(--transition-fast);
	}

	.center-links a:hover {
		color: var(--text-primary);
		background: rgba(107, 138, 253, 0.14);
	}

	.right-area {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
	}

	.login-btn {
		display: inline-flex;
		align-items: center;
		text-decoration: none;
		color: #0f1220;
		background: linear-gradient(135deg, #8ea8ff, #78dcc0);
		border-radius: var(--radius-md);
		padding: 0.42rem 0.8rem;
		font-size: 0.84rem;
		font-weight: 700;
	}

	.profile-block {
		position: relative;
	}

	.avatar-btn {
		border: 1px solid rgba(107, 138, 253, 0.4);
		background: rgba(107, 138, 253, 0.12);
		border-radius: var(--radius-md);
		padding: 0.14rem;
		cursor: pointer;
	}

	.avatar {
		width: 1.95rem;
		height: 1.95rem;
		display: grid;
		place-items: center;
		border-radius: 999px;
		font-size: 0.75rem;
		font-weight: 700;
		color: var(--text-primary);
		background: linear-gradient(135deg, #4f68cc, #3857af);
	}

	.dropdown {
		position: absolute;
		right: 0;
		margin-top: 0.5rem;
		width: 170px;
		padding: 0.35rem;
		border-radius: var(--radius-md);
		border: 1px solid var(--border-color);
		background: #1a1d22;
		box-shadow: var(--shadow-lg);
		display: grid;
		gap: 0.25rem;
	}

	.dropdown button {
		text-align: left;
		border: 0;
		border-radius: var(--radius-sm);
		padding: 0.5rem 0.55rem;
		font-size: 0.85rem;
		color: var(--text-secondary);
		background: transparent;
		cursor: pointer;
	}

	.dropdown button:hover {
		background: rgba(107, 138, 253, 0.12);
		color: var(--text-primary);
	}

	.mobile-toggle {
		display: none;
		width: 2rem;
		height: 2rem;
		border: 1px solid var(--border-color);
		border-radius: var(--radius-sm);
		background: transparent;
		padding: 0.3rem;
		cursor: pointer;
	}

	.mobile-toggle span {
		display: block;
		width: 100%;
		height: 2px;
		margin: 3px 0;
		background: var(--text-primary);
	}

	@media (max-width: 860px) {
		.nav-shell {
			grid-template-columns: auto auto;
			justify-content: space-between;
			border-radius: var(--radius-lg);
		}

		.mobile-toggle {
			display: inline-block;
		}

		.center-links {
			display: none;
			grid-column: 1 / -1;
			width: 100%;
			justify-content: flex-start;
			flex-direction: column;
			gap: 0.3rem;
			padding-top: 0.3rem;
		}

		.center-links.open {
			display: flex;
		}

		.center-links a {
			padding: 0.55rem 0.6rem;
		}
	}
</style>