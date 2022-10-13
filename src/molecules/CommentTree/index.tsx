import { FC, Fragment } from "react";

import { useRecoilValue } from "recoil";

import { userState } from "@/store/atoms/users.atom";
import { Message } from "@/store/models";

import UserComment from "@/atoms/Comment";

type Props = {
  comment: Message;
};

const CommentTree: FC<Props> = ({ comment }) => {
  const user = useRecoilValue(userState(comment.author));
  const fullName = decodeURIComponent(`${user.name} ${user.surname}`);

  const nestedComments = (comment.children || []).map((comment, index) => {
    return <CommentTree key={index + Math.random()} comment={comment} />;
  });

  return (
    <Fragment>
      <UserComment
        timestamp={comment.timestamp}
        fullName={fullName}
        text={comment.message}
        image={user.image}
      >
        {nestedComments}
      </UserComment>
    </Fragment>
  );
};

export default CommentTree;
