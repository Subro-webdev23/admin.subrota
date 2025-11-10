import React from "react";
import { BarChart3, Users, Settings } from "lucide-react";

const Sidebar = ({ isOpen }) => {
    return (
        <aside
            className={`${isOpen ? "w-64" : "w-16"
                } bg-gray-900 fixed min-h-screen text-white transition-all duration-300 flex flex-col`}
        >
            <div className="p-4 text-lg font-bold">Admin</div>
            <nav className="flex-1">
                <ul>
                    <li className="flex items-center gap-3 p-3 hover:bg-gray-700 cursor-pointer">
                        <BarChart3 size={20} />
                        {isOpen && <span>Dashboard</span>}
                    </li>
                    <li className="flex items-center gap-3 p-3 hover:bg-gray-700 cursor-pointer">
                        <Users size={20} />
                        {isOpen && <span>Users</span>}
                    </li>
                    <li className="flex items-center gap-3 p-3 hover:bg-gray-700 cursor-pointer">
                        <Settings size={20} />
                        {isOpen && <span>Settings</span>}
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
