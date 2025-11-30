"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const targetDate = new Date("2026-05-06T00:00:00");

function calculateTimeLeft(): { [key: string]: number } {
  const difference = +targetDate - +new Date();
  let timeLeft: { [key: string]: number } = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
}

export default function CountdownContent() {
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>(
    calculateTimeLeft()
  );
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timeComponents = Object.keys(timeLeft)
    .map((interval) => {
      if (!timeLeft[interval]) {
        return null;
      }

      return (
        <motion.div
          key={interval}
          className="flex flex-col items-center justify-center bg-gray-800/50 backdrop-blur-md rounded-2xl p-6 m-2 w-36 h-36 shadow-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600">
            {timeLeft[interval]}
          </span>
          <span className="text-sm md:text-base text-gray-400 mt-2 uppercase tracking-wide">
            {interval}
          </span>
        </motion.div>
      );
    })
    .filter((component) => component !== null);

  const handlePromiseClick = () => {
    toast({
      title: "You've made a promise!",
      description:
        "Remember, your future self is counting on you. Make every moment count!",
      duration: 5000,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center relative overflow-hidden">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-purple-900 via-indigo-900 to-black opacity-50" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </motion.div>

      <motion.div
        className="z-10 backdrop-blur-lg bg-black/30 p-8 rounded-2xl shadow-2xl max-w-4xl w-full"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600">
          Countdown to CAIE Exams
        </h1>
        <div className="flex flex-wrap justify-center mb-8">
          {timeComponents.length ? (
            timeComponents
          ) : (
            <span className="text-2xl text-gray-300">Time's up!</span>
          )}
        </div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="text-xl md:text-2xl text-gray-300 italic mb-6 px-4">
            "If you don't sacrifice for what you want, what you want will become
            the sacrifice."
          </p>
          {/* <Button
            onClick={handlePromiseClick}
            className="text-lg px-8 py-6 rounded-full bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
          >
            Promise me you'll do it
          </Button> */}
        </motion.div>
      </motion.div>
    </div>
  );
}
