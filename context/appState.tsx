import React, { useContext, useMemo, useState, createContext } from 'react';

const AppContext = createContext(null as any);

type Props = {
  children: React.ReactNode;
};

const defaultState = {
  join1: {},
  join2: {},
  join3: {},
  join4: {},
  join5: {},
  join6: {},
};

const AppContextProvider = ({ children }: Props) => {
  const [joinState, setJoinState] = useState<any>(defaultState);

  const contextState = useMemo(
    () => ({
      joinState,
      setJoinState,
    }),
    [joinState],
  );
  return <AppContext.Provider value={contextState}>{children}</AppContext.Provider>;
};

const useJoinState = (): any => {
  return useContext(AppContext);
};

export { useJoinState, AppContextProvider };
