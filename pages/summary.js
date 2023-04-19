import Layout from "@/layout/Layout";
import useQuiosco from "@/hooks/useQuiosco";
import ProductSummary from "@/components/ProductSummary";

const Summary = () => {
    const { order } = useQuiosco()
  return (
    <Layout page={"summary"}>
      <h1 className="text-4xl font-black md:text-left text-center">Summary</h1>
      <p className="text-2xl my-10">Check your Order:</p>

      {order.length === 0 ? (
        <p className="text-center text-2xl"> There are no products in your order</p>
      ) : (
        order.map( product => (
            <ProductSummary key={product.id} product={product} />
        ))
      )}
    </Layout>
  );
};

export default Summary;
