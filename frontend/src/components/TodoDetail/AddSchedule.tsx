import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { MobileDatePicker, MobileTimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import React from "react";
import { AnimatePresence, Variant, Variants, motion } from "framer-motion";
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
  const addSchedule = () => {};
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
        <TextField defaultValue="Do Your todo!" label="Schedule Title" />
        <Stack direction="row" spacing={2}>
          <MobileTimePicker
            defaultValue={moment()}
            className="flex-1"
            label="Time"
          />
          <MobileDatePicker
            defaultValue={moment().add(1, "day")}
            className="flex-1"
            label="Date"
            minDate={moment()}
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
