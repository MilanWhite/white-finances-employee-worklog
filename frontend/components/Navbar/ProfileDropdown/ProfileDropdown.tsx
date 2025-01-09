import React from "react"

import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/react";

import {
    ChevronDownIcon,
} from "@heroicons/react/20/solid";
import { ROUTES } from "../../../../shared/routes";
import apiClient from "../../../services/api-client";

const ProfileDropdown = () => {

    const logOut = async () => {
        try {
            await apiClient.post("/auth/logout")

            window.location.href = "/"
        } catch (error) {
            console.error('Error during sign out:', error);
        }
    }


    return (
        <Menu as="div" className="relative ml-3">
            <div>
                <MenuButton className="relative flex max-w-xs items-center rounded-full bg-white text-sm focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:outline-hidden lg:rounded-md lg:p-2 lg:hover:bg-gray-50">
                    <span className="absolute -inset-1.5 lg:hidden" />
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        className="size-8 rounded-full"
                    />
                    <span className="ml-3 hidden text-sm font-medium text-gray-700 lg:block">
                        <span className="sr-only">Open user menu for </span>
                        Emilia Birch
                    </span>
                    <ChevronDownIcon
                        aria-hidden="true"
                        className="ml-1 hidden size-5 shrink-0 text-gray-400 lg:block"
                    />
                </MenuButton>
            </div>
            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
                <MenuItem>
                    <a
                        href={ROUTES.EMPLOYEE_PROFILE}
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                        Your Profile
                    </a>
                </MenuItem>
                <MenuItem>
                    <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                        Settings
                    </a>
                </MenuItem>
                <MenuItem>
                    <a
                        onClick={logOut}
                        className="block px-4 py-2 cursor-pointer text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                    >
                        Logout
                    </a>
                </MenuItem>
            </MenuItems>
        </Menu>
    );
};

export default ProfileDropdown;
