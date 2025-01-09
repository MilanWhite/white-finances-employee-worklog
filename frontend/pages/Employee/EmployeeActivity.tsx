import React, { useState } from "react";

import Sidebar from "../../components/Sidebar";

import Navbar from "../../components/Navbar";
import { navigation, secondaryNavigation } from "./EmployeeDashboard";
import { ROUTES } from "../../../shared/routes";

export function EmployeeActivity() {
    
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const updatedNavigation = navigation.map((item) => ({
        ...item,
        current: item.href === ROUTES.EMPLOYEE_ACTIVITY,
    }));
    
    return (
        <>
            <div className="min-h-full">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    navigation={updatedNavigation}
                    secondaryNavigation={secondaryNavigation}
                />

                <div className="flex flex-1 flex-col lg:pl-64">
                    <main className="flex-1 pb-8">
                        <Navbar setSidebarOpen={setSidebarOpen} />

                        <div className="mt-8">
                            Activity
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
