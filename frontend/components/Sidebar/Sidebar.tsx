import React from "react";

import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    TransitionChild,
} from "@headlessui/react";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { SidebarNavigationType } from "../../pages/employee/EmployeeDashboard";

import { Logo } from "../Logo/Logo";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (bool: boolean) => void;
    navigation: SidebarNavigationType[];
    secondaryNavigation: SidebarNavigationType[];
}

const Sidebar = ({
    sidebarOpen,
    setSidebarOpen,
    navigation,
    secondaryNavigation,
}: SidebarProps) => {
    return (
        <>
            <Dialog
                open={sidebarOpen}
                onClose={setSidebarOpen}
                className="relative z-40 lg:hidden"
            >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-600/75 transition-opacity duration-300 ease-linear data-closed:opacity-0"
                />

                <div className="fixed inset-0 z-40 flex">
                    <DialogPanel
                        transition
                        className="relative flex w-full max-w-xs flex-1 transform flex-col bg-slate-blue pt-5 pb-4 transition duration-300 ease-in-out data-closed:-translate-x-full"
                    >
                        <TransitionChild>
                            <div className="absolute top-0 right-0 -mr-12 pt-2 duration-300 ease-in-out data-closed:opacity-0">
                                <button
                                    type="button"
                                    onClick={() => setSidebarOpen(false)}
                                    className="relative ml-1 flex size-10 items-center justify-center rounded-full focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
                                >
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">
                                        Close sidebar
                                    </span>
                                    <XMarkIcon
                                        aria-hidden="true"
                                        className="size-6 text-white"
                                    />
                                </button>
                            </div>
                        </TransitionChild>
                        <div className="flex shrink-0 items-center px-4">
                            <Logo />
                        </div>
                        <nav
                            aria-label="Sidebar"
                            className="mt-5 flex flex-1 flex-col divide-y divide-slate-light-hover overflow-y-auto"
                        >
                            <div className="space-y-1 px-2">
                                {navigation.map((item) => (
                                    <SidebarItem key={item.name} item={item} />
                                ))}
                            </div>
                            <div className="mt-6 pt-6">
                                <div className="space-y-1 px-2">
                                    {secondaryNavigation.map((item) => (
                                        <SidebarItem key={item.name} item={item} />
                                    ))}
                                </div>
                            </div>
                        </nav>
                    </DialogPanel>
                    <div aria-hidden="true" className="w-14 shrink-0"></div>
                </div>
            </Dialog>

            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex grow flex-col overflow-y-auto bg-slate-blue pt-5 pb-4">
                    <div className="flex shrink-0 items-center px-4">
                        <Logo />
                    </div>
                    <nav
                        aria-label="Sidebar"
                        className="mt-5 flex flex-1 flex-col divide-y divide-slate-blue-selected overflow-y-auto"
                    >
                        <div className="space-y-1 px-2">
                            {navigation.map((item) => (
                                <SidebarItem key={item.name} item={item} />
                            ))}
                        </div>
                        <div className="mt-6 pt-6">
                            <div className="space-y-1 px-2">
                                {secondaryNavigation.map((item) => (
                                    <SidebarItem key={item.name} item={item} />
                                ))}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
