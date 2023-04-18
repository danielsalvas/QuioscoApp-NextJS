import Image from "next/image";
import logo from "../public/assets/img/logo.png";
import useQuiosco from "@/hooks/useQuiosco";
import Category from "./Category";

const Sidebar = () => {

  const { categories } = useQuiosco();

  return (
    <div>
      <Image className="mx-auto my-0" width={300} height={100} src={logo} alt="logo" />

      <nav className="mt-10">
        {categories.map(category => (
            <Category key={category.id} category={category}/>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
