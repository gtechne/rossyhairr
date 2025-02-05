import React from 'react';
import UserMenu from '../components/UserMenu';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            
            <aside className="bg-white md:min-h-screen w-full md:w-60 shadow-md">
                <UserMenu />
            </aside>

            <main className="w-full h-full p-4">
                <Outlet />
            </main>

        </div>
    );
};

export default Dashboard;
