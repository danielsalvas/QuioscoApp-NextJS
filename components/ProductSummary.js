import Image from "next/image";
import { moneyFormat } from "@/helpers";
import trash from "../public/assets/img/delete.svg";
import edit from "../public/assets/img/edit.svg";
import useQuiosco from "@/hooks/useQuiosco";
import { use } from "react";

const ProductSummary = ({ product }) => {
  const { handleEditQuantities, handleDeleteProduct } = useQuiosco();
  return (
    <div className="shadow-md p-5 mb-3 flex flex-col lg:flex-row gap-10 justify-between items-center">
      <div className="flex items-center gap-10">
        <Image
          width={300}
          height={400}
          alt="Product Image"
          src={`/assets/img/${product.image}.jpg`}
          className="mx-auto"
        />

        <div className="w-4/6">
          <p className="md:text-3xl text-xl font-bold">{product.name}</p>
          <p className="md:text-xl text-md font-bold mt-2">
            Quantity: {product.quantity}
          </p>
          <p className="md:text-xl text-md text-amber-800 font-bold mt-2">
            Price: {moneyFormat(product.price)}
          </p>
          <p className="md:text-xl text-md text-amber-800 font-bold mt-2">
            Subtotal: {moneyFormat(product.price * product.quantity)}
          </p>
        </div>
      </div>

      <div className="md:m-10 flex lg:flex-col gap-4">
        <button
          onClick={() => handleEditQuantities(product.id)}
          type="button"
          className="bg-amber-700 hover:bg-amber-900 duration-300 flex justify-between px-6 py-2 text-white rounded-md font-bold uppercase shadow-md w-full"
        >
          Edit
          <Image src={edit} alt="Edit Product" />
        </button>
        <button
        onClick={() => handleDeleteProduct(product.id)}
          type="button"
          className="bg-red-600 hover:bg-red-700 duration-300 flex justify-between px-6 py-2 text-white rounded-md font-bold uppercase shadow-md w-full "
        >
          Delete
          <Image src={trash} alt="Delete Product" />
        </button>
      </div>
    </div>
  );
};

export default ProductSummary;
