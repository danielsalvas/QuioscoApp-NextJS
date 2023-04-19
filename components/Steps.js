import { useRouter } from "next/router";
import Image from "next/image";
import right from "../public/assets/img/right.svg";

const steps = [
  { step: 1, name: "Menu", url: "/" },
  { step: 2, name: "Go to Summary", url: "/summary" },
  { step: 3, name: "Go to Total", url: "/total" },
];

const Steps = () => {
  const router = useRouter();

  const calculateProgress = () => {
    let value;
    if (router.pathname === "/") {
      value = 2;
    } else if (router.pathname === "/summary") {
      value = 50;
    } else {
      value = 100;
    }
    return value;
  };

  return (
    <>
      <div className=" flex justify-between mb-5">
        {steps.map((step) => (
          <button
            onClick={() => {
              router.push(step.url);
            }}
            className="md:text-2xl text-sm font-bold flex items-center gap-1"
            key={step.step}
          >
            {step.name}
            <Image src={right} alt="Right" />
          </button>
        ))}
      </div>
      <div className="bg-gray-200 mb-10">
        <div
          className="rounded-full bg-amber-800 text-xs leading-none h-2 text-center text-white"
          style={{ width: `${calculateProgress()}%` }}
        ></div>
      </div>
    </>
  );
};

export default Steps;
