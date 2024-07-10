import React from "react";

const ProductCard = ({ product,showPopUp,setShowPopUp,handleProductClick}) => {
  return (
    <div onClick={()=>{setShowPopUp(!showPopUp); handleProductClick(product)}} className="w-72 bg-white border-gray-950 border-2 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <img
        src="https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY="
        alt="Product"
        className="h-40 w-72 object-cover rounded-t-xl"
      />
      <div className="px-4 py-3 w-72">
        <span className="text-stone-900 font-bold mr-3 capitalize text-lg">
          Title: {product.title}
        </span>
        <p className="text-base font-semibold text-black truncate block capitalize">
          Author: {product.author}
        </p>
        <div className="flex items-center">
          <p className="text-lg font-semibold text-black capitalize cursor-auto my-3">
            Genre: {product.genre}
          </p>
        </div>
        <button className="bg-blue-400 hover:bg-blue-500 text-slate-50 w-full rounded-md py-2">add review</button>
      </div>
    </div>
  );
};

export default ProductCard;
