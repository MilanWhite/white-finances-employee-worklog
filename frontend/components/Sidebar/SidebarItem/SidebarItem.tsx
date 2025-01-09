import React from "react";

import { SidebarNavigationType } from "../../../pages/EmployeeDashboard";

interface SidebarItemProps {
    item: SidebarNavigationType;
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const SidebarItem = ({ item }: SidebarItemProps) => {
    return (
        <a
            key={item.name}
            href={item.href}
            aria-current={item.current ? "page" : undefined}
            className={classNames(
                item.current
                    ? "bg-slate-blue-selected text-white"
                    : "text-navtext hover:bg-slate-blue-unselected hover:text-white",
                "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
            )}
        >
            <item.icon
                aria-hidden="true"
                className="mr-4 size-6 shrink-0 text-navicon"
            />
            {item.name}
        </a>
    );
};

export default SidebarItem;
