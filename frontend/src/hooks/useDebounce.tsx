import { useEffect, useState } from "react";
import deepEqual from "deep-equal";
const useDebounce = (value: unknown, timeout: number) => {
  const [state, setState] = useState(value);

  useEffect(() => {
    const timeO = setTimeout(() => {
      if (!deepEqual(value, state)) setState(value);
    }, timeout);
    return () => {
      clearTimeout(timeO);
    };
  }, [value, timeout]);

  return state;
};

export default useDebounce;
