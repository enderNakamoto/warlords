import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../images/shogun_japan.png";

export default function Header() {
  return (
    <header className="px-4 lg:px-6 flex items-center bg-gray-800">
      <Link href="#">
        <div className="flex items-center">
          <Image src={logo} width={75} height={75} quality={100} alt="Shogun logo" className="mr-2" />
          <h1 className="text-xl font-bold text-gray-400 hover:text-white">Shogun</h1>
        </div>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 mr-12">
        <Link className="text-md font-medium hover:underline underline-offset-4" href="#waitlist">
          Waitlist
        </Link>
        <Link className="text-md font-medium hover:underline underline-offset-4" href="#features">
          Features
        </Link>
        <Link className="text-md font-medium hover:underline underline-offset-4" href="#troops">
          Troops
        </Link>
        <Link className="text-md font-medium hover:underline underline-offset-4" href="#weather">
          Weather
        </Link>
      </nav>
      <Link href="/dashboard">
        <Button className="play-btn bg-indigo-500 hover:bg-gray-500 focus-visible:outline-indigo-600 w-24 p-2">
          <p className="play-txt">PLAY</p>
        </Button>
      </Link>
    </header>
  );
}
