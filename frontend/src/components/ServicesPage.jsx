import React from "react";

const ServicesPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-5xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          Our Services
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Explore the range of services we offer to streamline library
          operations and enhance the user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Book Management */}
          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Book Management
            </h2>
            <p className="text-gray-700">
              Easily add, update, and organize books. Track their availability
              and location within the library.
            </p>
          </div>

          {/* Member Accounts */}
          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Member Management
            </h2>
            <p className="text-gray-700">
              Manage memberships, borrowing history, and overdue fines for
              seamless library operations.
            </p>
          </div>

          {/* Search and Catalog */}
          {/* <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Search & Catalog
            </h2>
            <p className="text-gray-700">
              Provide a robust search feature for members to discover books by
              title, author, or genre effortlessly.
            </p>
          </div> */}

          {/* Notifications */}
          {/* <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Notifications & Alerts
            </h2>
            <p className="text-gray-700">
              Send automated alerts for due dates, overdue fines, and new
              arrivals to keep members informed.
            </p>
          </div> */}

          {/* Analytics */}
          {/* <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Analytics & Reporting
            </h2>
            <p className="text-gray-700">
              Gain insights into library usage with detailed analytics and
              reports for better decision-making.
            </p>
          </div> */}

          {/* Technical Support */}
          <div className="p-4 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Technical Support
            </h2>
            <p className="text-gray-700">
              Enjoy round-the-clock technical support to resolve any issues and
              ensure smooth operations.
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <button className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;