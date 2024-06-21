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
        <meta name={"description"} content={"Your personal Fanvue's feed"}/>
        <meta name={"keywords"} content={"feed, posts, comments, creators"}/>
        <meta name={"author"} content={"Fanvue"}/>

        <meta property="og:title" content="Fanvue - Your feed"/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://www.fanvue.com"/>
        <meta property="og:image" content="favicon.png"/>
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
  // I decided to fetch comments for each post and attach them into the props
  // as the data load is being done in the server side, it should be faster than doing it from client
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
