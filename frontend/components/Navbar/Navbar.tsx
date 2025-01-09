import React from "react";

import {
    MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

import { Bars3CenterLeftIcon, BellIcon } from "@heroicons/react/24/outline";
import ProfileDropdown from "./ProfileDropdown/ProfileDropdown";

interface NavbarProps {
    setSidebarOpen: (bool: boolean) => void;
}

const Navbar = ({ setSidebarOpen }: NavbarProps) => {
    return (
        <div className="flex h-16 shrink-0 border-b border-main bg-white lg:border-none">
            <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="border-r border-light px-4 text-light1 focus:ring-2 focus:ring-slate-blue focus:outline-hidden focus:ring-inset lg:hidden"
            >
                <span className="sr-only">Open sidebar</span>
                <Bars3CenterLeftIcon aria-hidden="true" className="size-6" />
            </button>

            {/* Search bar */}
            <div className="flex flex-1 justify-between px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
                <div className="flex flex-1">
                    <form
                        action="#"
                        method="GET"
                        className="grid flex-1 grid-cols-1"
                    >
                        <input // when a user searches something it takes them to the activity page
                            name="search"
                            type="search"
                            placeholder="Search activity"
                            aria-label="Search"
                            className="col-start-1 row-start-1 block size-full bg-white pl-8 text-base text-dark outline-hidden placeholder:text-light1 sm:text-sm/6"
                        />
                        <MagnifyingGlassIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 size-5 self-center text-light1"
                        />
                    </form>
                </div>
                <div className="ml-4 flex items-center md:ml-6">
                    <button
                        type="button"
                        className="relative rounded-full bg-white p-1 text-light1 hover:text-light focus:ring-slate-blue focus:ring-slate-blue focus:ring-offset-2 focus:outline-hidden"
                    >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon aria-hidden="true" className="size-6" />
                    </button>

                    <ProfileDropdown/>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
