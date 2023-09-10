import { useEffect } from 'react';
import { useRecoilState as useRState } from 'recoil';

export const usePersistentRecoilState = (context) => {
  const con = context();
  const [state, setState] = useRState(con);

  useEffect(() => {
    const localStorageKey = con.key;
    localStorage.setItem(localStorageKey, JSON.stringify(state));
  }, [state, setState]);

  return [state, setState];
};
