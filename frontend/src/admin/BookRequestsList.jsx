import React, { useState } from "react";
import axios from "axios";
import apiClient from "../api/apiClient";

const BookRequestsList = ({ bookRequests, onHandleRequestStatusChange }) => {
  const [loading, setLoading] = useState(false);

  // Handle status change (Approve/Reject)
  const handleRequestStatusChange = async (requestId, status) => {
    setLoading(true);
    try {
      let response;
      if (status === "PROCESSED") {
        response = await apiClient.put(`/book-requests/process/${requestId}`);
      } else if (status === "CANCELLED") {
        response = await apiClient.delete(`/book-requests/cancel/${requestId}`);
      }

      // After the request is processed, update the local state
      if (response.status === 200 || response.status === 204) {
        onHandleRequestStatusChange(requestId, status);
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
    <div className="bg-white p-4 rounded-lg shadow-lg mb-8">
      <h3 className="text-2xl font-bold mb-4">Book Requests</h3>
      {loading && <p>Processing request...</p>}
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Book Title</th>
            <th className="px-4 py-2 text-left">User Name</th>
            <th className="px-4 py-2 text-left">User ID</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookRequests.map((request) => (
            <tr key={request.id} className="border-t">
              <td className="px-4 py-2">{request.id}</td>
              <td className="px-4 py-2">{request.book.title}</td>
              <td className="px-4 py-2">{request.user.firstName + " " + request.user.lastName}</td>
              <td className="px-4 py-2">{request.user.id}</td>
              <td className="px-4 py-2">{request.status}</td>
              <td className="px-4 py-2">
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
  );
};

export default BookRequestsList;