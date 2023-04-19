import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [actualCategory, setActualCategory] = useState({});
  const [product, setProduct] = useState({});
  const [modal, setModal] = useState(false);
  const [order, setOrder] = useState([]);

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

  const handleClickCategory = (id) => {
    const category = categories.filter((catego) => catego.id === id);
    setActualCategory(category[0]);
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
      toast.success('Product Succesfully Updated!');
      setOrder(updatedOrder)
    } else {
      //If is new, we add the product to the order
      toast.success('Product Added to the Order!');
      setOrder([...order, product]);
    }

    setModal(false)
  };

  return (
    <QuioscoContext.Provider
      value={{
        categories,
        actualCategory,
        product,
        modal,
        order,
        handleClickCategory,
        handleSetProduct,
        handleChangeModal,
        handleAddOrder,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
