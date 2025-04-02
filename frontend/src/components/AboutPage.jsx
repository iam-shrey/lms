import React from "react";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-4xl p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-center text-black-600 mb-6">
                    About Our Library Management System
                </h1>
                <p className="text-lg text-gray-700 mb-4">
                    Welcome to our Library Management System, your trusted companion for
                    managing books, readers, and library operations with ease and
                    efficiency. Our system is designed to make library management
                    seamless, reducing the workload for librarians and improving the
                    experience for library members.
                </p>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Key Features
                </h2>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                    <li>
                        <strong>Efficient Book Management:</strong> Add, update, and track
                        books with just a few clicks.
                    </li>
                    <li>
                        <strong>Reader Accounts:</strong> Manage memberships and keep track
                        of borrow and return history effortlessly.
                    </li>
                    <li>
                        <strong>Overdue Alerts:</strong> Keep fines under control.
                    </li>
                </ul>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Why Choose Us?
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                    Our Library Management System simplifies everyday tasks, allowing
                    librarians to focus on what truly matters: helping readers. With
                    advanced analytics and an intuitive interface, our platform adapts to
                    libraries of all sizes, ensuring no book goes unnoticed.
                </p>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Our Mission
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                    Our mission is to modernize library operations and make information
                    management accessible to everyone. We strive to create a system that
                    fosters learning, knowledge sharing, and efficient resource
                    utilization.
                </p>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Ready to Transform Your Library?
                </h2>
                <p className="text-lg text-gray-700 mb-6">
                    Whether you're managing a school library, a public library, or a
                    private collection, our system has everything you need to stay
                    organized and efficient. Start your journey toward a smarter library
                    today!
                </p>
                <div className="text-center">
                    <button className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
                    onClick={()=>navigate("/")}>
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;