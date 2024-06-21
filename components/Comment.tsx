import { Stack, Typography} from "@mui/material";
import {IPostComment} from "../model/postComment";

export type CommentProps = {
  data: IPostComment
}

export const Comment = ({data}: CommentProps) => {
  return (
    <Stack spacing={4}>
      <Typography variant="subtitle1">{data.name} - {data.email}</Typography>
      <Typography variant="body1">{data.body}</Typography>
    </Stack>
  );
}
