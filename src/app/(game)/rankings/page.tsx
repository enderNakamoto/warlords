import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import cover from "../../../../images/samurai_rank.png";
import shogun from "../../../../images/shogun.png";

export default function Rankings() {
  const playerRankings = [
    { name: "Oda Nobunaga", points: 1500 },
    { name: "Tokugawa Ieyasu", points: 1450 },
    { name: "Date Masamune", points: 1400 },
    { name: "Uesugi Kenshin", points: 1350 },
    { name: "Takeda Shingen", points: 1300 },
  ];

  return (
    <>
      <div className="text-center">
        <div className="flex justify-center items-center">
          <Image
            src={shogun}
            width={125}
            height={50}
            quality={100}
            placeholder="blur"
            alt="Shogun Text"
            className="rounded-lg mr-2"
          />
          <h1 className="text-3xl font-bold"> : Rise of Empires</h1>
        </div>
        <Image
          src={cover}
          width={400}
          height={200}
          quality={100}
          placeholder="blur"
          alt="Shogun Banner"
          className="mx-auto rounded-lg"
        />
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold mb-4 text-indigo-400">Player Rankings</h3>
          <div className="space-y-4">
            {playerRankings.map((player, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-white mr-2">{index + 1}.</span>
                  <span className="text-md text-white">{player.name}</span>
                </div>
                <span className="text-xl font-bold text-indigo-500">{player.points} pts</span>
              </div>
            ))}
          </div>
          <p className="my-4">...</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-lg font-semibold text-white mr-2">99.</span>
              <span className="text-md text-white">Obi-Wan Kenobi ( You )</span>
            </div>
            <span className="text-xl font-bold text-indigo-500">250 pts</span>
          </div>
        </CardContent>
      </Card>
      <hr />
    </>
  );
}
