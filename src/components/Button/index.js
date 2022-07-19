import React from "react";

const Button = ({ placeholder, onClick, style }) => {
    return (
        <button
            className={`py-2 px-4 rounded-lg text-xs md:text-sm lg:text-base font-semibold text-white hover:text-black hover:border-2 hover:bg-white ${style}`}
            onClick={onClick}
        >
            {placeholder}
        </button>
    );
};

export default Button;
