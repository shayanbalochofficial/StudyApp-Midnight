import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-black/50 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600"
        >
          StudyPro
        </Link>
        <div className="space-x-4">
          <Button
            asChild
            variant="ghost"
            className="text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
          >
            <Link href="/todo">To-Do</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300"
          >
            <Link href="/countdown">Countdown</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
