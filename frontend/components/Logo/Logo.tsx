import React from "react";

interface LogoProps {
    h?: number;
}

export const LogoText = () => {
    return (
        <img
            alt="Your Company"
            src="../.././src/assets/white_finances_logo_text.svg"
            className={"h-8 w-auto"}
        />
    );
};

export const Logo = () => {
    return (
        <img
            alt="Your Company"
            src="../.././src/assets/white_finances_logo_all_white.png"
            className="h-7 w-auto"
        />
    );
};
