import type { Actions } from './$types';
import { prisma } from '../../lib/server/prisma';
import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate, setError } from 'sveltekit-superforms/server';

const registerSchema = z.object({
	username: z.string(),
	email: z.string().email(),
	password: z.string().min(5),
	confirmPassword: z.string().min(5)
});

export const load = async () => {
	// Server API:
	const form = await superValidate(registerSchema);

	//We need to always return form in Superforms
	return { form };
};

export const actions = {
	//named default because there's just one
	default: async ({ request }) => {
		//validate form using Zod
		const form = await superValidate(request, registerSchema);
		//return the error
		if (!form.valid) {
			return fail(400, { form });
		}

		//get data from form
		const { username, email, password, confirmPassword } = form.data as {
			username: string;
			email: string;
			password: string;
			confirmPassword: string;
		};

		//passwords don't match
		if (password !== confirmPassword) {
			return setError(form, 'password', 'Passwords do not match.');
		}

		//user already exists
		const existingUser = await prisma.user.findUnique({
			where: {
				username: username
			}
		});
		if (existingUser) {
			return setError(form, 'username', 'Username already exists.');
		}

		//if all checks pass, create user
		try {
			await prisma.user.create({
				data: {
					username,
					email,
					password
				}
			});
		} catch (err) {
			console.log(err);
			return setError(form, 'username', 'An unexpected error occured.');
		}

		//return form for Superform
		return { form };
	}
} satisfies Actions;
