import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-black/50 backdrop-blur-md fixed top-0 left-0 right-0 z-50 ">
      <nav className="">
        <Link>StudyPro</Link>
        <div>
          <Button>
            <Link>To-do</Link>
          </Button>
          <Button>
            <Link>Countdown</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
