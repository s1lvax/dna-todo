import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	//protected route
	if (!locals.user) {
		throw redirect(302, '/login');
	}
};
