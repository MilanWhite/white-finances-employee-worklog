import React from "react";

import { BriefcaseIcon, CheckCircleIcon } from "@heroicons/react/20/solid";

const PersonalHeader = () => {
    return (
        <>
            <div className="min-w-0 flex-1">
                {/* Profile */}
                <div className="flex items-center">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                        className="hidden size-16 rounded-full sm:block"
                    />
                    <div>
                        <div className="flex items-center">
                            <img
                                alt=""
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.6&w=256&h=256&q=80"
                                className="size-16 rounded-full sm:hidden"
                            />
                            <h1 className="ml-3 text-2xl/7 font-bold text-dark sm:truncate sm:text-2xl/9">
                                Good morning, Emilia Birch
                            </h1>
                        </div>
                        <dl className="mt-6 flex flex-col sm:mt-1 sm:ml-3 sm:flex-row sm:flex-wrap">
                            <dt className="sr-only">Company</dt>
                            <dd className="flex items-center text-sm font-medium text-light capitalize sm:mr-6">
                                <BriefcaseIcon
                                    aria-hidden="true"
                                    className="mr-1.5 size-5 shrink-0 text-light1"
                                />
                                Accounting
                            </dd>
                            <dt className="sr-only">Account status</dt>
                            <dd className="mt-3 flex items-center text-sm font-medium text-light capitalize sm:mt-0 sm:mr-6">
                                <CheckCircleIcon
                                    aria-hidden="true"
                                    className="mr-1.5 size-5 shrink-0 text-green-400"
                                />
                                Verified Employee
                            </dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
                <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                >
                    Clock In
                </button>
                <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-slate-blue px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-slate-blue-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                >
                    Clock Out
                </button>
            </div>
        </>
    );
};

export default PersonalHeader;
