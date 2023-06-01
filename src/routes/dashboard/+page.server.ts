import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	//protected route (we get this from the hooks)
	if (!locals.user) {
		throw redirect(302, '/login');
	}
};
