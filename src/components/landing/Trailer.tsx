import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clapperboard } from "lucide-react";

export default function Trailer() {
  return (
    <section className="px-4 lg:px-6 bg-gray-600 flex flex-col">
      <p className="mx-12 text-gray-200 text-wrap mt-12 text-center">
        Set in the Edo period of Japan, the goal of Shogun is to seize control of Edo Castle. Real-time weather
        conditions in Tokyo (historically Edo) directly impact gameplay and strategy. For example, rain hinders cavalry
        charges but strengthens infantry, while clear skies provide a bonus to cavalry, enhancing their effectiveness in
        battle.
      </p>
      <Link
        href="https://docs.google.com/presentation/d/1_kaBOHJYrla37QkE0ULctqczXNHMIzlF2S5T-EypB7c/edit?usp=sharing"
        target="_blank"
        className="mx-auto mt-4 mb-4"
      >
        <Button className="bg-indigo-500 hover:bg-gray-500 focus-visible:outline-indigo-600 p-2">
          <p>WATCH TRAILER</p>
          <Clapperboard className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </section>
  );
}
