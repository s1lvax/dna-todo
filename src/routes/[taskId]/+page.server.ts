import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const task = await prisma.todo.findUnique({
		where: {
			id: params.taskId
		}
	});
	if (!task) {
		throw error(404, 'Task not found');
	}

	return { task };
};

export const actions: Actions = {
	editTask: async ({ request, params }) => {
		const { title, body } = Object.fromEntries(await request.formData()) as {
			title: string;
			body: string;
		};

		try {
			await prisma.todo.update({
				where: {
					id: params.taskId
				},
				data: {
					title: title,
					body: body
				}
			});
		} catch (err) {
			console.log(err);
			throw error(500, 'Something went wrong');
		}

		return { status: 200 };
	}
};
