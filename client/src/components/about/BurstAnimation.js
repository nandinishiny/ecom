// BurstAnimation.js
import React from "react";
import { motion } from "framer-motion";

const BurstAnimation = ({ x, y }) => {
  return (
    <motion.div
      className="burst-animation absolute text-4xl"
      initial={{ opacity: 0, scale: 0.2 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.2 }}
      style={{ left: x, top: y }}
    >
      💥
    </motion.div>
  );
};

export default BurstAnimation;
