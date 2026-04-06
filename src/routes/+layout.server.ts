type LayoutUser = {
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
		return {
			user: null,
			isLoggedIn: false,
		};
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

		if (!response.ok) {
			return {
				user: null,
				isLoggedIn: false,
			};
		}

		const user = (await response.json()) as LayoutUser;

		return {
			user,
			isLoggedIn: true,
		};
	} catch {
		return {
			user: null,
			isLoggedIn: false,
		};
	}
}