import { RiHome2Line } from "react-icons/ri";
import { FaRegBell, FaRegListAlt } from "react-icons/fa";
import { FaRegPenToSquare } from "react-icons/fa6";
import { BiGroup } from "react-icons/bi";
import { Badge } from "@nextui-org/react";
import { useRouter } from "next/navigation";


const HeaderIcons = () => {
  const router = useRouter();


  return (
    <div className="md:flex flex-row items-center gap-3 hidden w-full justify-between">
      <span className="cursor-pointer">
        <RiHome2Line size={28} className="text-neutral-600" />
      </span>
      <span onClick={() => router.push("/notes")} className="cursor-pointer">
        <Badge color="primary" shape="circle" content="3">
          <FaRegListAlt size={26} className="text-neutral-600" />
        </Badge>
      </span>
      <span className="cursor-pointer">
        <Badge color="primary" shape="circle" content="5">
          <FaRegPenToSquare size={26} className="text-neutral-600" />
        </Badge>
      </span>
      <span className="cursor-pointer">
        <BiGroup size={31} className="text-neutral-600" />
      </span>
      <span className="cursor-pointer">
        <Badge color="primary" shape="circle" content="2">
          <FaRegBell size={27} className="text-neutral-600" />
        </Badge>
      </span>
    </div>
  );
};

export default HeaderIcons;
