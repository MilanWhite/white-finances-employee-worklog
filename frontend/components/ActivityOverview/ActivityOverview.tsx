import React from "react";

import { BanknotesIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { Activity } from "../../pages/employee/EmployeeDashboard";

interface ActivityOverviewProps {
    activities: Activity[];
}

const ActivityOverview = ({ activities }: ActivityOverviewProps) => {
    return (
        <>
            <h2 className="mx-auto mt-8 max-w-6xl px-4 text-lg/6 font-medium text-gray-900 sm:px-6 lg:px-8">
                Recent activity
            </h2>
            <div className="shadow-sm sm:hidden">
                <ul
                    role="list"
                    className="mt-2 divide-y divide-gray-200 overflow-hidden shadow-sm sm:hidden"
                >
                    {activities.map((activity) => (
                        <li key={activity.id}>
                            <a
                                href={activity.href}
                                className="block bg-white px-4 py-4 hover:bg-gray-50"
                            >
                                <span className="flex items-center space-x-4">
                                    <span className="flex flex-1 space-x-2 truncate">
                                        <BanknotesIcon
                                            aria-hidden="true"
                                            className="size-5 shrink-0 text-gray-400"
                                        />
                                        <span className="flex flex-col truncate text-sm text-gray-500">
                                            <span className="truncate">
                                                {activity.action}
                                            </span>
                                            <span>
                                                {activity.hoursWorked &&
                                                    activity.hoursWorked}
                                            </span>
                                            <time dateTime={activity.datetime}>
                                                {activity.timestamp}
                                            </time>
                                        </span>
                                    </span>
                                    <ChevronRightIcon
                                        aria-hidden="true"
                                        className="size-5 shrink-0 text-gray-400"
                                    />
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>

                <nav
                    aria-label="Pagination"
                    className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3"
                >
                    <div className="flex flex-1 justify-between">
                        <a
                            href="#"
                            className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                        >
                            Previous
                        </a>
                        <a
                            href="#"
                            className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                        >
                            Next
                        </a>
                    </div>
                </nav>
            </div>

            {/* Activity table (small breakpoint and up) */}
            <div className="hidden sm:block">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="mt-2 flex flex-col">
                        <div className="min-w-full overflow-hidden overflow-x-auto align-middle shadow-sm sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th
                                            scope="col"
                                            className="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900"
                                        >
                                            Action
                                        </th>
                                        <th
                                            scope="col"
                                            className="bg-gray-50 px-6 py-3 text-center text-sm font-semibold text-gray-900 whitespace-nowrap"
                                        >
                                            Hours Worked
                                        </th>
                                        <th
                                            scope="col"
                                            className="hidden bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900 md:block"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"
                                        >
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {activities.map((activity) => (
                                        <tr
                                            key={activity.id}
                                            className="bg-white"
                                        >
                                            <td className="w-full max-w-0 px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                                                <div className="flex">
                                                    <a
                                                        href={activity.href}
                                                        className="group inline-flex space-x-2 truncate text-sm"
                                                    >
                                                        <BanknotesIcon
                                                            aria-hidden="true"
                                                            className="size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                                                        />
                                                        <p className="truncate text-gray-500 group-hover:text-gray-900">
                                                            {activity.action}
                                                        </p>
                                                    </a>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm whitespace-nowrap text-gray-500">
                                                {activity.hoursWorked &&
                                                    activity.hoursWorked}
                                            </td>
                                            <td className="hidden px-6 py-4 text-sm whitespace-nowrap text-gray-500 md:block">
                                                <span
                                                    className={
                                                        `${
                                                            activity.onTime
                                                                ? "bg-green-100 text-green-800"
                                                                : "bg-red-100 text-red-800"
                                                        }` +
                                                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize"
                                                    }
                                                >
                                                    {activity.onTime
                                                        ? "On Time"
                                                        : `${
                                                              activity.action ===
                                                              "Clocked In"
                                                                  ? "Late"
                                                                  : "Early Clockout"
                                                          }`}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm whitespace-nowrap text-gray-500">
                                                <time
                                                    dateTime={activity.datetime}
                                                >
                                                    {activity.timestamp}
                                                </time>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            <nav
                                aria-label="Pagination"
                                className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
                            >
                                <div className="hidden sm:block">
                                    <p className="text-sm text-gray-700">
                                        Showing{" "}
                                        <span className="font-medium">1</span>{" "}
                                        to{" "}
                                        <span className="font-medium">10</span>{" "}
                                        of{" "}
                                        <span className="font-medium">20</span>{" "}
                                        results
                                    </p>
                                </div>
                                <div className="flex flex-1 justify-between gap-x-3 sm:justify-end">
                                    <a
                                        href="#"
                                        className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:ring-gray-400"
                                    >
                                        Previous
                                    </a>
                                    <a
                                        href="#"
                                        className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:ring-gray-400"
                                    >
                                        Next
                                    </a>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ActivityOverview;
