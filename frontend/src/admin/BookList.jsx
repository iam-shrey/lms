import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";
import UpdateBookForm from "./UpdateBookForm";
import { useAuth } from "../security/AuthContext";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const role = useAuth().role;
  const userId = useAuth().userId;

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await apiClient.get("/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("Failed to load books");
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleDelete = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this book?");
    if (!confirmation) return;
    try {
      await apiClient.delete(`/books/${id}`);
      fetchBooks();
      toast.success("Book deleted successfully!");
    } catch (error) {
      toast.error("Error deleting book.");
    }
  };

  const createRequest = async (book) => {
    const confirmation = window.confirm("Are you sure you want to create request?");
    if (!confirmation) return;
    try {
      await apiClient.post(`/book-requests/request?userId=${userId}&bookId=${book.id}`);
      toast.success("Book request submitted successfully!");
    } catch (error) {
      console.error("Error creating book request:", error);
      toast.error("Failed to submit book request.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-11/12 mx-auto mt-8" >
      <h2 className="text-3xl font-bold mb-4">Books List</h2>
      <div className="max-h-[33rem] overflow-auto border">
      <table className="min-w-full bg-white rounded-lg border border-gray-300 shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-center border">
            <th className="p-2 text-sm font-medium text-gray-700 border">ID</th>
            <th className="p-2 text-sm font-medium text-gray-700 border">Title</th>
            <th className="p-2 text-sm font-medium text-gray-700 border">Author</th>
            <th className="p-2 text-sm font-medium text-gray-700 border">Publisher</th>
            <th className="p-2 text-sm font-medium text-gray-700 border">ISBN</th>
            <th className="p-2 text-sm font-medium text-gray-700 border">Quantity</th>
            <th className="p-2 text-sm font-medium text-gray-700 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.id} className="text-center border-t hover:bg-gray-50 transition-colors">
                <td className="p-2 text-base text-gray-800 border">{book.id}</td>
                <td className="p-2 text-base text-gray-800 border">{book.title}</td>
                <td className="p-2 text-base text-gray-800 border">{book.author}</td>
                <td className="p-2 text-base text-gray-800 border">{book.publisher}</td>
                <td className="p-2 text-base text-gray-800 border">{book.isbn}</td>
                <td className="p-2 text-base text-gray-800 border">{book.quantity}</td>
                {role === "ADMIN" ? (
                  <td className="p-2">
                    <button
                      onClick={() => handleEdit(book)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="ml-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </td>
                ) : role === "USER" ? (
                  <td className="p-2">
                    <button
                      onClick={() => createRequest(book)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                    >
                      Request
                    </button>
                  </td>
                ) : null}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="text-center p-4 text-gray-500 italic bg-gray-100"
              >
                No books available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>

      {editingBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4">Edit Book</h2>
            <UpdateBookForm
              bookToUpdate={editingBook}
              closeModal={() => setEditingBook(null)}
              fetchBook={fetchBooks}
            />
            <button
              onClick={() => setEditingBook(null)}
              className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
