import React, { ComponentType, SVGProps, useState } from "react";

import Sidebar from "../components/Sidebar";

import {
    ClockIcon,
    CogIcon,
    CreditCardIcon,
    DocumentChartBarIcon,
    HomeIcon,
    QuestionMarkCircleIcon,
    ScaleIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    CalendarDaysIcon
} from "@heroicons/react/24/outline";

import Navbar from "../components/Navbar";
import PersonalHeader from "../components/PersonalHeader";
import OverviewCards from "../components/OverviewCards";
import ActivityOverview from "../components/ActivityOverview";

export interface SidebarNavigationType {
    name: string;
    href: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    current?: boolean;
}

const navigation: SidebarNavigationType[] = [
    { name: "Home", href: "#", icon: HomeIcon, current: true },
    { name: "History", href: "#", icon: ClockIcon, current: false },
    { name: "Balances", href: "#", icon: ScaleIcon, current: false },
    { name: "Cards", href: "#", icon: CreditCardIcon, current: false },
    { name: "Recipients", href: "#", icon: UserGroupIcon, current: false },
    { name: "Reports", href: "#", icon: DocumentChartBarIcon, current: false },
];
const secondaryNavigation: SidebarNavigationType[] = [
    { name: "Settings", href: "#", icon: CogIcon },
    { name: "Help", href: "#", icon: QuestionMarkCircleIcon },
    { name: "Privacy", href: "#", icon: ShieldCheckIcon },
];

export interface Card {
    name: string;
    href: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    value: string;
    aValue: string;
}

const overviewCards = [
    {
        name: "Upcoming Shift",
        href: "#",
        icon: CalendarDaysIcon,
        value: "Jan 8, 2025, 5:00 PM",
        aValue: "View Schedule",
    },
    {
        name: "Weekly Hours",
        href: "#",
        icon: ClockIcon,
        value: "25.5 hrs",
        aValue: "View Activity",
    },
];

export interface Activity {
    id: number;
    action: string;
    href: string;
    hoursWorked: string;
    onTime: boolean;
    timestamp: string;
    datetime: string;
}

const activities: Activity[] = [
    {
        id: 2,
        action: "Clocked Out",
        href: "/attendance/2",
        hoursWorked: "8 hrs",
        onTime: true,
        timestamp: "Jan 8, 2025, 5:00 PM",
        datetime: "2025-01-08T17:00:00",
    },
    {
        id: 1,
        action: "Clocked In",
        href: "/attendance/1",
        hoursWorked: "",
        onTime: true,
        timestamp: "Jan 8, 2025, 8:00 AM",
        datetime: "2025-01-08T08:00:00",
    },

    {
        id: 4,
        action: "Clocked Out",
        href: "/attendance/5",
        hoursWorked: "6 hrs",
        onTime: false,
        timestamp: "Jan 6, 2025, 3:00 PM",
        datetime: "2025-01-06T15:00:00",
    },
    {
        id: 3,
        action: "Clocked In",
        href: "/attendance/4",
        hoursWorked: "",
        onTime: false,
        timestamp: "Jan 7, 2025, 9:00 AM",
        datetime: "2025-01-07T10:00:00",
    },
];
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export function EmployeeDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <div className="min-h-full">
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    navigation={navigation}
                    secondaryNavigation={secondaryNavigation}
                />

                <div className="flex flex-1 flex-col lg:pl-64">
                    <main className="flex-1 pb-8">
                        <Navbar setSidebarOpen={setSidebarOpen} />

                        <div className="bg-white shadow-sm">
                            <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
                                <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
                                    <PersonalHeader />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <OverviewCards overviewCards={overviewCards} />

                            <ActivityOverview activities={activities} />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
