import React, { useEffect, useState } from "react";

const PopUpReviews = ({ showPopUp, setShowPopUp, product }) => {
    const [reviews,setReviews]=useState([]);
    const handleGetReviws=async()=>{
        console.log(product);
        try {
            const response = await fetch(
              `http://localhost:8000/api/book/${product._id}/reviews`,
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
            setReviews([...data.reviews]);
          } catch (error) {
            console.error("Error in getting reviews:", error);
          }
    }
    useEffect(() => {
        handleGetReviws();
      }, []);
  return (
    <>
      <div
        className="fixed z-10 overflow-y-auto top-0 w-full left-0"
        id="modal"
      >
        <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-900 opacity-75" />
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>
          <div
            className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white pb-4 sm:p-6 sm:pb-4">
              <img
                src="https://media.istockphoto.com/id/173015527/photo/a-single-red-book-on-a-white-surface.jpg?s=612x612&w=0&k=20&c=AeKmdZvg2_bRY2Yct7odWhZXav8CgDtLMc_5_pjSItY="
                alt="Product"
                className="h-40 w-full object-cover rounded-t-xl"
              />
              <div className="p-4">
                <div className="text-base sm:text-lg font-semibold underline">
                    Reviews
                </div>
                <div className="text-center">
                    {
                        reviews.length==0&&"no review yet!"
                    }
                </div>
                <div className="h-[25%] overflow-y-auto">
                    {
                        reviews?.map((review,i)=>{
                            return (
                                <div className="flex flex-col items-start border-2 border-black rounded-md">
                                    <div>{review.comment}</div>
                                    <div>Rating: {review.rating}⭐</div>
                                </div>
                            )
                        })
                    }
                </div>
              </div>
            </div>
            <div className="bg-gray-200 px-4 py-3 text-right flex items-end justify-end">
              <button
                type="button"
                className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
                onClick={() => {
                  setShowPopUp(!showPopUp);
                }}
              >
                <i className="fas fa-times"></i> Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUpReviews;
