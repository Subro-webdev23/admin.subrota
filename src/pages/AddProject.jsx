import React, { useState } from "react";

const AddProject = () => {
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        stack: "",
        description: "",
        liveLink: "",
        githubLink: "",
        challenges: "",
        futurePlans: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // ✅ Convert comma-separated fields to array
        const formattedData = {
            ...formData,
            stack: formData.stack.split(",").map((item) => item.trim()),
            challenges: formData.challenges.split(",").map((item) => item.trim()),
            futurePlans: formData.futurePlans.split(",").map((item) => item.trim()),
        };

        console.log("Project Data:", formattedData);
        alert("Project added successfully! (Check console for data)");
        // ⬇️ তুমি চাইলে এখানে MongoDB বা backend API call করতে পারো
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Project</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Project Name */}
                <div>
                    <label className="block text-gray-700 mb-1 font-medium">Project Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter project name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Image URL */}
                <div>
                    <label className="block text-gray-700 mb-1 font-medium">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        placeholder="https://example.com/image.png"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Stack */}
                <div>
                    <label className="block text-gray-700 mb-1 font-medium">Tech Stack</label>
                    <input
                        type="text"
                        name="stack"
                        placeholder="e.g. React, Tailwind, Firebase"
                        value={formData.stack}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Use commas to separate items</p>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-gray-700 mb-1 font-medium">Description</label>
                    <textarea
                        name="description"
                        placeholder="Write a short project description..."
                        value={formData.description}
                        onChange={handleChange}
                        rows="3"
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                {/* Live Link */}
                <div>
                    <label className="block text-gray-700 mb-1 font-medium">Live Link</label>
                    <input
                        type="text"
                        name="liveLink"
                        placeholder="https://example.com"
                        value={formData.liveLink}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* GitHub Link */}
                <div>
                    <label className="block text-gray-700 mb-1 font-medium">GitHub Link</label>
                    <input
                        type="text"
                        name="githubLink"
                        placeholder="https://github.com/user/repo"
                        value={formData.githubLink}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Challenges */}
                <div>
                    <label className="block text-gray-700 mb-1 font-medium">Challenges</label>
                    <input
                        type="text"
                        name="challenges"
                        placeholder="e.g. Authentication, Routing, Dynamic Data"
                        value={formData.challenges}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Use commas to separate items</p>
                </div>

                {/* Future Plans */}
                <div>
                    <label className="block text-gray-700 mb-1 font-medium">Future Plans</label>
                    <input
                        type="text"
                        name="futurePlans"
                        placeholder="e.g. Add booking, Integrate API"
                        value={formData.futurePlans}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Use commas to separate items</p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
                >
                    Add Project
                </button>
            </form>
        </div>
    );
};

export default AddProject;
