import {
  Accordion, AccordionDetails, AccordionSummary,
  Card, CardActions, CardContent, CardHeader, Divider, Stack, Typography
} from "@mui/material";
import {Comment} from "./Comment";
import React from "react";
import { PostData } from '../model/post'

export type PostProps = {
  data: PostData
}

const Post = ({data}: PostProps) => {
  return (
    <Card component={"article"}>
      <CardHeader title={data.title} />
      <CardContent>
        <Typography variant="body1">{data.body}</Typography>
      </CardContent>
      <CardActions>
        <Accordion>
          <AccordionSummary>
            {data.commentsCount} Comments
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2} divider={<Divider />}>
              {data.comments.map((comment) => (
                <Comment key={`${comment.id}_${comment.postId}`} data={comment}/>
              ))}
            </Stack>
          </AccordionDetails>
        </Accordion>
      </CardActions>
    </Card>
  )
}

export default Post
