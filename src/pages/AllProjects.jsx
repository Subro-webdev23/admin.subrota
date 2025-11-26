import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { deleteProject, fetchProjects, updateProject } from "../api/api";
import { useNavigate } from "react-router";

const AllProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const navigate = useNavigate();
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



    // Fetch Projects
    const loadProjects = async () => {
        try {
            const data = await fetchProjects();
            setProjects(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        loadProjects();
    }, []);

    // Delete Project (SweetAlert)
    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This project will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteProject(id);
                    setProjects((prev) => prev.filter((p) => p._id !== id));

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your project has been deleted.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                } catch (error) {
                    console.error("Error deleting project:", error);
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong while deleting the project.",
                        icon: "error",
                    });
                }
            }
        });
    };

    // Open Edit Modal
    const openEditModal = (project) => {
        setSelectedProject(project);
        setFormData({
            name: project.name || "",
            image: project.image || "",
            stack: project.stack ? project.stack.join(", ") : "",
            description: project.description || "",
            liveLink: project.liveLink || "",
            githubLink: project.githubLink || "",
            challenges: project.challenges || "",
            futurePlans: project.futurePlans || "",
            status: project.status || "",
        });
        setEditModalOpen(true);
    };
    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Update Project
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const updatedData = {
                name: formData.name,
                image: formData.image,
                description: formData.description,
                stack: formData.stack
                    ? formData.stack.split(",").map((t) => t.trim())
                    : [],
                liveLink: formData.liveLink,
                githubLink: formData.githubLink,
                challenges: formData.challenges,
                futurePlans: formData.futurePlans,
            };

            const updatedProject = await updateProject(selectedProject._id, updatedData);

            // state update
            setProjects((prev) =>
                prev.map((p) => (p._id === selectedProject._id ? updatedProject : p))
            );
            loadProjects()
            setEditModalOpen(false);

            Swal.fire({
                title: "Updated!",
                text: "Project updated successfully.",
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (error) {
            console.error("Error updating project:", error);
            Swal.fire({
                title: "Error!",
                text: "Failed to update project.",
                icon: "error",
            });
        }
    };

    return (
        <section className="py-10 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6">All Projects</h2>

                {loading ? (
                    <p className="text-gray-400">Loading projects...</p>
                ) : projects.length === 0 ? (
                    <p className="text-gray-500">No projects found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-400 rounded-lg">
                            <thead className=" text-gray-600">
                                <tr>
                                    <th className="py-3 px-4 text-left">#</th>
                                    <th className="py-3 px-4 text-left">Name</th>
                                    <th className="py-3 px-4 text-left">Image</th>
                                    <th className="py-3 px-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project, index) => (
                                    <tr
                                        key={project._id}
                                        className="border-t border-gray-400 hover:bg-[#cecece] transition-all"
                                    >
                                        <td className="py-3 px-4">{index + 1}</td>
                                        <td className="py-3 px-4 font-medium text-gray-800">
                                            {project.name}
                                        </td>
                                        <td className="py-3 px-4">
                                            <img
                                                src={project.image}
                                                alt={project.name}
                                                className="w-16 h-10 object-cover rounded"
                                            />
                                        </td>
                                        <td className="py-3 px-4 text-center">
                                            <button
                                                onClick={() => window.open(`${project.liveLink}`, "_blank")}
                                                className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-3 py-1 rounded-md mr-3"
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() => openEditModal(project)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md mr-3"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(project._id)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {editModalOpen && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-full max-w-xl h-[90vh] overflow-y-auto border border-gray-100">
                        <h3 className="text-xl font-semibold mb-4 text-cyan-600">
                            Edit Project
                        </h3>

                        <form onSubmit={handleUpdate} className="space-y-4">
                            {/* Project Name */}
                            <div>
                                <label className="block text-sm mb-1">Project Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:border-cyan-400"
                                    required
                                />
                            </div>

                            {/* Image URL */}
                            <div>
                                <label className="block text-sm mb-1">Image URL</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:border-cyan-400"
                                    required
                                />
                                {formData.image && (
                                    <img
                                        src={formData.image}
                                        alt="preview"
                                        className="w-32 h-20 object-cover rounded-md mt-2 border border-gray-700"
                                    />
                                )}
                            </div>

                            {/* Stack */}
                            <div>
                                <label className="block text-sm mb-1">Stack / Technologies</label>
                                <input
                                    type="text"
                                    name="stack"
                                    value={formData.stack}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:border-cyan-400"
                                    placeholder="e.g. React, Node.js, Tailwind"
                                />
                            </div>

                            {/* Project Status */}
                            <div>
                                <label className="block text-sm mb-1">Project Status</label>
                                <select
                                    name="status"
                                    defaultValue={formData.status}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:border-cyan-400"
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="finished">Finished</option>
                                    <option value="upcoming">Upcoming</option>
                                </select>
                            </div>

                            {/* Live Link */}
                            <div>
                                <label className="block text-sm mb-1">Live Link</label>
                                <input
                                    type="text"
                                    name="liveLink"
                                    value={formData.liveLink}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:border-cyan-400"
                                    placeholder="https://example.com"
                                />
                            </div>

                            {/* GitHub Link */}
                            <div>
                                <label className="block text-sm mb-1">GitHub Link</label>
                                <input
                                    type="text"
                                    name="githubLink"
                                    value={formData.githubLink}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:border-cyan-400"
                                    placeholder="https://github.com/username/repo"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:border-cyan-400"
                                    rows="3"
                                ></textarea>
                            </div>

                            {/* Challenges */}
                            <div>
                                <label className="block text-sm mb-1">Challenges</label>
                                <textarea
                                    name="challenges"
                                    value={formData.challenges}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:border-cyan-400"
                                    rows="2"
                                    placeholder="Mention key challenges you faced..."
                                ></textarea>
                            </div>

                            {/* Future Plans */}
                            <div>
                                <label className="block text-sm mb-1">Future Plans</label>
                                <textarea
                                    name="futurePlans"
                                    value={formData.futurePlans}
                                    onChange={handleChange}
                                    className="w-full bg-white border border-gray-600 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:border-cyan-400"
                                    rows="2"
                                    placeholder="What improvements or updates you plan..."
                                ></textarea>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 mt-5">
                                <button
                                    type="button"
                                    onClick={() => setEditModalOpen(false)}
                                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </section>
    );
};

export default AllProjects;
