import { FC, ReactElement } from "react";
import { isDefined } from "@/utils";

import "./index.css";

type Props = {
  error: string | null;
  children: ReactElement;
};

const ErrorBoundary: FC<Props> = ({ error, children }) => {
  if (isDefined(error)) {
    console.log(error);
    return (
      <div className="error">
        <div className="title">Something went wrong...</div>
        <div className="content">
          We are aware of the issue and are already working on it. Try
          refreshing the page or try again later.
        </div>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;
