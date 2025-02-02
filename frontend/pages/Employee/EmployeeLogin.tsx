import React from "react";
import { LogoText } from "../../components/Logo/Logo";

import useEmployeeLogin, { LoginInfo } from "../../hooks/useEmployeeLogin";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ROUTES } from "../../../shared/routes";

const schema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(1, { message: "Password field is required" }),
    rememberMe: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

export function EmployeeLogin() {
    const { loginEmployee, isLoading, loginError } = useEmployeeLogin();

    const onSubmit = async (data: FormData) => {
        reset();

        const loginInfo: LoginInfo = {
            email: data.email,
            password: data.password,
            rememberMe: data.rememberMe,
        };
        try {
            await loginEmployee(loginInfo);
        } catch {
            console.log("Login failed:", loginError);
        }
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    return (
        <>
            <div className="flex min-h-full flex-1">
                <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <LogoText />
                            <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-dark">
                                Employee Sign In
                            </h2>
                            <p className="mt-2 text-sm/6 text-light">
                                Not an employee?{" "}
                                <a
                                    href={ROUTES.MANAGER_LOGIN}
                                    className="font-semibold text-slate-blue hover:text-slate-blue-hover"
                                >
                                    Sign in as a manager
                                </a>
                            </p>
                        </div>

                        <div className="mt-10">
                            <div>
                                <form
                                    action="#"
                                    method="POST"
                                    className="space-y-6"
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm/6 font-medium text-dark"
                                        >
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                type="email"
                                                required
                                                autoComplete="email"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-dark outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-slate-blue sm:text-sm/6"
                                                {...register("email")}
                                            />
                                            {errors.email && (
                                                <div
                                                    className="pt-2 mb-4 text-sm text-special-cosmic rounded-lg"
                                                    role="alert"
                                                >
                                                    {errors.email.message}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm/6 font-medium text-dark"
                                        >
                                            Password
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="password"
                                                type="password"
                                                required
                                                autoComplete="current-password"
                                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-dark outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-slate-blue sm:text-sm/6"
                                                {...register("password")}
                                            />
                                            {errors.password && (
                                                <div
                                                    className="pt-2 mb-4 text-sm text-special-cosmic rounded-lg"
                                                    role="alert"
                                                >
                                                    {errors.password.message}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-3">
                                            <div className="flex h-6 shrink-0 items-center">
                                                <div className="group grid size-4 grid-cols-1">
                                                    <input
                                                        id="remember-me"
                                                        type="checkbox"
                                                        className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-slate-blue checked:bg-slate-blue indeterminate:border-slate-blue indeterminate:bg-slate-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-blue disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                                        {...register(
                                                            "rememberMe"
                                                        )}
                                                    />
                                                    <svg
                                                        fill="none"
                                                        viewBox="0 0 14 14"
                                                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                                    >
                                                        <path
                                                            d="M3 8L6 11L11 3.5"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="opacity-0 group-has-[:checked]:opacity-100"
                                                        />
                                                        <path
                                                            d="M3 7H11"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                            <label
                                                htmlFor="remember-me"
                                                className="block text-sm/6 text-dark"
                                            >
                                                Remember me
                                            </label>
                                            {errors.rememberMe && (
                                                <div
                                                    className="pt-2 mb-4 text-sm text-special-cosmic rounded-lg"
                                                    role="alert"
                                                >
                                                    {errors.rememberMe.message}
                                                </div>
                                            )}
                                        </div>

                                        <div className="text-sm/6">
                                            <a
                                                href={ROUTES.FORGOT_PASSWORD}
                                                className="font-semibold text-slate-blue hover:text-slate-blue-hover"
                                            >
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-slate-blue px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-slate-blue-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-blue"
                                        >
                                            Sign in
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative hidden w-0 flex-1 lg:block">
                    <img
                        alt=""
                        src="../src/assets/employee_login_cover_photo.jpg"
                        className="absolute inset-0 size-full object-cover"
                    />
                </div>
            </div>
        </>
    );
}
