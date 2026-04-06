import { redirect } from '@sveltejs/kit';

export async function load({ parent, params }) {
	const { isLoggedIn } = await parent();

	if (!isLoggedIn) {
		throw redirect(303, '/');
	}

	return {
		testId: params.id,
	};
}
