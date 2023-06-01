import type { Actions } from './$types';
import { prisma } from '../../lib/server/prisma';
import { fail } from '@sveltejs/kit';

export const actions = {
	//named default because there's just one
	default: async ({ request }) => {
		const { username, email, password, confirmPassword } = Object.fromEntries(
			await request.formData()
		) as { username: string; email: string; password: string; confirmPassword: string };

		//user already exists
		const existingUser = await prisma.user.findUnique({
			where: {
				username: username
			}
		});
		if (existingUser) {
			return fail(400, { alreadyExists: true });
		}

		//passwords don't match
		if (password !== confirmPassword) {
			return fail(400, { noMatch: true });
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
			return fail(500, { message: 'Could not create the user.' });
		}

		//return 201
		return {
			status: 201
		};
	}
} satisfies Actions;
