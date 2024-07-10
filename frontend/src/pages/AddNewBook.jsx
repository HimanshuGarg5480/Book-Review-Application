import React, { useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddNewBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleAddNewBook = async (e) => {
    e.preventDefault();
    console.log({ title, author, genre, description });
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.post(
        "http://localhost:8000/api/book/addNewBook",
        {
          title,
          author,
          genre,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Book added:", response.data);
      setMessage(response.data.message);
    } catch (error) {
      console.error("There was an error adding the book!", error);
      setError(error.message);
      navigate("/login");
    }
  };
  return (
    <Layout>
      <div className="flex justify-center items-center py-10 bg-blue-200 h-screen">
        <div className="form bg-gray-800 lg:w-4/12 md:w-8/12 sm:10/12 w-full  px-12 py-16   font-medium shadow-2xl">
          <h1 className="text-white uppercase text-2xl text-center pb-12">
            Add a new book
          </h1>
          <form action="">
            <span className="">
              <input
                value={title}
                onChange={(e) => {
                  e.preventDefault();
                  setTitle(e.target.value);
                }}
                type="title"
                name="title"
                id="title"
                className="rounded outline-none bg-gray-700 text-slate-100 p-2 pl-4 mb-10 w-full  "
                placeholder="Enter title of the book"
              />
            </span>
            <span className="">
              <input
                value={author}
                onChange={(e) => {
                  e.preventDefault();
                  setAuthor(e.target.value);
                }}
                type="author"
                name="author"
                id="author"
                className="rounded outline-none bg-gray-700 text-slate-100 p-2 pl-4 mb-10 w-full  "
                placeholder="author of the book"
              />
            </span>
            <span className="">
              <input
                value={genre}
                onChange={(e) => {
                  e.preventDefault();
                  setGenre(e.target.value);
                }}
                type="genre"
                name="genre"
                id="genre"
                className="rounded outline-none bg-gray-700 text-slate-100 p-2 pl-4 mb-10 w-full  "
                placeholder="Enter genre of the book"
              />
            </span>

            <input
              value={description}
              onChange={(e) => {
                e.preventDefault();
                setDescription(e.target.value);
              }}
              type="description"
              name="description"
              id="description"
              className="rounded outline-none bg-gray-700 text-slate-100 p-2 pl-4 mb-5 w-full  "
              placeholder="description"
            />

            <button
              onClick={handleAddNewBook}
              className="bg-blue-400 px-6 text-white rounded"
            >
              Add
            </button>
          </form>
          <div className="text-green-600 mt-2">{message}</div>
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    </Layout>
  );
};

export default AddNewBook;
