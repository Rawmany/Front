import { FC } from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { isDefined } from "@/utils";

type Props = {
  image?: string;
};

const UserImage: FC<Props> = ({ image }) => {
  if (isDefined(image)) {
    const imageUrl = new URL("/assets" + image, import.meta.url).href;
    return <Avatar src={imageUrl} />;
  }

  return <Avatar icon={<UserOutlined />} />;
};

export default UserImage;
