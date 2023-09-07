import { DiscussionType } from "@/types"
import { IconType } from "react-icons";
import { categoryIcon, categoryColor } from "../CategoryColor";

const CatIconWrapper = ({ category, size }: { category: string[], size: number }) => {
    const CatIcon = categoryIcon[category[0] as keyof typeof categoryIcon] as IconType;
    const catColor = categoryColor[category[0] as keyof typeof categoryColor] as string;

    return <CatIcon size={size} color={catColor} />;
};

const DiscussionSidebarItem = ({
    discussion,
    index
}: {
    discussion: DiscussionType
    index: number
}) => {

    return (
        <div
            key={discussion.title}
            className={`flex items-center px-2 py-3 cursor-pointer text-gray-900 
            rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}>
            <CatIconWrapper category={discussion.category} size={20} />
            <span className="ml-3 text-[13px]">{discussion.title}</span>
        </div>
    )
}


export default DiscussionSidebarItem;