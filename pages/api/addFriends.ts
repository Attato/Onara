import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

// Функция для добавления друга в базу данных
export default async function addFriend(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const { selectedFriends, userId } = req.body;

	console.log(selectedFriends);

	try {
		const newFriends = selectedFriends.map(async (friend: any) => {
			const newFriend = await prisma.friend.create({
				data: {
					id: friend.id,
					name: friend.login,
					image: friend.image,
					htmlUrl: friend.htmlUrl,
				},
			});
			await prisma.user.update({
				where: { id: userId },
				data: {
					friends: {
						connect: { id: newFriend.id },
					},
				},
			});
			return newFriend;
		});

		await Promise.all(newFriends);

		res.status(201).json({ message: 'Friends added successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Something went wrong' });
	}
}
