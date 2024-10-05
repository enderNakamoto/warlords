import { WalletSelector } from "./WalletSelector";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import logo from "../../images/shogun_logo.png";

export function Header() {
  return (
    <div className="flex items-center justify-between px-4 py-2 max-w-screen-xl mx-auto w-full flex-wrap">
      <div>
        <Image src={logo} alt="Logo" quality={100} width={70} height={70} placeholder="blur" />
        <strong>SHOGUN</strong>
      </div>
      <Link href="/">
        <Button className="bg-indigo-500 hover:bg-gray-300 focus-visible:outline-indigo-600 w-32">HOME</Button>
      </Link>
      <div className="flex gap-2 items-center flex-wrap">
        <WalletSelector />
      </div>
    </div>
  );
}
