// About.js
import React from "react";
import { motion } from "framer-motion";
import Confetti from 'react-confetti'

function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.5, duration: 1.5 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { delay: 1, duration: 1 } },
  };

  return (
    <motion.div
      className="about-container text-center h-screen flex flex-col items-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Confetti
       width={innerWidth} height={innerHeight} gravity={0.58} friction={0.99} tweenDuration={5000} recycle={false} />
      <motion.h2
        className="text-3xl font-bold mb-4"
        variants={textVariants}
      >
        Welcome!
          I am Nandini Divity
      </motion.h2>
      <motion.p className="text-lg mb-4 " variants={textVariants}>
        It is a just a small website for learning purpose
      </motion.p>
      <motion.a
        href="https://github.com/nandinishiny/ecom.git"
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg bg-yellow-500 p-2 cursor-pointer mb-4 rounded-md w-40 font-bold" variants={textVariants}
      >GitHub Link
      </motion.a>
      <motion.a
        href="https://www.linkedin.com/in/nandinidivity"
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg bg-blue-500 p-2 cursor-pointer mb-4 rounded-md font-bold" variants={textVariants}
      >LinkedIn</motion.a>
    </motion.div>
  );
}

export default About;
