import { Link } from "react-router-dom";

const NavGuest = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <Link to="/" className="text-xl font-semibold text-gray-800 hover:text-gray-600">
                    Books
                </Link>
                <div className="flex space-x-4">
                    <Link to="/" className="text-gray-800 hover:text-gray-600">
                        Home
                    </Link>
                    <Link to="/login" className="text-gray-800 hover:text-gray-600">
                        Login
                    </Link>
                    <Link to="/register" className="text-gray-800 hover:text-gray-600">
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default NavGuest;