import React, { useState, useEffect } from "react";
import BookList from "./BookList";
import AddBookForm from "./AddBookForm";
import UpdateBookForm from "./UpdateBookForm";
import apiClient from "../api/apiClient";
import BookRequestsList from "./BookRequestsList";  // New component to list book requests
import { useNavigate } from "react-router-dom";

function AdminPanel() {
  const [editingBook, setEditingBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [bookRequests, setBookRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showBookRequests, setShowBookRequests] = useState(false); // State to toggle book requests

  const navigate = useNavigate();

  // Fetch books and book requests from the API
  useEffect(() => {

    const fetchBookRequests = async () => {
      try {
        const response = await apiClient.get("/book-requests/all"); // Adjust endpoint to fetch all book requests
        setBookRequests(response.data);
      } catch (error) {
        setError("Failed to fetch book requests");
      }
    };

    fetchBooks();
    fetchBookRequests();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/books");
      setBooks(response.data);
    } catch (error) {
      setError("Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleDelete = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this book?");
    if (!confirmation) return;

    setLoading(true);
    try {
      await apiClient.delete(`/books/${id}`);
      setBooks(books.filter((book) => book.id !== id)); // Optimistically update the UI
      alert("Book deleted successfully!");
    } catch (error) {
      setError("Error deleting book.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setEditingBook(null);

  const handleUpdate = async (updatedBook) => {
    setLoading(true);
    try {
      await apiClient.put(`/books/${updatedBook.id}`, updatedBook);
      fetchBooks();
      setEditingBook(null); // Close modal
      alert("Book updated successfully!");
    } catch (error) {
      setError("Error updating book.");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestStatusChange = async (requestId, status) => {
    setLoading(true);
    try {
      await apiClient.put(`/book-requests/${requestId}/status`, { status });
      setBookRequests(
        bookRequests.map((request) =>
          request.id === requestId ? { ...request, status } : request
        )
      );
      alert(`Request ${status} successfully!`);
    } catch (error) {
      setError("Error updating request status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Library Admin Panel</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex justify-center items-center mb-8">
        <AddBookForm onAddBook={(newBook) => setBooks([...books, newBook])} />
      </div>

      {/* Toggle button for book requests */}
      <div className="flex justify-center mb-8">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => setShowBookRequests(!showBookRequests)}
        >
          {showBookRequests ? "Hide Book Requests" : "Show Book Requests"}
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => navigate("/employees")}
        >
          Show Users List
        </button>

      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <>
          <BookList onEdit={handleEdit} onDelete={handleDelete} books={books} />
          {showBookRequests && (
            <BookRequestsList
              bookRequests={bookRequests}
              onHandleRequestStatusChange={handleRequestStatusChange} // Function to handle status change
            />
          )}
        </>
      )}

      {editingBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
            <UpdateBookForm
              bookToUpdate={editingBook}
              onUpdate={handleUpdate}
              closeModal={closeModal} // Update function passed to UpdateBookForm
            />
            <button
              onClick={closeModal}
              className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
