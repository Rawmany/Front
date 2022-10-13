import { useRef, useEffect, FC } from "react";
import { useSetRecoilState } from "recoil";
import { dispatcherState } from "@/store/atoms/dispatcher.atom";
import { createDispatcher, Dispatcher } from "@/store/dispatchers";

import Layout from "@/organisms/Layout";

type Props = {
  dispatchRef?: (...args: any[]) => any;
};

const Entry: FC<Props> = ({ dispatchRef = () => {} }) => {
  const setDispatcher = useSetRecoilState(dispatcherState);
  const dispatcherRef = useRef<Dispatcher>(createDispatcher());

  useEffect(() => {
    setDispatcher(dispatcherRef.current);
    dispatchRef(dispatcherRef.current);
  }, [dispatchRef, setDispatcher]);
  return <Layout />;
};

export default Entry;
