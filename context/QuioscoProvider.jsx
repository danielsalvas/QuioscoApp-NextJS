import { useState, useEffect, createContext } from "react";
import axios from "axios";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [actualCategory, setActualCategory] = useState({});
  const [product, setProduct] = useState({})
  const [modal, setModal] = useState(false)

  const getCategories = async () => {
    const { data } = await axios("/api/categories");
    setCategories(data);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setActualCategory(categories[0])
  }, [categories]);

  const handleClickCategory = (id) => {
    const category = categories.filter((catego) => catego.id === id);
    setActualCategory(category[0]);
  };

  const handleSetProduct = product => {
    setProduct(product)
  }

  const handleChangeModal = () => {
    setModal(!modal)
  }

  return (
    <QuioscoContext.Provider
      value={{
        categories,
        actualCategory,
        product,
        modal,
        handleClickCategory,
        handleSetProduct,
        handleChangeModal
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
