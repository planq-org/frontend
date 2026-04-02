import { redirect } from '@sveltejs/kit';

type DashboardUser = {
	id: string;
	email: string;
	username: string;
	created_at: string;
	points?: number | null;
	test_ids?: string[];
};

export async function load({ cookies, fetch }) {
	const accessToken = cookies.get('access_token');
	const refreshToken = cookies.get('refresh_token');

	if (!accessToken) {
		throw redirect(303, '/');
	}

	const backendUrl = import.meta.env.VITE_BACKEND ?? 'http://localhost:8080';
	const authCookies = [`access_token=${accessToken}`];

	if (refreshToken) {
		authCookies.push(`refresh_token=${refreshToken}`);
	}

	try {
		const response = await fetch(`${backendUrl}/api/me`, {
			headers: {
				cookie: authCookies.join('; '),
			},
		});

		if (response.status === 401) {
			throw redirect(303, '/');
		}

		if (!response.ok) {
			return {
				authenticated: true,
				user: null,
				apiError: 'Could not load your profile right now.',
			};
		}

		const user = (await response.json()) as DashboardUser;

		return {
			authenticated: true,
			user,
			apiError: null,
		};
	} catch {
		return {
			authenticated: true,
			user: null,
			apiError: 'Dashboard is up, but the profile service is temporarily unavailable.',
		};
	}

}
