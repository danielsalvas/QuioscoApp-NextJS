import { useEffect } from "react";
import useQuiosco from "@/hooks/useQuiosco";
import Layout from "@/layout/Layout";
import { moneyFormat } from "@/helpers";

const Total = () => {
  const { order, name, setName, handleOrder, total } = useQuiosco();

  const checkOrder = () => {
    return order.length === 0 || name === '' || name.length < 3;
  };

  useEffect(() => {
    checkOrder();
  }, [order, name]);

  return (
    <Layout page={"Total"}>
      <h1 className="text-4xl font-black md:text-left text-center">Total</h1>
      <p className="text-2xl my-10">Confirm your order:</p>

      <form onSubmit={handleOrder}>
        <div>
          <label
            htmlFor="name"
            className="block uppercase text-slate-800 font-bold text-xl"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value) }
          />
        </div>
        <div className="mt-10">
          <p className="text-2xl">
            Total: <span className="font-bold">{moneyFormat(total)}</span>
          </p>
        </div>
        <div>
          <input
            type="submit"
            className={`${checkOrder() ? 'bg-amber-100' : 'bg-amber-700 hover:bg-amber-800 duration-300' } flex justify-center w-full lg:w-auto px-5 py-2 mt-5 cursor-pointer rounded text-center uppercase font-bold text-white`}
            value="Confirm your Order"
            disabled={checkOrder()}
          />
        </div>
      </form>
    </Layout>
  );
};

export default Total;
