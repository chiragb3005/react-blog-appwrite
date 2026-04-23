import React from 'react'

function Logo({ width = '100px' }) {
    return (
        <div
            className='inline-flex items-center gap-3 text-left'
            style={{ width }}
        >
            <div className='flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#d4653d,#1e2433)] text-sm font-black uppercase tracking-[0.24em] text-white shadow-[0_14px_26px_rgba(30,36,51,0.18)]'>
                IN
            </div>
            <div className='min-w-0'>
                <div className='font-[Georgia] text-lg font-bold leading-none tracking-[-0.04em] text-slate-900'>
                    InkNest
                </div>
                <div className='mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-slate-500'>
                    Appwrite stories
                </div>
            </div>
        </div>
    )
}

export default Logo
