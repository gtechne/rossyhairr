import React, { useContext, useState } from "react";
import { GrSearch } from "react-icons/gr";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";
import logoImg from "../assest/logo1.png";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.get("q") || "";
  const [search, setSearch] = useState(searchQuery);
  const [showSearch, setShowSearch] = useState(false);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      localStorage.removeItem("authToken");
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    navigate(value ? `/search?q=${value}` : "/search");
  };

  return (
    <>
      {/* Header for Desktop & Mobile */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-md h-16 flex items-center justify-between px-4 z-50">
        {/* Logo */}
        <div className="w-16 h-16">
          <Link to="/">
            <img src={logoImg} alt="Rossy Hairs Logo" className="h-full" />
          </Link>
        </div>

        {/* Search Bar (Hidden on Mobile) */}
        <div className="hidden lg:flex items-center w-full max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Search product here..."
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <button className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </button>
        </div>

        {/* User Profile, Cart, and Login/Logout */}
        <div className="flex items-center gap-5">
          {/* User Profile */}
          {user?._id && (
            <div
              className="text-2xl cursor-pointer relative"
              onClick={() => setMenuDisplay((prev) => !prev)}
            >
              {user?.profilePic ? (
                <img
                  src={user?.profilePic}
                  className="w-8 h-8 rounded-full"
                  alt={user?.name}
                />
              ) : (
                <FaRegCircleUser />
              )}
            </div>
          )}

          {/* Dropdown Menu for User Profile */}
          {menuDisplay && (
            <div className="absolute bg-white top-14 right-4 shadow-lg rounded p-2">
              <nav>
                {user?.role === ROLE.ADMIN && (
                  <Link
                    to={"/admin-panel/admin-home"}
                    className="block hover:bg-slate-100 p-2"
                    onClick={() => setMenuDisplay(false)}
                  >
                    Admin Panel
                  </Link>
                )}
                <Link
                  to={"/dashboard/profile"}
                  className="block hover:bg-slate-100 p-2"
                  onClick={() => setMenuDisplay(false)}
                >
                  My Profile
                </Link>
              </nav>
            </div>
          )}

          {/* Shopping Cart */}
          {user?._id && (
            <Link to={"/cart"} className="hidden lg:flex text-2xl relative">
              <FaShoppingCart />
              {context?.cartProductCount > 0 && (
                <span className="bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-3">
                  {context?.cartProductCount}
                </span>
              )}
            </Link>
          )}

          {/* Login / Logout Button */}
          {user?._id ? (
            <button
              onClick={handleLogout}
              className="hidden lg:flex px-4 py-2 rounded-full text-white bg-red-600 hover:bg-red-700"
            >
              Logout
            </button>
          ) : (
            <Link
              to={"/login"}
              className="hidden lg:flex px-4 py-2 rounded-full text-white bg-red-600 hover:bg-red-700"
            >
              Login
            </Link>
          )}
        </div>
      </header>

      {/* Search Bar for Mobile (Fixed when opened) */}
      {showSearch && (
        <div className="fixed top-16 left-0 w-full bg-white shadow-md p-2 flex items-center z-50">
          <input
            type="text"
            placeholder="Search product here..."
            className="w-full outline-none border p-2 rounded-md"
            onChange={handleSearch}
            value={search}
          />
          <button onClick={() => setShowSearch(false)} className="ml-2">
            ✖
          </button>
        </div>
      )}

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 w-full bg-white shadow-md p-2 flex justify-around items-center z-50 lg:hidden">
        <button onClick={() => setShowSearch(true)}>
          <GrSearch size={24} />
        </button>

        {user?._id && (
          <Link to={"/cart"} className="relative">
            <FaShoppingCart size={24} />
            {context?.cartProductCount > 0 && (
              <span className="bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center absolute -top-2 -right-3">
                {context?.cartProductCount}
              </span>
            )}
          </Link>
        )}

        {user?._id ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-full text-white bg-red-600 hover:bg-red-700"
          >
            Logout
          </button>
        ) : (
          <Link
            to={"/login"}
            className="px-4 py-2 rounded-full text-white bg-red-600 hover:bg-red-700"
          >
            Login
          </Link>
        )}
      </nav>

      {/* Prevent Content Overlapping */}
      <div
        className={`pt-16 ${
          showSearch ? "mt-14" : ""
        } pb-16 lg:pb-0`}
      ></div>
    </>
  );
};

export default Header;
