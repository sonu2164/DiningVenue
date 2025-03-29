import React, { useState } from 'react';
import toast from 'react-hot-toast';

const FeedbackForm = ({ orderId, onClose, onSubmit }) => {
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!feedback.trim()) {
            toast.error("Feedback cannot be empty!");
            return;
        }

        onSubmit({ orderId, feedback });
        toast.success("Feedback submitted successfully!");
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-center text-xl font-bold mb-4">Give Feedback</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write your feedback here..."
                        rows="4"
                    />
                    <div className="flex justify-end space-x-3">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FeedbackForm;
