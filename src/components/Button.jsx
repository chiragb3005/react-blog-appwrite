import React, { Children } from "react";

function Button (
    children,
    type = "button",
    bgcolor= 'bg-blue-600',
    textColor = 'white',
    classname = '',
    ...props
) {
    
    return (
        <div>
            <button className={`px-4 py-2 rounded-lg ${classname} ${bgcolor} ${textColor} {...props}`}>
                {children}
            </button>
        </div>
    )
}

export default Button;