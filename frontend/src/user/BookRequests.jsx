import React, { useEffect, useState } from 'react';
import { useAuth } from "../security/AuthContext";
import apiClient from "../api/apiClient";
import { toast } from 'react-toastify';

const BookRequests = () => {

    const [bookRequests, setBookRequests] = useState([]);
    const userId = useAuth().userId;

    useEffect(() => {

        if (userId) {
            fetchUserBookRequests();
        }
    }, [userId]);

    const handleCancelRequest = async (requestId) => {
        try {
            await apiClient.put(`/book-requests/cancel/${requestId}`);
            fetchUserBookRequests();
            toast.success('Book request cancelled');
        } catch (error) {
            console.error('Error cancelling book request:', error);
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

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm w-11/12 mx-auto mt-8">
            <h3 className="text-3xl font-bold mb-4">Your Book Requests</h3>
            {bookRequests.length === 0 ? (
                <p className="text-gray-500 text-center italic py-4">No any requests</p>
            ) : (
                <div className="max-h-[33rem] overflow-auto border">
                    <table className="min-w-full bg-white rounded-lg border border-gray-300 shadow-sm">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-center text-gray-600 border">ID</th>
                                <th className="px-4 py-2 text-center text-gray-600 border">Book Title</th>
                                <th className="px-4 py-2 text-center text-gray-600 border">Status</th>
                                <th className="px-4 py-2 border text-center">Requested On</th>
                                <th className="px-4 py-2 border text-center">Issued On</th>
                                <th className="px-4 py-2 border text-center">Returned On</th>
                                <th className="px-4 py-2 border text-center">Fine</th>
                                <th className="px-4 py-2 text-center text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookRequests.map((request) => (
                                <tr key={request.id}>
                                    <td className="px-4 py-2 text-center border">{request.id}</td>
                                    <td className="px-4 py-2 text-center border">{request.book.title}</td>
                                    <td className="px-4 py-2 text-center border">{request.status}</td>
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
                                    <td className="px-4 py-2 text-center border">
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
                </div>)}
        </div>
    )
}

export default BookRequests;