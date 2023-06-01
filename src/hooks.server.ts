import type { Handle } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

//this hook runs everytime SvelteKit detects a request
export const handle: Handle = async ({ event, resolve }) => {
	//get session from the browser
	const session = event.cookies.get('session');

	//if there's no session, just return the event
	if (!session) {
		return await resolve(event);
	}

	//if there is a session, find the user in the db via the token
	const user = await prisma.user.findUnique({
		where: { userAuthToken: session },
		//just get the username, we don't want to return passwords
		select: { username: true }
	});

	if (user) {
		//populate the events local with the username so that we can use it everywhere on the project
		event.locals.user = {
			username: user.username
		};
	}

	return await resolve(event);
};
