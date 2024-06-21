import {Container, Stack} from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import Post from "../components/Post";
import {IPost, PostData} from "../model/post";
import {IPostComment} from "../model/postComment";

export type FeedProps = {
  posts: PostData[]
};

const Feed: NextPage<FeedProps> = ({posts}) => {
  return (
    <>
      <Head>
        <title>Fanvue - Feed - Explore your most recent posts</title>
      </Head>
      <main>
        <Container>
          <h1>Feed</h1>
          <Stack spacing={2}>
            {posts.map((post: PostData) => (
              <Post key={`${post.id}_${post.userId}`} data={post}/>
            ))}
          </Stack>
        </Container>
      </main>
    </>
  );
};

export async function getServerSideProps() {
  const postResponse = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts: IPost[] = await postResponse.json();
  const postsWithComments = await Promise.all(
    posts.map(async (post: IPost) => {
      const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
      const comments: IPostComment[] = await commentsResponse.json()
      return {
        ...post,
        comments: comments,
        commentsCount: comments.length
      }
    })
  )
  return {
    props: {
      posts: postsWithComments
    },
  };
}

export default Feed;
