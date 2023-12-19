import { useMutation } from "@tanstack/react-query";
import React from "react";
import { createSchedule } from "../../services/todos";
import { errorToast } from "../../lib/Toastify";

type Props = {};

const useCreateSchedule = () => {
  const mutation = useMutation({
    mutationKey: ["createSchedule"],
    mutationFn: createSchedule,
    meta: {
      onError(error: Error) {
        errorToast(error.message);
      },
    },
  });
  return mutation;
};

export default useCreateSchedule;
