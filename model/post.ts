import {IPostComment} from "./postComment";

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type PostData = {
  comments: IPostComment[];
  commentsCount: number;
} & IPost
