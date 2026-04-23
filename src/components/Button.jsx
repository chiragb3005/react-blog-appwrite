import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "",
    textColor = "",
    className = "",
    ...props
}) {
    const variantClass = bgColor || "button-primary";
    const colorClass = textColor || "";

    return (
        <button className={`button-base ${variantClass} ${colorClass} ${className}`} type={type} {...props}>
            {children}
        </button>
    );
}
