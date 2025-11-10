import React from "react";
import { Menu } from "lucide-react";

const Header = ({ toggleSidebar }) => {
    return (
        <header className="fixed top-0 left-64 right-0 z-10">
            <div className="shadow-md bg-white  flex items-center justify-between px-6 py-3">
                <button
                    onClick={toggleSidebar}
                    className="text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                    <Menu size={24} />
                </button>
                <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
            </div>
        </header>
    );
};

export default Header;
