import React from "react";

const ContactPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          Contact Us
        </h1>
        <p className="text-lg text-gray-700 mb-4 text-center">
          We are here to help you 24/7. Feel free to reach out to us!
        </p>
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">Support Email</h2>
            <p className="text-gray-700">shreyj@acxiom.com</p>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">Phone Numbers</h2>
            <p className="text-gray-700">6667778885</p>
            <p className="text-gray-700">6667778886</p>
          </div>
          <div className="text-center mt-6">
            <button className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700">
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
