import React, { useState } from "react";
import {
    Menu,
    X,
    LayoutDashboard,
    Users,
    Settings,
    BarChart3,
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import Dashboard from "../pages/Dashboard";

const Root = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [active, setActive] = useState("Dashboard");

    const navItems = [
        { name: "Dashboard", icon: <LayoutDashboard size={18} /> },
        { name: "Users", icon: <Users size={18} /> },
        { name: "Settings", icon: <Settings size={18} /> },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside
                className={`${isOpen ? "w-64" : "w-16"
                    } bg-white shadow-md transition-all duration-300 flex flex-col fixed h-full z-20`}
            >
                {/* Sidebar Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    {isOpen && (
                        <h2 className="text-xl font-bold text-gray-700 transition-all duration-300">
                            Admin
                        </h2>
                    )}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-1 rounded hover:bg-gray-200"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 p-2 mt-2">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li
                                key={item.name}
                                onClick={() => setActive(item.name)}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${active === item.name
                                    ? "bg-blue-600 text-white"
                                    : "text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {item.icon}
                                {isOpen && (
                                    <span className="whitespace-nowrap">{item.name}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Footer */}
                <div className="p-4 text-sm text-gray-500 border-t">
                    {isOpen && <p>© 2025 Admin Panel</p>}
                </div>
            </aside>

            {/* Main Content */}
            <main
                className={`flex-1 transition-all min-h-screen duration-300 ${isOpen ? "ml-64" : "ml-16"
                    } p-8 overflow-y-auto`}
            >
                {/* Dashboard Section */}
                {active === "Dashboard" && (
                    // <div>
                    //     <div className="flex items-center gap-2 mb-4">
                    //         <BarChart3 size={22} className="text-blue-600" />
                    //         <h1 className="text-2xl font-semibold text-gray-800">
                    //             Dashboard Overview
                    //         </h1>
                    //     </div>

                    //     {/* Chart Section */}
                    //     <div className="bg-white p-6 rounded-lg shadow mb-8">
                    //         <h2 className="text-lg font-semibold mb-4 text-gray-700">
                    //             Total Projects per Month
                    //         </h2>
                    //         <div className="w-full h-64">
                    //             <ResponsiveContainer>
                    //                 <BarChart data={chartData}>
                    //                     <CartesianGrid strokeDasharray="3 3" />
                    //                     <XAxis dataKey="name" />
                    //                     <YAxis />
                    //                     <Tooltip />
                    //                     <Bar dataKey="projects" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    //                 </BarChart>
                    //             </ResponsiveContainer>
                    //         </div>
                    //     </div>

                    //     {/* Ongoing Projects */}
                    //     <div className="bg-white p-6 rounded-lg shadow">
                    //         <h2 className="text-lg font-semibold mb-4 text-gray-700">
                    //             Ongoing Projects
                    //         </h2>
                    //         <div className="space-y-4">
                    //             {ongoingProjects.map((project, index) => (
                    //                 <div
                    //                     key={index}
                    //                     className="border rounded-lg p-4 hover:shadow-md transition"
                    //                 >
                    //                     <h3 className="font-semibold text-blue-600 text-lg">
                    //                         {project.title}
                    //                     </h3>
                    //                     <p className="text-gray-600 mt-1">{project.description}</p>
                    //                 </div>
                    //             ))}
                    //         </div>
                    //     </div>
                    // </div>
                    <Dashboard></Dashboard>
                )}

                {/* Users Page */}
                {active === "Users" && (
                    <h1 className="text-2xl font-semibold text-gray-800">
                        Manage Users
                    </h1>
                )}

                {/* Settings Page */}
                {active === "Settings" && (
                    <h1 className="text-2xl font-semibold text-gray-800">
                        System Settings
                    </h1>
                )}
            </main>
        </div>
    );
};

export default Root;
