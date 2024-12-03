import React, { useState } from "react";
import apiClient from "../api/apiClient";

const AddBookForm = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    publisher: "",
    isbn: "",
    quantity: null,
    publishDate: "",
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post("/books", book);
      setBook({
        title: "",
        author: "",
        publisher: "",
        isbn: "",
        quantity: null,
        publishDate: "",
      });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border border-gray-300 rounded bg-white shadow-md w-1/2">
      <h2 className="text-xl font-bold mb-4">Add Book</h2>
      <div className="mb-4">
        <input
          name="title"
          placeholder="Title"
          value={book.title}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          name="publisher"
          placeholder="Publisher"
          value={book.publisher}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          name="isbn"
          placeholder="ISBN"
          value={book.isbn}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={book.quantity}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          name="publishDate"
          type="date"
          value={book.publishDate}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Add Book
      </button>
    </form>
  );
};

export default AddBookForm;
