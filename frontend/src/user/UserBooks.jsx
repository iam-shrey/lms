import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import { useAuth } from '../security/AuthContext';
import { toast } from 'react-toastify';

const UserBooks = () => {
  const [userBooks, setUserBooks] = useState([]); // To store the user's own books
  const userId = useAuth().userId;

  useEffect(() => {
    if (userId) {
      fetchUserBooks(); // Fetch books owned by the user
    }
  }, [userId]); // Re-fetch when userId changes

  const fetchUserBooks = async () => {
    try {
      const response = await apiClient.get(`/books/user/${userId}`);
      setUserBooks(response.data);
    } catch (error) {
      console.error('Error fetching user books:', error);
    }
  };

  const returnBook = async (bookId) => {
    const confirmation = window.confirm("Are you sure you want to create request?");
    if (!confirmation) return;
    try {
      await apiClient.put(`/books/user/return`, null, {
        params: { userId, bookId },
      });
      toast.success(`Book with ID ${bookId} has been returned.`);
      fetchUserBooks();
    } catch (error) {
      console.error('Error returning book:', error);
      alert('Failed to return the book.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-11/12 mx-auto mt-8">

      {/* User's Books */}
      <h3 className="text-3xl font-bold mb-4">Your Books</h3>
      {userBooks.length === 0 ? (
          <p className="text-gray-500 text-center italic py-4">No Books Issued</p>
        ) : (
      <div className="max-h-[33rem] overflow-auto border">
        <table className="min-w-full bg-white rounded-lg border border-gray-300 shadow-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 text-center text-gray-600 border">ID</th>
              <th className="px-4 py-2 text-center text-gray-600 border">Title</th>
              <th className="px-4 py-2 text-center text-gray-600 border">Author</th>
              <th className="px-4 py-2 text-center text-gray-600 border">Publisher</th>
              <th className="px-4 py-2 text-center text-gray-600 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              userBooks.map((book) => (
                <tr key={book.id}>
                  <td className="px-4 py-2 text-center border">{book.id}</td>
                  <td className="px-4 py-2 text-center border">{book.title}</td>
                  <td className="px-4 py-2 text-center border">{book.author}</td>
                  <td className="px-4 py-2 text-center border">{book.publisher}</td>
                  <td className="px-4 py-2 text-center border">
                    <button
                      onClick={() => returnBook(book.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      Return
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>)}
    </div>
  );
};

export default UserBooks;