import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';

const AdminPanel = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalBooks: 0,
    pendingRequests: 0,
  });
  const [loading, setLoading] = useState(false);
  const [bookRequests, setBookRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMetrics();
    fetchBookRequests();
  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await apiClient.get('/admin/metrics');
      setMetrics({
        totalUsers: response.data.totalUsers,
        totalBooks: response.data.totalBooks,
        pendingRequests: response.data.pendingRequests,
      });
    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

  const fetchBookRequests = async () => {
    try {
      const response = await apiClient.get("/book-requests/all"); // Adjust endpoint to fetch all book requests
      setBookRequests(response.data);
    } catch (error) {
      setError("Failed to fetch book requests");
    }
  };

  const handleRequestStatusChange = async (requestId, status) => {
    setLoading(true);
    try {
      let response;
      if (status === "PROCESSED") {
        response = await apiClient.put(`/book-requests/process/${requestId}`);
      } else if (status === "CANCELLED") {
        response = await apiClient.put(`/book-requests/cancel/${requestId}`);
      }

      // After the request is processed, update the local state
      if (response.status === 200 || response.status === 204) {
        setBookRequests(
          bookRequests.map((request) =>
            request.id === requestId ? { ...request, status } : request
          )
        );
        fetchMetrics();
        alert(`Request ${status === "PROCESSED" ? "approved" : "rejected"} successfully!`);
      }
    } catch (error) {
      console.error("Error processing request:", error);
      alert("Error processing the request.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-[calc(100vh-68px)] flex flex-col items-center py-12">


      <div className="grid grid-cols-1 md:grid-cols-3 gap-28 mb-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-600">Total Users</h2>
          <p className="text-3xl font-bold text-blue-500 mt-4">{metrics.totalUsers}</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-600">Total Books</h2>
          <p className="text-3xl font-bold text-green-500 mt-4">{metrics.totalBooks}</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold text-gray-600">Pending Requests</h2>
          <p className="text-3xl font-bold text-red-500 mt-4">{metrics.pendingRequests}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-32">
        <button
          onClick={() => navigate('/employees')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-md cursor-pointer transform hover:scale-105 transition-all"
        >
          Manage Users
        </button>
        <button
          onClick={() => navigate('/books')}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-md cursor-pointer transform hover:scale-105 transition-all"
        >
          Manage Books
        </button>
        <button
          onClick={() => navigate('/admin/book-requests')}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-md cursor-pointer transform hover:scale-105 transition-all"
        >
          Manage Requests
        </button>
      </div>


      <div className="bg-white p-6 rounded-lg shadow-sm w-3/4 mx-auto mt-10">
        <h3 className="text-3xl font-bold mb-4">Pending Book Requests</h3>
        {loading && <p>Processing request...</p>}

        {/* Filter and Check for Pending Requests */}
        {bookRequests.filter((request) => request.status === "PENDING").length === 0 ? (
          <p className="text-gray-500 text-center italic py-4">No pending requests</p>
        ) : (
          <div className="max-h-[10rem] overflow-auto border">
            <table className="min-w-full bg-white rounded-lg border border-gray-300 shadow-sm">
              <thead>
                <tr className="text-center border">
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Book Title</th>
                  <th className="px-4 py-2 border">User Name</th>
                  <th className="px-4 py-2 border">User ID</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookRequests
                  .filter((request) => request.status === "PENDING")
                  .map((request) => (
                    <tr key={request.id} className="border-t text-center">
                      <td className="px-4 py-2 border">{request.id}</td>
                      <td className="px-4 py-2 border">{request.book.title}</td>
                      <td className="px-4 py-2 border">
                        {request.user.firstName + " " + request.user.lastName}
                      </td>
                      <td className="px-4 py-2 border">{request.user.id}</td>
                      <td className="px-4 py-2 border">{request.status}</td>
                      <td className="px-4 py-2 border">
                        {request.status === "PENDING" && (
                          <div className="flex space-x-4">
                            <button
                              onClick={() => handleRequestStatusChange(request.id, "PROCESSED")}
                              className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRequestStatusChange(request.id, "CANCELLED")}
                              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>


    </div>
  );
};

export default AdminPanel;
