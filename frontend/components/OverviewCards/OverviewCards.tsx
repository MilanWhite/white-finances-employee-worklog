import React from "react"
import { Card } from "../../pages/EmployeeDashboard";

interface OverviewProps {
    overviewCards: Card[];
}

const OverviewCards = ( { overviewCards } : OverviewProps) => {
    return (
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg/6 font-medium text-dark">Overview</h2>
            <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {overviewCards.map((card) => (
                    <div
                        key={card.name}
                        className="overflow-hidden rounded-lg bg-white shadow-sm"
                    >
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className="shrink-0">
                                    <card.icon
                                        aria-hidden="true"
                                        className="size-6 text-light1"
                                    />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="truncate text-sm font-medium text-light">
                                            {card.name}
                                        </dt>
                                        <dd>
                                            <div className="text-lg font-medium text-dark">
                                                {card.value}
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div className="bg-light5 px-5 py-3">
                            <div className="text-sm">
                                <a
                                    href={card.href}
                                    className="font-medium text-slate-blue hover:text-slate-blue-hover"
                                >
                                    {card.aValue}
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OverviewCards;
