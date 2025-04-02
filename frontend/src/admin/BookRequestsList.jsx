import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

const BookRequestsList = () => {
  const [loading, setLoading] = useState(false);
  const [bookRequests, setBookRequests] = useState([]);
  const [error, setError] = useState("");

  // Handle status change (Approve/Reject)
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
            request.id === requestId
              ? { ...request, status, processedAt: new Date().toISOString() } // Set processedAt time
              : request
          )
        );
        alert(`Request ${status === "PROCESSED" ? "approved" : "rejected"} successfully!`);
      }
    } catch (error) {
      console.error("Error processing request:", error);
      alert("Error processing the request.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchBookRequests = async () => {
      try {
        const response = await apiClient.get("/book-requests/all"); // Adjust endpoint to fetch all book requests
        setBookRequests(response.data);
      } catch (error) {
        setError("Failed to fetch book requests");
      }
    };

    fetchBookRequests();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm w-11/12 mx-auto mt-8">
      <h3 className="text-3xl font-bold mb-4">Book Requests</h3>
      {loading && <p>Processing request...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="max-h-[33rem] overflow-auto border">
        <table className="min-w-full bg-white rounded-lg border border-gray-300 shadow-sm">
          <thead>
            <tr className="text-center">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Book Title</th>
              <th className="px-4 py-2 border">User Name</th>
              <th className="px-4 py-2 border">User ID</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Requested On</th>
              <th className="px-4 py-2 border">Issued On</th>
              <th className="px-4 py-2 border">Returned On</th>
              <th className="px-4 py-2 border">Fine</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookRequests.map((request) => (
              <tr key={request.id} className="border-t text-center">
                <td className="px-4 py-2 border text-center">{request.id}</td>
                <td className="px-4 py-2 border text-center">{request.book.title}</td>
                <td className="px-4 py-2 border text-center">{request.user.firstName + " " + request.user.lastName}</td>
                <td className="px-4 py-2 border text-center">{request.user.id}</td>
                <td className="px-4 py-2 border text-center">{request.status}</td>
                <td className="px-4 py-2 border text-center">
                  {new Date(request.requestedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border text-center">
                  {request.processedAt ? new Date(request.processedAt).toLocaleDateString() : "N/A"}
                </td>
                <td className="px-4 py-2 border text-center">
                  {request.returnedAt ? new Date(request.returnedAt).toLocaleDateString() : "N/A"}
                </td> {/* Display returnedAt */}
                <td className="px-4 py-2 border text-center">{request.fineAmount} ₹</td>
                <td className="px-4 py-2 border text-center">
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
    </div>
  );
};

export default BookRequestsList;
