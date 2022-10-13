import { FC } from "react";
import { useRecoilValue } from "recoil";
import { userIdState } from "@/store/atoms/users.atom";
import { dispatcherState } from "@/store/atoms/dispatcher.atom";
import { Button, Comment, Form, Input } from "antd";
import React, { useState } from "react";

import UserImage from "@/atoms/UserImage";

const { TextArea } = Input;

type Props = {
  image?: string;
};

interface EditorProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  loading: boolean;
  value: string;
}

const Editor = ({ onChange, onSubmit, loading, value }: EditorProps) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={loading}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const Reply: FC<Props> = ({ image }) => {
  const dispatcher = useRecoilValue(dispatcherState);
  const userId = useRecoilValue(userIdState);
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState("");

  const addNewComment = async () => {
    setLoading(true);

    try {
      await fetch(`${import.meta.env.VITE_REACT_APP_BASE_URL}/api/json/message`, {
        method: "POST",
        body: JSON.stringify({
          message: value,
          author: userId,
        }),
      });
      const messagesResponse = await fetch(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/json/messages`
      );
      const {
        answer: { messages },
      } = await messagesResponse.json();
      dispatcher?.setMessages(messages);
      setValue('');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatcher?.setGlobalError(error as string);
    }
  };

  const handleSubmit = () => {
    if (!value) return;

    addNewComment();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <>
      <Comment
        avatar={<UserImage image={image} />}
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            value={value}
            loading={loading}
          />
        }
      />
    </>
  );
};

export default Reply;
