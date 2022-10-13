import { FC, Fragment } from "react";
import { Comment, Tooltip } from "antd";

import { format } from "date-fns";

import UserImage from "@/atoms/UserImage";

type Props = {
  image?: string;
  fullName: string;
  text: string;
  timestamp: number;
  children?: JSX.Element | JSX.Element[];
};

const UserComment: FC<Props> = ({
  image,
  fullName,
  text,
  timestamp,
  children,
}) => {
  const actions = [<span key="comment-basic-reply-to">Reply to</span>];
  const date = format(new Date(timestamp * 1000), "dd.MM.yyyy HH:mm:ss");

  return (
    <Fragment>
      <Comment
        actions={actions}
        author={<span>{fullName}</span>}
        avatar={<UserImage image={image} />}
        content={<p>{text}</p>}
        datetime={
          <Tooltip title={date}>
            <span>{date}</span>
          </Tooltip>
        }
      >
        {children}
      </Comment>
    </Fragment>
  );
};

export default UserComment;
