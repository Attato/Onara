import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function addPosts(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const { title, content } = req.body;

	console.log(title, content);

	try {
		const newPost = await prisma.post.create({
			data: {
				title: title,
				content: content,
			},
		});

		const userId = 'user_id_here';

		await prisma.user.update({
			where: { id: userId },
			data: {
				posts: {
					connect: { id: newPost.id },
				},
			},
		});

		const posts = await prisma.post.findMany();

		res.status(201).json({ message: 'Posts added successfully', posts });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Something went wrong' });
	}
}
