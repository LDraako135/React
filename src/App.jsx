import React, { useState, useEffect } from "react"; // Importa el hook useState desde la librería react
import ProductList from "./components/ProductList"; // Importa el componente ProductList
import ProductForm from "./components/ProductForm"; // Importa el componente ProductForm
import ProductDetail from "./components/ProductDetail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";

const App = () => { // Componente funcional App
  const [products, setProducts] = useState([]);
  const [theme, setTheme] = useState("light"); // Estado para el tema de la aplicación (light, dark, blue)  

  useEffect(() => { // Hook de efecto que se ejecuta al montar el componente
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(savedProducts);

    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.classList.add(savedTheme);
  }, []);

  useEffect(() => { // Hook de efecto que se ejecuta al cambiar el estado de products
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);
  useEffect(() => {
    // Guardar el tema seleccionado en localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  /// Eliminar un producto por su índice
  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);

    if (updatedProducts.length > 0) {
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    } else {
      localStorage.removeItem("products"); // Eliminar clave si no hay productos
    }
  };

  // Editar un producto por su índice
  const editProduct = (index, newProduct) => {
    const updatedProducts = products.map((product, i) =>
      i === index ? newProduct : product
    );
    setProducts(updatedProducts);
  };
  const toggleTheme = () => { // Función que cambia el tema de la aplicación
    const newTheme = theme === "light" ? "dark" : theme === "dark" ? "blue" : theme === "blue" ? "green" : theme === "green" ? "yellow" : "light"; // Cambia el tema actual al siguiente en el ciclo (light -> dark -> blue -> light) 
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Router>
      <div className="container">
        <h1>
          Inventario de Equipos de la USTA
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Modo Oscuro" : theme === "dark" ? "🔵 Modo Azul" : theme === "blue" ? "🟢 Modo Verde" : theme === "green" ? "🟡 Modo Amarillo" : "☀ Modo claro"}
          </button>
        </h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ProductForm onAdd={addProduct} />
                <ProductList products={products} onDelete={deleteProduct} onEdit={editProduct} />
              </>
            }
          />
          <Route path="/detalle-producto" element={<ProductDetail
      products={products}
      onDelete={deleteProduct}
      onEdit={editProduct}
    />} />

        </Routes>
      </div>
    </Router>
  );

};

export default App;
