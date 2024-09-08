import { ScrollArea } from "@/components/ui/scroll-area";
import CvInputs from "@/components/cv-inputs";
import Cv from "@/components/cv";

export default function Home() {
  return (
    <main className="flex">
      <div className="w-[40rem] pl-6">
        <ScrollArea className="h-[90vh]">
          <CvInputs />
        </ScrollArea>
      </div>
      <div className="flex flex-col flex-grow px-4 py-3 mt-4 bg-zinc-50 mr-6 relative">
        <Cv />
      </div>
    </main>
  );
}
