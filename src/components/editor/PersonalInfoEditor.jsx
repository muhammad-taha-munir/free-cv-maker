import React from 'react';
import { useCV } from '../../context/CVContext';

const PersonalInfoEditor = () => {
    const { cv, updatePersonalInfo } = useCV();
    const { personalInfo } = cv;

    const handleChange = (e) => {
        const { name, value } = e.target;
        updatePersonalInfo(name, value);
    };

    return (
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <h2 className="font-semibold text-lg mb-4 text-gray-700">Personal Information</h2>
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={personalInfo.fullName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. John Doe"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={personalInfo.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. john@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={personalInfo.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. +1 234 567 890"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={personalInfo.address}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. New York, USA"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website / LinkedIn</label>
                    <input
                        type="text"
                        name="website"
                        value={personalInfo.website}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. linkedin.com/in/johndoe"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
                    <textarea
                        name="summary"
                        value={personalInfo.summary}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Brief professional summary..."
                    />
                </div>
            </div>
        </div>
    );
};

export default PersonalInfoEditor;
