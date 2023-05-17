import React from 'react';
import {Metadata} from "next";

type Props = {
	params: {
		id: string
	}
}

async function getData(id: string) {
	const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
		next: {
			// запрос будет происходить раз в минуту
			revalidate: 60,

		}
	})
	return response.json()
}

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata > {
	const post = await getData(id)
	return {
		title: post.title,
	}
}

const  Post = async ({ params: { id } }: Props) => {
	const post = await getData(id)
	return (
		<div>
			Post {id}
			<h1>{post.title}</h1>
			<p>{post.body}</p>
		</div>
	);
};

export default Post;