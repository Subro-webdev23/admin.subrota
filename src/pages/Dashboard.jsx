import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { fetchProjects } from "../api/api";

const COLORS = ["#60a5fa", "#34d399", "#fbbf24"];

const Dashboard = () => {

    const [projects, setProjects] = useState([]);
    const [ongoingProjects, setOngoingProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log(projects);


    // Fetch Projects
    const loadProjects = async () => {
        try {
            const data = await fetchProjects();
            const finished = data.filter((p) => p.status !== "ongoing");
            setProjects(finished);
            const ongoing = data.filter((p) => p.status === "ongoing");
            setOngoingProjects(ongoing);
        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadProjects();
    }, []);
    const data = [
        { name: "Ongoing Projects", value: ongoingProjects.length },
        { name: "Finished Projects", value: projects.length },
        { name: "Upcoming Projects", value: 2 },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-700 text-lg font-medium">Loading...</p>
                </div>
            </div>
        );
    }
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>

            {/* Pie Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                <h3 className="text-lg font-semibold mb-2">Overview Description</h3>
                <p className="text-gray-700">
                    This dashboard provides an overview of all project statuses including ongoing,
                    completed, and upcoming ones. The pie chart helps visualize the overall project
                    distribution at a glance.
                </p>
            </div>

            {/* Ongoing Projects */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                <h3 className="text-lg font-semibold mb-4">Ongoing Projects</h3>
                <div className="space-y-4">
                    {ongoingProjects.map((p, i) => (
                        <div key={i} className="border-b pb-3">
                            <h4 className="font-semibold text-gray-800">{p.name}</h4>
                            <p className="text-gray-600 text-sm">{p.description}</p>
                            <a
                                href={p.liveLink}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-500 text-sm hover:underline"
                            >
                                Live Preview
                            </a>
                        </div>
                    ))}
                </div>
            </div>

            {/* Finished Projects */}
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4">Finished Projects</h3>
                <div className="space-y-4">
                    {projects.map((p, i) => (
                        <div key={i} className="border-b pb-3">
                            <h4 className="font-semibold text-gray-800">{p.name}</h4>
                            <p className="text-gray-600 text-sm">{p.description}</p>
                            <a
                                href={p.liveLink}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-500 text-sm hover:underline"
                            >
                                Live Preview
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
