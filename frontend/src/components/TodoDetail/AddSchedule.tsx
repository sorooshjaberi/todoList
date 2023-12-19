import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { MobileDatePicker, MobileTimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import React, { useRef, useState } from "react";
import { AnimatePresence, Variant, Variants, motion } from "framer-motion";
import useCreateSchedule from "../../hooks/todos/useCreateSchedule";
import { useTodoHandler } from "../../providers/TodoHandler";
type Props = { toggleSchedule(): void };

const scheduleBoxVariants: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  show: {
    height: "auto",
    opacity: 1,
  },
};

const AddSchedule = (props: Props) => {
  const { toggleSchedule } = props;
  const { mutateAsync: createSchedule } = useCreateSchedule();
  const { currentTodo } = useTodoHandler();
  const [time, setTime] = useState<ReturnType<typeof moment>>(moment());
  const [date, setDate] = useState<ReturnType<typeof moment>>(
    moment().add("1", "day"),
  );
  const [scheduleText, setScheduleText] = useState<string>("Do Your todo!");
  const addSchedule = () => {
    const wholeDate = moment({
      year: date.year(),
      month: date.month(),
      date: date.date(),
      hour: time.hour(),
      minute: time.minute(),
      second: 0,
    });
    const timeInMs = wholeDate.toDate().getTime();
    createSchedule({ scheduleText, time: timeInMs, todoId: currentTodo }).then(
      () => {
        toggleSchedule();
      },
    );
  };

  return (
    <Box
      component={motion.div}
      exit="hidden"
      initial="hidden"
      animate="show"
      variants={scheduleBoxVariants}
      className="text-[1.2rem]"
    >
      <Typography component="h3" className="py-4" variant="h5">
        Create Schedule
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Schedule Title"
          value={scheduleText}
          onChange={(e) => {
            setScheduleText(e.target.value);
          }}
        />
        <Stack direction="row" spacing={2}>
          <MobileTimePicker
            className="flex-1"
            label="Time"
            value={time}
            onChange={setTime}
          />
          <MobileDatePicker
            className="flex-1"
            label="Date"
            minDate={moment()}
            value={date}
            onChange={setDate}
          />
        </Stack>
      </Stack>
      <Box className="flex items-center justify-end gap-2 py-4">
        <Button
          className="w-[6rem]"
          color="inherit"
          variant="contained"
          onClick={toggleSchedule}
        >
          Discard
        </Button>
        <Button
          className="w-[6rem]"
          color="error"
          variant="contained"
          onClick={addSchedule}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};

export default AddSchedule;
