import type { PageServerLoad, Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import { prisma } from '$lib/server/prisma';

const todoSchema = z.object({
	title: z.string().min(3).max(40),
	body: z.string().optional()
});

export const load: PageServerLoad = async ({ locals }) => {
	//protected route (we get this from the hooks)
	if (!locals.user) {
		throw redirect(302, '/login');
	}
	//superform
	const form = await superValidate(todoSchema);

	return { form };
};

export const actions: Actions = {
	createTask: async ({ request, locals }) => {
		//validate form
		const form = await superValidate(request, todoSchema);

		//if form is invalid, return error and form
		if (!form.valid) {
			return fail(400, { form });
		}

		//get data from form
		let { title, body } = form.data as {
			title: string;
			body: string;
		};

		if (body == null) {
			body = 'No description.';
		}

		//input todo in database
		try {
			await prisma.todo.create({
				data: {
					title: title,
					body: body,
					authorId: locals.user.userid
				}
			});
		} catch (error) {
			console.log(error);
			return fail(500, { form });
		}

		//always return form in superforms
		return { form };
	},
	deleteTask: async ({ url }) => {
		//get task id from url
		const id = url.searchParams.get('id');

		//if no id found, return error
		if (!id) {
			return fail(400, { message: 'Invalid request' });
		}

		//delete tasks
		try {
			await prisma.todo.delete({
				where: { id: id }
			});
		} catch (err) {
			console.log(err);
			return fail(500, { message: 'Something went wrong.' });
		}
	}
};
