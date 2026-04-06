import { redirect } from '@sveltejs/kit';

export async function load({ parent }) {
	const { isLoggedIn } = await parent();

	if (!isLoggedIn) {
		throw redirect(303, '/');
	}
}
