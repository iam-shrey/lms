import React, { useState } from "react";
import apiClient from "../api/apiClient";

const UpdateBookForm = ({ bookToUpdate, onUpdate, closeModal }) => {
  const [book, setBook] = useState(bookToUpdate);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the book with the modified details
      await apiClient.put(`/books/${book.id}`, book);
      onUpdate(); // Refresh the book list after update
      closeModal(); // Close the modal after the update
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-600">
          Title
        </label>
        <input
          id="title"
          name="title"
          value={book.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Author */}
      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-600">
          Author
        </label>
        <input
          id="author"
          name="author"
          value={book.author}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Publisher */}
      <div>
        <label htmlFor="publisher" className="block text-sm font-medium text-gray-600">
          Publisher
        </label>
        <input
          id="publisher"
          name="publisher"
          value={book.publisher}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Quantity */}
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-600">
          Quantity
        </label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          value={book.quantity}
          onChange={handleChange}
          required
          min="0"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Update Book
        </button>
      </div>
    </form>
  );
};

export default UpdateBookForm;
