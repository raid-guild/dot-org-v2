import React, { useContext, useMemo, useState, createContext } from 'react';

const JoinContext = createContext(null as any);

type Props = {
  children: React.ReactNode;
};

const defaultState = {
  stage1: {},
  stage2: {},
  stage3: {},
  stage4: {},
  stage5: {},
  stage6: {},
  stage7: {},
};

const JoinContextProvider = ({ children }: Props) => {
  const [joinState, setJoinState] = useState<any>(defaultState);

  const contextState = useMemo(
    () => ({
      joinState,
      setJoinState,
    }),
    [joinState],
  );
  return <JoinContext.Provider value={contextState}>{children}</JoinContext.Provider>;
};

const useJoinState = (): any => {
  return useContext(JoinContext);
};

export { useJoinState, JoinContextProvider };
