import React from 'react'

export default function Navbar() {
    return (
        <>
            <div className='bg-black h-16 text-white flex flex-row items-center justify-between px-6'>
                <div className='font-bold justify-self-start '>iTask</div>
                <div>
                    <ul className='flex justify-center items-center list-none gap-10 '>

                        <li className='cursor-pointer hover:font-bold transition-all p-3  py-1' >Home</li>
                        <li className='cursor-pointer hover:font-bold transition-all p-3  py-1'>Contact</li>
                    </ul>
                </div>
            </div>
        </>
    )
}
