import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

const UserDashboard = () => {
  const [allBooks, setAllBooks] = useState([]); // To store all books for dropdown
  const [userBooks, setUserBooks] = useState([]); // To store the user's own books
  const [bookRequests, setBookRequests] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUserData');

    let userObject = null;
    if (loggedInUser) {
      userObject = JSON.parse(loggedInUser);
      setUserId(userObject.userId);
    } else {
      console.log('No user found');
    }

    if (userId) {
      fetchAllBooks(); // Fetch all books for the dropdown
      fetchUserBooks(); // Fetch books owned by the user
      fetchUserBookRequests(); // Fetch user's book requests
    }
  }, [userId]); // Re-fetch when userId changes

  const fetchAllBooks = async () => {
    try {
      // Fetch all books for the dropdown
      const response = await apiClient.get(`/books`);
      setAllBooks(response.data);
    } catch (error) {
      console.error('Error fetching all books:', error);
    }
  };

  const fetchUserBooks = async () => {
    try {
      // Fetch books owned by the user
      const response = await apiClient.get(`/books/user/${userId}`);
      setUserBooks(response.data);
    } catch (error) {
      console.error('Error fetching user books:', error);
    }
  };

  const fetchUserBookRequests = async () => {
    try {
      const response = await apiClient.get(`/book-requests/user/${userId}`);
      setBookRequests(response.data);
    } catch (error) {
      console.error('Error fetching user book requests:', error);
    }
  };

  const handleCreateBookRequest = async () => {
    if (!selectedBookId) return alert('Please select a book');

    try {
      // Send the userId and bookId as query parameters
      const response = await apiClient.post(
        `/book-requests/request?userId=${userId}&bookId=${selectedBookId}`,
        null
      );
      fetchUserBookRequests(); // Refresh the list of user book requests
      alert('Book request submitted successfully');
    } catch (error) {
      console.error('Error creating book request:', error);
      alert('Failed to submit book request.');
    }
  };

  const handleCancelRequest = async (requestId) => {
    try {
      await apiClient.delete(`/book-requests/cancel/${requestId}`);
      fetchUserBookRequests(); // Refresh book requests list
      alert('Book request cancelled');
    } catch (error) {
      console.error('Error cancelling book request:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">User Dashboard</h2>

      {/* User's Books */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h3 className="text-xl font-medium text-gray-700 mb-4">Your Books</h3>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">ID</th>
              <th className="px-4 py-2 text-left text-gray-600">Title</th>
              <th className="px-4 py-2 text-left text-gray-600">Author</th>
              <th className="px-4 py-2 text-left text-gray-600">Genre</th>
            </tr>
          </thead>
          <tbody>
            {userBooks.length > 0 ? (
              userBooks.map((book) => (
                <tr key={book.id}>
                  <td className="px-4 py-2">{book.id}</td>
                  <td className="px-4 py-2">{book.title}</td>
                  <td className="px-4 py-2">{book.author}</td>
                  <td className="px-4 py-2">{book.genre}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center text-gray-600">No books found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Book Request Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h3 className="text-xl font-medium text-gray-700 mb-4">Create a New Book Request</h3>
        <select
          value={selectedBookId}
          onChange={(e) => setSelectedBookId(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
        >
          <option value="">Select a Book</option>
          {allBooks.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title} - {book.author}
            </option>
          ))}
        </select>
        <button
          onClick={handleCreateBookRequest}
          className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
        >
          Submit Request
        </button>
      </div>

      {/* Book Requests List */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-xl font-medium text-gray-700 mb-4">Your Book Requests</h3>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">ID</th>
              <th className="px-4 py-2 text-left text-gray-600">Book Title</th>
              <th className="px-4 py-2 text-left text-gray-600">Status</th>
              <th className="px-4 py-2 text-left text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookRequests.map((request) => (
              <tr key={request.id}>
                <td className="px-4 py-2">{request.id}</td>
                <td className="px-4 py-2">{request.book.title}</td>
                <td className="px-4 py-2">{request.status}</td>
                <td className="px-4 py-2">
                  {request.status === 'PENDING' && (
                    <button
                      onClick={() => handleCancelRequest(request.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
