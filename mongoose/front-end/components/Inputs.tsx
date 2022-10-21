import { NextPage } from 'next'
import React, { ChangeEvent, EventHandler } from 'react'
import {CgNametag} from 'react-icons/cg';
import {AiOutlinePhone, AiOutlineMail} from 'react-icons/ai';


const Inputs : NextPage = () => {
    
    // for controlled inputs
    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [phone, setPhone] = React.useState("");

    // updating the state
    function handleEmailChange (e : ChangeEvent<HTMLInputElement>) : void { e.preventDefault(); setEmail(e.target.value)}
    function handleNameChange(e : ChangeEvent<HTMLInputElement>) : void { setName(e.target.value)}
    function handleLastNameChange(e : ChangeEvent<HTMLInputElement>) : void { setLastName(e.target.value)}
    function handlePhoneChange(e : ChangeEvent<HTMLInputElement>) : void { setPhone(e.target.value)}
    
    // now showing error if invalid inputs save it to database otherwies
    function handleSubmit() : void {
        // checking every submit
    }

    // validators for input fields regex
    function validateEmail() : boolean { return Boolean(email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) }
    function validateUserName(username : string) : boolean { return Boolean(username.match(/^[a-zA-Z0-9]+$/));}
    function validatePhoneNumber() : boolean { return Boolean(phone.match(/^\+?[1-9][0-9]{7,14}$/)); }
    
    return (
        <div className="w-full flex bg-gray-400 justify-center items-center flex-wrap
            gap-x-2 py-3 gap-y-3">
            
            <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <AiOutlineMail className="text-gray-400"/>
                </div>
                <input style={{border: !validateEmail() ? "1px solid red" : "1px solid green"}} onChange={handleEmailChange} type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email" />
                
            </div>
            
            <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <CgNametag className="text-gray-400"/>
                </div>
                <input style={{border: !validateUserName(name) ? "1px solid red" : "1px solid green"}} onChange={handleNameChange} type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="first name" />
            </div>
            
            <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <CgNametag className="text-gray-400"/>
                </div>
                <input style={{border: !validateUserName(lastName) ? "1px solid red" : "1px solid green"}} onChange={handleLastNameChange} type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="last name" />
            </div>
            
            <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <AiOutlinePhone className="text-gray-400"/>
                </div>
                <input style={{border: !validatePhoneNumber() ? "1px solid red" : "1px solid green"}} onChange={handlePhoneChange} type="tel"  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="phone" />
            </div>
            <button type="submit" onClick={handleSubmit} className="text-white bg-green-700 py-1 text-center px-4 md:py-2 md:px-5 md:text-[1rem] text-sm  rounded-sm border-none outline-none transition-all duration-300 hover:-translate-y-1 w-3/2 md:w-fit">Create</button>
        </div>
  )
}

export default Inputs;
