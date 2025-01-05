import { useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";
import { useAuth } from "../context/AuthContext";

export interface LoginInfo {
    email: string;
    password: string;
    rememberMe: boolean | undefined;
}

const useManagerLogin = () => {

    const { setIsManager, setIsLoggedIn } = useAuth()

    const [loginError, setLoginError] = useState< string | null>(null);
    const [isLoading, setLoading] = useState(false)

    const loginManager = async (loginInfo: LoginInfo) => {

        try {
            const formData = new FormData();
            formData.append("email", loginInfo.email)
            formData.append("password", loginInfo.password)

            if (loginInfo.rememberMe) {
                formData.append("rememberMe", "true")
            } else {
                formData.append("rememberMe", "false")
            }

            setLoading(true)
            const response = await apiClient.post("/manager/login", formData, {});

            if (response.data.isManager) {
                setIsLoggedIn(true)
                setIsManager(true)
            }

        } catch (err: any) {
            if (err instanceof CanceledError) return;

            if (err.response) {
                console.log(err.response.data.message)
                setLoginError(err.response.data.message)
            } else {
                console.log(err.message)
                setLoginError(err.message)
            }
        } finally {
            setLoading(false)
        }
    }

    return { loginManager, isLoading, loginError };
}

export default useManagerLogin