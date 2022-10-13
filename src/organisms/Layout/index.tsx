import { FC, useEffect, useCallback, useState, Fragment } from "react";
import { useRecoilValue } from "recoil";
import { cloneDeep } from "lodash";

import { Spin } from "antd";

import { dispatcherState } from "@/store/atoms/dispatcher.atom";
import { messagesState } from "@/store/atoms/messages.atom";
import { userState, userIdState } from "@/store/atoms/users.atom";
import { globalErrorState } from "@/store/atoms/error.atom";
import { createCommentTree } from "@/utils";

import CommentTree from "@/molecules/CommentTree";
import Reply from "@/atoms/Reply";
import ErrorBoundary from "@/atoms/Error";

import "./index.css";

const Layout: FC = () => {
  const dispatcher = useRecoilValue(dispatcherState);
  const [loading, setLoading] = useState<boolean>(true);

  const messages = useRecoilValue(messagesState);
  const currentId = useRecoilValue(userIdState);
  const user = useRecoilValue(userState(currentId as string));
  const error = useRecoilValue(globalErrorState);

  const comments = createCommentTree(cloneDeep(messages));

  const fetchUsers = useCallback(async () => {
    try {
      const usersResponse = await fetch(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/json/users`
      );
      const {
        answer: { users },
      } = await usersResponse.json();
      dispatcher?.setUsers(users);
    } catch (error) {
      dispatcher?.setGlobalError(error as string);
    }
  }, [dispatcher]);

  const fetchMessages = useCallback(async () => {
    try {
      const messagesResponse = await fetch(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/json/messages`
      );
      const {
        answer: { messages },
      } = await messagesResponse.json();
      dispatcher?.setMessages(messages);
    } catch (error) {
      dispatcher?.setGlobalError(error as string);
    }
  }, [dispatcher]);

  const fetchCurrentUserId = useCallback(async () => {
    try {
      const currentIdResponse = await fetch(
        `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/json/me`
      );
      const {
        answer: {
          me: { id },
        },
      } = await currentIdResponse.json();
      dispatcher?.setCurrentUserId(id);
    } catch (error) {
      dispatcher?.setGlobalError(error as string);
    }
  }, [dispatcher]);

  const fetchData = useCallback(async () => {
    try {
      await Promise.all([fetchUsers(), fetchMessages(), fetchCurrentUserId()]);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  }, [fetchUsers, fetchMessages, fetchCurrentUserId]);

  useEffect(() => {
    if (dispatcher) {
      fetchData();
    }
  }, [dispatcher, fetchData]);

  if (loading) {
    return (
      <div className="container">
        <Spin spinning={loading} />
      </div>
    );
  }

  return (
    <ErrorBoundary error={error}>
      <Fragment>
        {comments.map((comment, index) => (
          <CommentTree key={index + Math.random()} comment={comment} />
        ))}
        <Reply image={user?.image} />
      </Fragment>
    </ErrorBoundary>
  );
};

export default Layout;
