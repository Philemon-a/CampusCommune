import { QuestionType } from "@/types";
import { QuestionBulb } from "@/svgs";
import { IoIosArrowForward } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { BsDot } from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegPenToSquare } from "react-icons/fa6";
import { IoIosWifi } from "react-icons/io";
import { TbPencilOff } from "react-icons/tb";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button } from "@nextui-org/react";
import AnswerModal from "@/modals/answerModal/AnswerModal";
import { db } from "@/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";


const QuestionItem: React.FC<QuestionType> = ({
  author_id,
  author_name,
  text,
  answers,
  followers,
  pass,
  created_at,
  author_email,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [answer, setAnswer] = useState<string>("");
  const answersCollectionRef = collection(db, "answers");
  const [answerCount, setAnswerCount] = useState<number>(answers?.length || 0);

  const handleSubmit = useCallback(async () => {
    if (answer.length === 0) return;

    const answerObj = {
      author_name: author_name,
      author_email: author_email,
      question_text: text,
      text: answer,
      created_at: new Date(),
      topic: "General",
    };

    try {
      await addDoc(answersCollectionRef, answerObj);
      setAnswerCount((prev) => prev + 1);
      toast.success("Answer added successfully");
      onOpenChange();
    } catch (error) {
      console.log(error);
      toast.error("Error adding answer");
    }
  }, [answer, author_name, author_email, text, answersCollectionRef, onOpenChange]);


  return (
    <div className="w-full bg-white shadow-lg rounded-md overflow-y-visible flex flex-col gap-3 overflow-x-hidden">
      <div
        style={{ borderBottomWidth: "0.3px" }}
        className="border-b-neutral-500 w-full px-3 py-2 flex flex-row items-center justify-between hover:bg-neutral-100 cursor-pointer"
      >
        <div className="flex flex-row gap-2 items-center">
          <QuestionBulb className="text-2xl" />
          <p className="text-xs md:text-sm text-neutral-500">
            Question for you
          </p>
        </div>
        <IoIosArrowForward size={18} className="text-neutral-600" />
      </div>
      <div className="w-full flex flex-row justify-between items-center px-3">
        <p className="w-full font-semibold text-neutral-800 hover:underline cursor-pointer">
          {text}
        </p>
        <IoClose size={18} className="text-neutral-600" />
      </div>
      <div className="w-full flex flex-row gap-1 px-3 items-center">
        <p className="text-neutral-500 font-semibold md:text-[13px] text-[11px]">
          {answerCount} answers
        </p>
        <BsDot size={18} className="text-neutral-400" />
        <p className="text-neutral-400 md:text-[13px] text-[11px]">
          Last followed 6h ago
        </p>
      </div>
      <div className="w-full px-3 flex flex-row items-center justify-center pb-3">
        <div className="w-full flex flex-row items-center gap-2">
          <span
            onClick={() => onOpen()}
            style={{ borderWidth: "0.5px" }}
            className="rounded-2xl py-1 px-3.5 border-neutral-400 flex flex-row gap-1 cursor-pointer hover:bg-neutral-100"
          >
            <FaRegPenToSquare size={17} className="text-neutral-600" />
            <p className="text-sm text-neutral-500">Answer</p>
          </span>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} >
            <ModalContent>
              {
                (onClose) => (
                  <ModalBody>
                    <AnswerModal
                      onClose={onClose}
                      author_name={author_name}
                      text={text}
                      answer={answer}
                      setAnswer={setAnswer}
                    />
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Cancel
                      </Button>
                      <Button color="primary">
                        <p onClick={handleSubmit}>Post</p>
                      </Button>
                    </ModalFooter>
                  </ModalBody>
                )
              }
            </ModalContent>
          </Modal>
          <span className="rounded-2xl py-1 px-3.5 hover:bg-neutral-100 flex flex-row gap-1 cursor-pointer">
            <IoIosWifi size={20} className="text-neutral-600" />
            <p className="text-sm text-neutral-500">Follow</p>
          </span>
          <span className="rounded-2xl py-1 px-3.5 hover:bg-neutral-100 flex flex-row gap-1 cursor-pointer">
            <TbPencilOff size={20} className="text-neutral-600" />
            <p className="text-sm text-neutral-500">Pass</p>
          </span>
        </div>
        <HiDotsHorizontal size={18} className="text-neutral-500" />
      </div>
    </div>
  );
};

export default QuestionItem;
