import type { LayoutServerLoad } from './$types';

//get the user from the hook
export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		user: locals.user
	};
};
