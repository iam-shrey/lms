import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

const BookList = ({ onEdit, onDelete }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await apiClient.get("/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Book List</h2>
      <table className="min-w-full bg-white rounded-lg border border-gray-300 shadow-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4 text-left font-medium text-gray-700">ID</th>
            <th className="p-4 text-left font-medium text-gray-700">Title</th>
            <th className="p-4 text-left font-medium text-gray-700">Author</th>
            <th className="p-4 text-left font-medium text-gray-700">Publisher</th>
            <th className="p-4 text-left font-medium text-gray-700">Quantity</th>
            <th className="p-4 text-left font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.id} className="border-t">
                <td className="p-4 text-gray-600">{book.id}</td>
                <td className="p-4 text-gray-600">{book.title}</td>
                <td className="p-4 text-gray-600">{book.author}</td>
                <td className="p-4 text-gray-600">{book.publisher}</td>
                <td className="p-4 text-gray-600">{book.quantity}</td>
                <td className="p-4">
                  <button
                    onClick={() => onEdit(book)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(book.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="text-center p-4 text-gray-500 italic bg-gray-50"
              >
                No books available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
