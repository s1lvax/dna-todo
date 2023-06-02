import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
	//redirect users if not logged in
	if (!locals.user) {
		throw redirect(302, '/login');
	} else {
		//get existing tasks
		const existingTasks = await prisma.todo.findMany({
			where: { authorId: locals.user.userid },
			select: { title: true, body: true, createdAt: true }
		});

		return { existingTasks };
	}
};
