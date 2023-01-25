import React, { useContext, useMemo, useState, createContext } from 'react';

const AppContext = createContext(null as any);

type Props = {
  children: React.ReactNode;
};

const defaultJoinState = {
  join1: {},
  join2: {},
  join3: {},
  join4: {},
  join5: {},
  join6: {},
};

const defaultHireState = {
  hire1: {},
  hire2: {},
  hire3: {},
  hire4: {},
  eth_address: '',
};

const AppContextProvider = ({ children }: Props) => {
  const [joinState, setJoinState] = useState<any>(defaultJoinState);
  const [hireState, setHireState] = useState<any>(defaultHireState);

  const contextState = useMemo(
    () => ({
      joinState,
      setJoinState,
      hireState,
      setHireState,
    }),
    [joinState, hireState],
  );
  return <AppContext.Provider value={contextState}>{children}</AppContext.Provider>;
};

const useJoinState = (): any => {
  return useContext(AppContext);
};

const useHireState = (): any => {
  return useContext(AppContext);
};

export { useJoinState, useHireState, AppContextProvider };
