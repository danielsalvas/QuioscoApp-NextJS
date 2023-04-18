import { useState, useEffect, createContext } from "react";
import axios from "axios";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [actualCategory, setActualCategory] = useState({});

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

  return (
    <QuioscoContext.Provider
      value={{
        categories,
        actualCategory,
        handleClickCategory,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
