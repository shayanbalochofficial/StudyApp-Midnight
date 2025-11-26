import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AnimatedContent = () => {
  return (
    <motion.div
      className="z-10 backdrop-blur-lg bg-black/30 p-8 rounded-2xl shadow-2xl max-w-3xl w-full"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      <motion.h1
        className="text-5xl md:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 0, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Elevate Your Study Game
      </motion.h1>
      <motion.p
        className="text-xl md:text-2xl mb-12 text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Streamline your tasks, boost productivity, and conquer your exams with
        our premium student-focused tools.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
      >
        <Button
          asChild
          size="lg"
          className="text-lg px-8 py-6 rounded-full bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
        >
          <Link href="/todo">Get Started</Link>
        </Button>
        <Button
          asChild
          size="lg"
          className="text-lg px-8 py-6 rounded-full border-2 hover:bg-white/10 transition-all duration-300"
        >
          <Link href="/countdown">View Countdown</Link>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedContent;
