import { Message } from "@/store/models";

export function createCommentTree(messages: Message[]) {
  const map = new Map<number, Message>();

  messages.forEach((comment) => map.set(comment.id, comment));

  messages.forEach((comment) => {
    comment.message = decodeURIComponent(comment.message);
    if (comment.replyTo !== 0) {
      const parent = map.get(comment.replyTo);
      if (parent) {
        (parent.children = parent.children || []).push(comment);
      }
    }
  });

  return messages.filter((comment) => {
    return comment.replyTo === 0;
  });
}

export const isDefined = <T>(value: T | undefined | null): value is T => {
  return (value as T) !== undefined && (value as T) !== null;
};
