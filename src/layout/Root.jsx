import React, { useEffect, useState } from "react";
import {
    Menu, X, LayoutDashboard, Plus, Asterisk, LogOut,
} from "lucide-react";

import Dashboard from "../pages/Dashboard";
import AddProject from "../pages/AddProject";
import { Link, useNavigate } from "react-router";
import AllProjects from "../pages/AllProjects";

const Root = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [active, setActive] = useState("dashboard");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);
    console.log(isLoggedIn);


    const navItems = [
        { name: "Dashboard", icon: <LayoutDashboard size={18} />, route: "dashboard" },
        { name: "Add Project", icon: <Plus size={18} />, route: "addProject" },
        { name: "All Projects", icon: <Asterisk size={18} />, route: "allProject" },
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/");
    };

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
                                onClick={() => {
                                    setActive(item.route);
                                    navigate(item.route);
                                }}
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 ${active === item.route ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {item.icon}
                                {isOpen && <span className="whitespace-nowrap">{item.name}</span>}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Sign Out Button */}
                <div className="p-4 border-t">
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:scale-105 transition-all duration-200"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link
                            to="/auth"
                            className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold shadow-md hover:scale-105 transition-all duration-200"
                        >
                            Login
                        </Link>
                    )}
                </div>

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
                {active === "dashboard" && (
                    <Dashboard></Dashboard>
                )}

                {/* Users Page */}
                {active === "addProject" && (
                    <AddProject />
                )}

                {/* Settings Page */}
                {active === "allProject" && (
                    <AllProjects />
                )}
            </main>
        </div>
    );
};

export default Root;
