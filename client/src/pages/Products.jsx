import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { handleError } from "../utils";
import { ToastContainer } from "react-toastify";

function Products() {
  const [products, setProducts] = useState([]);

  // Fetch products asynchronously
  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8000/projects";
      const headers = {
        Authorization: localStorage.getItem('token'),
      };
      const response = await fetch(url, { headers });
      const result = await response.json();
      setProducts(result);
    } catch (error) {
      handleError(error);
    }
  };

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <div style={{ margin: "20px" }}>
        {products && products.length > 0 ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Price</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id} style={{ textAlign: "center", border: "1px solid #ddd" }}>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.name}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.price}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{item.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Server Error</p>
        )}
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default Products;
