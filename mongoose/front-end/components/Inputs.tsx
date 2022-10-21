import { NextPage } from 'next'
import React from 'react'
import {CgNametag} from 'react-icons/cg';
import {AiOutlinePhone, AiOutlineMail} from 'react-icons/ai';


const Inputs : NextPage = () => {
  return (
    <div className="w-full flex bg-gray-400 justify-center items-center flex-wrap
        gap-x-2 py-3 gap-y-3">
        
        <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <AiOutlineMail className="text-gray-400"/>
            </div>
            <input type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email" />
        </div>
        
        <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <CgNametag className="text-gray-400"/>
            </div>
            <input type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="first name" />
        </div>
        
        <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <CgNametag className="text-gray-400"/>
            </div>
            <input type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="last name" />
        </div>
        
        <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <AiOutlinePhone className="text-gray-400"/>
            </div>
            <input type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="phone" />
        </div>
        <button type="submit" className="text-white bg-green-700 py-1 text-center px-4 md:py-2 md:px-5 md:text-[1rem] text-sm  rounded-sm border-none outline-none transition-all duration-300 hover:-translate-y-1 w-3/2 md:w-fit">Create</button>
    </div>
  )
}

export default Inputs;
