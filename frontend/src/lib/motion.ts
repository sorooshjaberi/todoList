import { Variants } from "framer-motion";
export const motionVariants: Variants = {
  left10: {
    x: -10,
  },
  swipFromLeft10: {
    x: 0,
    transition: {
      stiffness: 1000, type : "spring"
    },
  },
};
