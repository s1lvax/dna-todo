import { prisma } from '../../lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate, setError } from 'sveltekit-superforms/server';
import type { Actions } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import type { PageServerLoad } from './$types';

//

const loginSchema = z.object({
	username: z
		.string()
		.min(3)
		.max(20)
		.refine((value) => /^[a-zA-Z0-9]+$/.test(value), {
			message: 'Username must contain only letters and numbers.'
		}),
	password: z.string().min(5).max(30)
});

export const load: PageServerLoad = async ({ locals }) => {
	//if user is logged in, go to dashboard
	if (locals.user) {
		throw redirect(302, '/dashboard');
	}
	// Server API:
	const form = await superValidate(loginSchema);

	//We need to always return form in Superforms
	return { form };
};

export const actions: Actions = {
	//named default because there's just one
	default: async ({ request, cookies }) => {
		//validate form using Zod
		const form = await superValidate(request, loginSchema);
		//return the error
		if (!form.valid) {
			return fail(400, { form });
		}

		//get data from form
		const { username, password } = form.data as {
			username: string;
			password: string;
		};

		//fetch user from the DB
		const existingUser = await prisma.user.findUnique({
			where: {
				username: username
			}
		});
		//if user exists, compare passwords, if not -> error
		if (existingUser) {
			//bcrypt's password check
			const passwordCheck = bcrypt.compareSync(password, existingUser.encryptedPassword);
			//if it returns true, redirect user, if not -> error
			if (passwordCheck) {
				//if login is correct, generate new uuid
				const authenticatedUser = await prisma.user.update({
					where: { username: existingUser.username },
					data: { userAuthToken: crypto.randomUUID() }
				});

				//create cookie
				cookies.set('session', authenticatedUser.userAuthToken, {
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
					secure: process.env.NODE_ENV == 'production',
					maxAge: 60 * 60 * 24 * 30
				});
				//after cookie creation, forward user
				throw redirect(302, '/dashboard');
			} else {
				return setError(form, 'password', 'Incorrect password.');
			}
		} else {
			return setError(form, 'username', 'This username does not exist.');
		}

		//return form for Superform
		return { form };
	}
} satisfies Actions;
