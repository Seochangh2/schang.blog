import React from "react";
import { motion } from "framer-motion";
import { pageEffect } from "../styles/animation";
type WarpperProps = {
  children: JSX.Element;
};
const Wrapper = ({ children, ...rest }: WarpperProps) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      transition={{ duration: 0.3 }}
      variants={pageEffect}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default Wrapper;
