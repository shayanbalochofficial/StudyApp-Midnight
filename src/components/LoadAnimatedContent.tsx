"use client";
import dynamic from "next/dynamic";

const AnimatedContent = dynamic(() => import("./AnimatedContent"), {
  ssr: false,
  loading: () => <p className="text-white text-2xl">Loading...</p>,
});

export default function LoadAnimatedContent() {
  return <AnimatedContent />;
}
