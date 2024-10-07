import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Help() {
  return (
    <>
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-indigo-500">Help Center</h2>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 text-indigo-500">Frequently Asked Questions</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I start playing Shogun?</AccordionTrigger>
                  <AccordionContent>
                    To start playing Shogun, connect your Aptos wallet, choose a general's name, and mobilize your
                    initial army. Once you're set up, you can begin attacking the Castle and defending, when you are the
                    King.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How does the ranking system work?</AccordionTrigger>
                  <AccordionContent>
                    Players earn ranking points through successful attacks and defenses. Rankings are updated in
                    real-time and determine your position on the leaderboard.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What are the different types of troops?</AccordionTrigger>
                  <AccordionContent>
                    There are three types of troops: Archers, Infantry, and Cavalry. Each has its strengths and
                    weaknesses.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 text-indigo-500">Game Documentation</h3>
              <p className="mb-4">
                For more detailed information about game mechanics, strategies, and updates, please refer to our
                comprehensive documentation.
              </p>
              <Link href="#" passHref>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Full Documentation
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 text-indigo-500">Need More Help?</h3>
              <p className="mb-4">If you can't find the answer to your question, our support team is here to help.</p>
              <Link href="#" passHref>
                <Button className="bg-green-600 hover:bg-green-700 text-white">Contact Support</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
