import Image from "next/image";
import useQuiosco from "@/hooks/useQuiosco";

const Category = ({ category }) => {

  const { handleClickCategory, actualCategory } = useQuiosco();
  const { name, icon, id } = category;

  return (
    <div className={`${actualCategory?.id === id ? 'bg-amber-950 text-white' : '' } flex items-center md:justify-start justify-center gap-4 w-full border p-5 hover:bg-amber-950 hover:text-white duration-300`}>
      <Image
        alt="Icon Category"
        width={60}
        height={60}
        src={`/assets/img/icon_${icon}.svg`}
      />
      <button onClick={() => handleClickCategory(id)} type="button" className="text-2xl font-bold hover:cursor-pointer">
        {name}
      </button>
    </div>
  );
};

export default Category;
