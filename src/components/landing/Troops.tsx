import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import arc from "../../../images/troops_arc.png";
import inf from "../../../images/troops_inf.png";
import cav from "../../../images/troops_cav.png";

export default function Troops() {
  return (
    <section className="text-center mt-12 mb-12 py-8" id="troops">
      <h3 className="text-2xl font-bold text-gray-300 tracking-widest mt-8 mb-8">TROOPS</h3>
      <div className="flex flex-col lg:flex-row justify-around">
        <div className="flex justify-center max-lg:mb-4">
          <Card className="bg-gray-800 border-gray-700 cursor-pointer hover:scale-105 w-[310px]">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">ARCHERS</h3>
              <Image src={arc} width={250} height={250} quality={100} placeholder="blur" alt="Troops" />
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center max-lg:mb-4">
          <Card className="bg-gray-800 border-gray-700 cursor-pointer hover:scale-105 w-[310px]">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">INFANTRY</h3>
              <Image src={inf} width={250} height={250} quality={100} placeholder="blur" alt="Troops" />
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-center">
          <Card className="bg-gray-800 border-gray-700 cursor-pointer hover:scale-105 w-[310px]">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">CAVALRY</h3>
              <Image src={cav} width={250} height={250} quality={100} placeholder="blur" alt="Troops" />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
