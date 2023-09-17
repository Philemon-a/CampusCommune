import Spaces from "../mypages/layout/Spaces";
import MainContent from "../mypages/layout/MainContent";
import News from "@/mypages/news/News";

export default function Home() {
  return (
    <>
    <div className="w-full h-screen bg-neutral-300 overflow-x-hidden ">
      <div className="lg:px-36 h-full md:px-16 sm:px-12 px-3 w-full flex flex-row gap-2 items-start overflow-x-hidden mt-20">
        <Spaces />
        <MainContent />
        <News />
      </div>
    </div>
    </>
  );
}
