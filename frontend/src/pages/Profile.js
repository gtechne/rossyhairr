import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import imageTobase64 from '../helpers/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const Profile = () => {
    const user = useSelector((state)=> state?.user?.user);
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        name: "",
        profilePic: "",
        address: "",
        phone:"",
    });

    useEffect(() => {
        if (!user?._id) {
            navigate("/");
        } else {
            setData({
                email: user.email,
                name: user.name,
                profilePic: user.profilePic,
                address: user.address || "",
                phone: user.phone || "",
            });
        }
    }, [user, navigate]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUploadPic = async (e) => {
        const file = e.target.files[0];
        const imagePic = await imageTobase64(file);
        setData((prev) => ({
            ...prev,
            profilePic: imagePic,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
    
        try {
            const response = await fetch(SummaryApi.updateUser.url, {
                method: SummaryApi.updateUser.method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Include token in headers
                },
                credentials: "include", // Ensure cookies are sent with the request
                body: JSON.stringify(data),
            });
    
            const result = await response.json();
    
            if (result.success) {
                toast.success(result.message);
            } else {
                toast.error(result.message || "Failed to update profile.");
            }
        } catch (error) {
            toast.error("An error occurred while updating the profile.");
        }
    };
    

    return (
        <div className="p-4 max-w-md mx-auto sm:max-w-lg lg:max-w-xl">
            <div className="flex flex-col items-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-300 flex items-center justify-center rounded-full overflow-hidden shadow-md">
                    {data.profilePic ? (
                        <img src={data.profilePic} className="w-full h-full object-cover rounded-full" alt={data.name} />
                    ) : (
                        <FaRegUserCircle size={65} />
                    )}
                </div>
                <label className="text-sm border border-primary-100 hover:border-primary-200 hover:bg-primary-200 px-4 py-2 rounded-full mt-3 cursor-pointer">
                    Upload Photo
                    <input type="file" className="hidden" onChange={handleUploadPic} />
                </label>
                <p className="capitalize text-lg font-semibold mt-2">{data.name}</p>
                <p className="text-sm text-gray-500">{data.email}</p>
            </div>

            <form className="my-6 grid gap-4" onSubmit={handleSubmit}>
                <div className="grid">
                    <label className="text-sm font-semibold">Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="p-2 bg-blue-50 outline-none border rounded focus:border-primary-200"
                        name="name"
                        value={data.name}
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <div className="grid">
                    <label htmlFor="email" className="text-sm font-semibold">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="p-2 bg-blue-50 outline-none border rounded focus:border-primary-200"
                        name="email"
                        value={data.email}
                        onChange={handleOnChange}
                        required
                    />
                </div>
                <div className="grid">
                    <label htmlFor="address" className="text-sm font-semibold">Address</label>
                    <input
                        type="text"
                        id="address"
                        placeholder="Enter your address"
                        className="p-2 bg-blue-50 outline-none border rounded focus:border-primary-200"
                        name="address"
                        value={data.address}
                        onChange={handleOnChange}
                    />
                </div>
                <div className="grid">
                    <label htmlFor="phone" className="text-sm font-semibold">Phone Number</label>
                    <input
                        type="number"
                        id="phone"
                        placeholder="Enter your Phone Number"
                        className="p-2 bg-blue-50 outline-none border rounded focus:border-primary-200"
                        name="phone"
                        value={data.phone}
                        onChange={handleOnChange}
                    />
                </div>
                <button type="submit" className="border px-4 py-2 font-semibold hover:bg-primary-100 border-primary-100 text-primary-200 hover:text-neutral-800 rounded w-full">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default Profile;