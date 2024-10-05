import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Landing() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <h1 className="display">WELCOME TO SHOGUN</h1>
      <Link href="/game">
        <Button className="bg-indigo-500 hover:bg-gray-300 focus-visible:outline-indigo-600 w-32">GO TO GAME</Button>
      </Link>
    </div>
  );
}
