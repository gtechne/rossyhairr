import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { setUserDetails } from "../store/userSlice";
import { useDispatch } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const UserMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const fetchData = await fetch(SummaryApi.logout_user.url, {
            method: SummaryApi.logout_user.method,
            credentials: "include",
        });

        const data = await fetchData.json();

        if (data.success) {
            toast.success(data.message);
            dispatch(setUserDetails(null));
            navigate("/");
        }

        if (data.error) {
            toast.error(data.message);
        }
    };

    return (
        <div className="p-4">
            <nav className="grid gap-2">
                <Link to={"/dashboard/profile"} className="px-4 py-2 rounded-md hover:bg-gray-100">
                    Profile
                </Link>
                <Link to={"my-order"} className="px-4 py-2 rounded-md hover:bg-gray-100">
                    My Orders
                </Link>
                <button
                    onClick={handleLogout}
                    className="text-left px-4 py-2 rounded-md hover:bg-gray-100"
                >
                    Log Out
                </button>
            </nav>
        </div>
    );
};

export default UserMenu;
