import React, { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type Props = { motionProps?: HTMLMotionProps<"div">; children: ReactNode };

const TranslateL2RSmall = (props: Props) => {
  return (
    <motion.div
      {...props.motionProps}
      initial={{
        x: -10,
        ...(typeof props.motionProps?.initial === "object"
          ? props.motionProps?.initial
          : {}),
      }}
      animate={{
        x: 0,
        ...(typeof props.motionProps?.animate === "object"
          ? props.motionProps?.animate
          : {}),
      }}
      transition={{
        ...(typeof props.motionProps?.transition === "object"
          ? props.motionProps?.transition
          : {}),
      }}
    >
      {props.children}
    </motion.div>
  );
};

export default TranslateL2RSmall;
