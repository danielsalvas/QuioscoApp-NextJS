import Image from "next/image";
import { moneyFormat } from "@/helpers";
import useQuiosco from "@/hooks/useQuiosco";

const Product = ({ product }) => {
  const { handleSetProduct, handleChangeModal} = useQuiosco()
  const { name, image, price } = product;
  
  return (
    <div className="border p-3 flex flex-col justify-between">
      <div className="mx-auto">
        <Image
          src={`/assets/img/${image}.jpg`}
          alt="Product Image"
          width={400}
          height={500}
        />
        <h3 className="text-2xl font-bold p-2">{name}</h3>
      </div>
      <div className="p-2">
        <p className="mt-5 font-black text-4xl text-amber-900">
          {moneyFormat(price)}
        </p>
        <button
          type="button"
          className="bg-amber-600 hover:bg-amber-800 hover:text-white w-full mt-5 p-3 uppercase font-bold duration-300 rounded-xl"
          onClick={() => {
            handleChangeModal()
            handleSetProduct(product)
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Product;
