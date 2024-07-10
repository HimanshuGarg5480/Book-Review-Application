import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Layout from "../components/Layout";
import PopUpProductDetails from "../components/PopUpProductDetails";

const BookListingPage = () => {
  const navigate = useNavigate();
  const [showPopUp, setShowPopUp] = useState(false);
  const [productList, setProductList] = useState([]);
  const [productDetails, setProductDeltails] = useState({});
  const handleGetProductList = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/book/getAllBooks",
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("fetched products successfully:", data);
      if (!data.books) {
        navigate("/login");
      }
      setProductList([...data.books]);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  const handleProductClick = (product) => {
    setProductDeltails(product);
  };
  useEffect(() => {
    handleGetProductList();
  }, []);
  return (
    <Layout>
      <div>
        {showPopUp && (
          <PopUpProductDetails
            product={productDetails}
            showPopUp={showPopUp}
            setShowPopUp={setShowPopUp}
          />
        )}
        <div className="">
          <div className="text-lg sm:text-3xl font-bold text-blue-950 text-center">
            Product Listing
          </div>
        </div>
        <div className="flex flex-wrap gap-4 py-3 justify-center">
          {productList?.map((product, index) => (
            <ProductCard
              product={product}
              showPopUp={showPopUp}
              setShowPopUp={setShowPopUp}
              key={product._id}
              handleProductClick={handleProductClick}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default BookListingPage;
