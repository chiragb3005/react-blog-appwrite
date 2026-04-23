import React, { useId } from 'react'

function Select({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='field-shell w-full'>
            {label && <label htmlFor={id}>{label}</label>}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`field-input appearance-none ${className}`}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)
