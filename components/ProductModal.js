import { useState, useEffect } from "react";
import Image from "next/image";
import { moneyFormat } from "@/helpers";
import close from "../public/assets/img/close.svg";
import minus from "../public/assets/img/minus.svg";
import plus from "../public/assets/img/plus.svg";
import useQuiosco from "@/hooks/useQuiosco";

const ProductModal = () => {
  const { product, handleChangeModal, handleAddOrder, order } = useQuiosco();
  const [quantity, setQuantity] = useState(1);
  const [edit, setEdit] = useState(false)

  //Checking if the current modal is in the order, to add the current quantity to the modal

  useEffect(() => {
    if (order.some(productState => productState.id === product.id)) {

      const editProduct = order.find(productState => productState.id === product.id)
      setEdit(true)
      setQuantity(editProduct.quantity)
    }
  }, [product, order]);

  return (
    <div className="md:flex gap-10">
      <div className="md:w-1/3 flex items-start gap-10">
        <Image
          src={`/assets/img/${product.image}.jpg`}
          width={300}
          height={400}
          alt="Product Image"
        />
        <button onClick={handleChangeModal}>
          <Image src={close} alt="" />
        </button>
      </div>

      <div className="md:w-2/3">
        <div className="md:flex justify-end hidden">
          <button onClick={handleChangeModal}>
            <Image src={close} alt="" />
          </button>
        </div>
        <h1 className="text-3xl font-bold mt-5">{product.name}</h1>
        <p className="mt-5 font-black text-4xl text-amber-600">
          {moneyFormat(product.price)}
        </p>

        <div className="flex gap-4 mt-5">
          <button
            type="button"
            onClick={() => {
              if (quantity <= 1) return;
              setQuantity(quantity - 1);
            }}
          >
            <Image src={minus} alt="Minus image" />
          </button>
          <p className="text-2xl">{quantity}</p>
          <button
            type="button"
            onClick={() => {
              if (quantity === 5) return;
              setQuantity(quantity + 1);
            }}
          >
            <Image src={plus} alt="Plus image" />
          </button>
        </div>
        <button
          onClick={() => handleAddOrder({ ...product, quantity })}
          type="button"
          className="bg-amber-600 hover:bg-amber-800 text-white w-full mt-5 p-3 uppercase font-bold duration-300 rounded-md"
        >
          {edit ? 'Save Changes' : 'Add to the order'}
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
