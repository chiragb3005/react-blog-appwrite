import React, { useId } from 'react'

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='field-shell w-full'>
            {label && <label
                className='pl-1'
                htmlFor={id}>
                {label}
            </label>
            }
            <input
                type={type}
                className={`field-input ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input
