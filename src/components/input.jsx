import React, {useId} from "react";

const Input = React.forwardRef(({
    label,
    type = 'text',
    className='',
    ...props
}, ref) => {
    const id = useId()
    return (
        <div className="w-full">
            {label && <label className="inline-block mb-1" htmlFor={id}>
                 {label}
            </label>}
        </div>
    )
})

export default Input