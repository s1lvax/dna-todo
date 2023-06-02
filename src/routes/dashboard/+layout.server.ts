import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { z } from 'zod';

const todoSchema = z.object({
	title: z.string().min(3).max(15),
	body: z.string().optional()
});

export const load: LayoutServerLoad = async ({ locals }) => {
	//get existing tasks
	const existingTasks = await prisma.todo.findMany({
		where: { authorId: locals.user.userid },
		select: { title: true, body: true, createdAt: true }
	});

	return { existingTasks };
};
