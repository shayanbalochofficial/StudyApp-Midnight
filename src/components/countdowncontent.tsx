"use client";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
const targetDate = new Date("2026-05-06T00:00:00");
function calculateTimeLeft() {
  const difference = +targetDate - +new Date();

  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  // vibe coding
  return timeLeft;
}

const countdowncontent = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  return <motion.div></motion.div>;
};

export default countdowncontent;
