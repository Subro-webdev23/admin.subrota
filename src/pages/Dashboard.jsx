import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
    { name: "Ongoing Projects", value: 4 },
    { name: "Finished Projects", value: 6 },
    { name: "Upcoming Projects", value: 2 },
];

const COLORS = ["#60a5fa", "#34d399", "#fbbf24"];

const ongoingProjects = [
    {
        title: "E-Commerce Dashboard",
        description: "Developing analytics and admin panel for product tracking.",
        link: "https://example.com/ecommerce",
    },
    {
        title: "Travel Booking Site",
        description: "Working on flight booking and dynamic search filters.",
        link: "https://example.com/travel",
    },
];

const finishedProjects = [
    {
        title: "Portfolio Website",
        description: "Personal portfolio built with React and TailwindCSS.",
        link: "https://example.com/portfolio",
    },
    {
        title: "Restaurant Landing Page",
        description: "Built a modern responsive landing page for a restaurant.",
        link: "https://example.com/restaurant",
    },
];

const Dashboard = () => {
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
                            <h4 className="font-semibold text-gray-800">{p.title}</h4>
                            <p className="text-gray-600 text-sm">{p.description}</p>
                            <a
                                href={p.link}
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
                    {finishedProjects.map((p, i) => (
                        <div key={i} className="border-b pb-3">
                            <h4 className="font-semibold text-gray-800">{p.title}</h4>
                            <p className="text-gray-600 text-sm">{p.description}</p>
                            <a
                                href={p.link}
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
