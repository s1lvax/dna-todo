import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { z } from 'zod';
import { redirect } from '@sveltejs/kit';

const todoSchema = z.object({
	title: z.string().min(3).max(15),
	body: z.string().optional()
});

export const load: LayoutServerLoad = async ({ locals }) => {
	//redirect users if not logged in
	if (!locals.user) {
		throw redirect(302, '/login');
	}
	//get existing tasks
	const existingTasks = await prisma.todo.findMany({
		where: { authorId: locals.user.userid },
		select: { title: true, body: true, createdAt: true }
	});

	return { existingTasks };
};
