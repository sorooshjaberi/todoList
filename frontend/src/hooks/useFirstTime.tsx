import { useEffect, useState } from "react";

const useFirstTime = () => {
  const [firstTime, setFirstTime] = useState(true);
  useEffect(() => {
    setFirstTime(false);
  }, []);
  return firstTime
};

export default useFirstTime
