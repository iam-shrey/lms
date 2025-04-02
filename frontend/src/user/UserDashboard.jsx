import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { useAuth } from '../security/AuthContext';

const UserDashboard = () => {
  const [userData, setUserData] = useState({
    totalBooks: 0,
    issuedBooks: 0,
    totalRequests: 0
  });

  const name = useAuth().firstName + " " + useAuth().lastName;
  const username = useAuth().username;


  const navigate = useNavigate();

  useEffect(() => {
    // Fetch data from the API
    apiClient.get(`/users/${username}/metrics`) 
      .then((response) => {
        setUserData({
          totalBooks: response.data.totalBooks,
          issuedBooks: response.data.issuedBooks,
          totalRequests: response.data.totalRequests
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center py-12">
      <div className="bg-yellow-400 shadow-lg rounded-3xl p-8 w-full max-w-4xl mb-16">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome back, {name}</h1>
        <p className="text-lg text-gray-600">Your email: {username}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-16">
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-700">Total Books in Library</h2>
          <p className="text-3xl font-bold text-blue-500 mt-4">{userData.totalBooks}</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-700">Books Issued</h2>
          <p className="text-3xl font-bold text-green-500 mt-4">{userData.issuedBooks}</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-700">Pending Requests</h2>
          <p className="text-3xl font-bold text-red-500 mt-4">{userData.totalRequests}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-28">
        <button
          onClick={() => navigate('/books')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-md cursor-pointer transform hover:scale-105 transition-all"
        >
          View Book List
        </button>
        <button
          onClick={() => navigate('/your-books')}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-md cursor-pointer transform hover:scale-105 transition-all"
        >
          View Issued Books
        </button>
        <button
          onClick={() => navigate('/your-requests')}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-md cursor-pointer transform hover:scale-105 transition-all"
        >
          View Book Requests
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
