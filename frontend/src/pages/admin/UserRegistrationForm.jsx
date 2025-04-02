import React, { useState } from 'react';
import apiClient from '../../api/apiClient';
import { toast } from 'react-toastify';

const UserRegistrationForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate fields
        const newErrors = {};
        if (!firstName) newErrors.firstName = 'First name is required';
        if (!lastName) newErrors.lastName = 'Last name is required';
        if (!email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setSubmissionMessage('');
            setIsSubmitting(true);

            const user = {
                firstName,
                lastName,
                email,
                phoneNumber,
                role: isAdmin ? 'ADMIN' : 'USER',
            };

            try {
                const response = await apiClient.post('/admin/register', user);
                setSubmissionMessage(response.data);
                toast.success(response.data);
                setFirstName('');
                setLastName('');
                setEmail('');
                setphoneNumber('');
                setIsAdmin(false);
            } catch (error) {
                setSubmissionMessage('Error: Could not register the user. Please try again.');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Register User</h1>
            <form onSubmit={handleSubmit}>
                {/* First Name */}
                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>

                {/* Last Name */}
                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setphoneNumber(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                </div>

                {/* Role Toggle */}
                <div className="mb-4 flex items-center">
                    <label htmlFor="isAdmin" className="block text-sm font-medium text-gray-700 mr-4">
                        Role:
                    </label>
                    <div className="flex items-center space-x-4">
                        <span className={`text-sm font-medium ${!isAdmin ? "text-indigo-600" : "text-gray-500"}`}>
                            User
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                id="isAdmin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="relative w-12 h-6">
                                <input
                                    type="checkbox"
                                    id="isAdmin"
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                    className="sr-only peer"
                                />
                                <div
                                    className="w-full h-full bg-gray-300 rounded-full peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 transition-colors duration-200 
                   peer-checked:bg-indigo-600"
                                ></div>
                                <div
                                    className="absolute top-0.5 left-0.5 w-5 h-5 bg-white border border-gray-300 rounded-full shadow-sm 
                   peer-checked:translate-x-6 peer-checked:border-white transition-transform duration-200"
                                ></div>
                            </div>

                        </label>
                        <span className={`text-sm font-medium ${isAdmin ? "text-indigo-600" : "text-gray-500"}`}>
                            Admin
                        </span>
                    </div>
                </div>


                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
                >
                    {isSubmitting ? 'Registering...' : 'Register'}
                </button>
            </form>

            {/* Submission Message */}
            {submissionMessage && (
                <div className="mt-4 text-center">
                    <p className={`text-lg ${submissionMessage.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                        {submissionMessage}
                    </p>
                </div>
            )}
        </div>
    );
};

export default UserRegistrationForm;
