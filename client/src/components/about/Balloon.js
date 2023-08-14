// Balloon.js
import React from "react";
import { motion } from "framer-motion";

const Balloon = ({ onClick }) => {
  return (
    <motion.div
      className="balloon cursor-pointer text-4xl"
      onClick={onClick}
      whileHover={{ scale: 1.2 }}
    >
      🎈
    </motion.div>
  );
};

export default Balloon;
