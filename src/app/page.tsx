import dynamic from "next/dynamic";
import React from "react";

const AnimatedContent = dynamic(() => import("@/components/AnimatedContent"), {
  ssr: false,
});

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-purple-900 via-indigo-900 to-black opacity-50" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <AnimatedContent />
    </div>
  );
};

export default page;
