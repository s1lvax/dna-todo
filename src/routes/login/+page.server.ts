import { prisma } from '../../lib/server/prisma';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { superValidate, setError } from 'sveltekit-superforms/server';
import type { Actions } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { loggedUser } from '../../lib/stores/UserStore';

//

const loginSchema = z.object({
	username: z.string(),
	password: z.string().min(5)
});

export const load = async () => {
	// Server API:
	const form = await superValidate(loginSchema);

	//We need to always return form in Superforms
	return { form };
};

export const actions = {
	//named default because there's just one
	default: async ({ request }) => {
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
				loggedUser.set({ username: existingUser.username, userid: existingUser.id }); // Set the loggedUser store with username and userid
				throw redirect(301, '/dashboard');
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