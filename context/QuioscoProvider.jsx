import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [actualCategory, setActualCategory] = useState({});
  const [product, setProduct] = useState({});
  const [modal, setModal] = useState(false);
  const [order, setOrder] = useState([]);
  const [name, setName] = useState("");
  const [total, setTotal] = useState(0);

  const router = useRouter();

  const getCategories = async () => {
    const { data } = await axios("/api/categories");
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setActualCategory(categories[0]);
  }, [categories]);

  useEffect(() => {
    const newTotal = order.reduce(
      (sum, currentProduct) =>
        currentProduct.price * currentProduct.quantity + sum,
      0
    );
    setTotal(newTotal);
  }, [order]);

  const handleClickCategory = (id) => {
    const category = categories.filter((catego) => catego.id === id);
    setActualCategory(category[0]);
    router.push("/");
  };

  const handleSetProduct = (product) => {
    setProduct(product);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const handleAddOrder = (product) => {
    if (order.some((productState) => productState.id === product.id)) {
      //Update the quantity if the product exists

      const updatedOrder = order.map((productState) =>
        productState.id === product.id ? product : productState
      );
      toast.success("Product Succesfully Updated!");
      setOrder(updatedOrder);
    } else {
      //If is new, we add the product to the order
      toast.success("Product Added to the Order!");
      setOrder([...order, product]);
    }

    setModal(false);
  };

  const handleEditQuantities = (id) => {
    const updateModalProduct = order.filter((product) => product.id === id);
    setProduct(updateModalProduct[0]);

    setModal(!modal);
  };

  const handleDeleteProduct = (id) => {
    const updateOrder = order.filter((product) => product.id !== id);
    setOrder(updateOrder);
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/orders", {
        order,
        name,
        total,
        date: Date.now().toString(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <QuioscoContext.Provider
      value={{
        categories,
        actualCategory,
        product,
        modal,
        order,
        name,
        total,
        handleClickCategory,
        handleSetProduct,
        handleChangeModal,
        handleAddOrder,
        handleEditQuantities,
        handleDeleteProduct,
        setName,
        handleOrder,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
