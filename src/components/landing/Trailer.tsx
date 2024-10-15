import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clapperboard, ChevronRight } from "lucide-react";

export default function Trailer() {
  return (
    <section className="container mx-auto my-8">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 p-4 vertical-line max-lg:border-0">
          <div className="flex flex-col items-center">
            <p className="mx-auto text-gray-200 italic text-wrap w-[400px] mx-auto mt-12 text-center content-fit">
              Become the Shogun. Rule ancient Japan in this epic blockchain game. Build and lead your army, attack the
              castle and claim your destiny!
            </p>
            <Link href="/dashboard" className="my-8">
              <div className="space-x-4">
                <Button className="play-btn bg-yellow-600 text-white hover:bg-gray-600">
                  PLAY NOW
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-4">
          <div className="px-4 lg:px-6 flex flex-col">
            <p className="mx-auto text-gray-200 text-wrap mt-12 text-center italic">
              Set in the Edo period of Japan, the goal of Shogun is to seize control of Edo Castle. Real-time weather
              conditions in Tokyo (historically Edo) directly impact gameplay and strategy. For example, rain hinders
              cavalry charges but strengthens infantry, while clear skies provide a bonus to cavalry, enhancing their
              effectiveness in battle.
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
          </div>
        </div>
      </div>
    </section>
  );
}
