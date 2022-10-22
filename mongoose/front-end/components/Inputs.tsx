import { NextPage } from 'next'
import React, { ChangeEvent, EventHandler } from 'react'
import {CgNametag} from 'react-icons/cg';
import {AiOutlinePhone, AiOutlineMail} from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from 'react-toastify/dist/components';

const Inputs : NextPage = () => {
    
    // for controlled inputs
    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [phone, setPhone] = React.useState("");

    // setting whether if inputs are touched based on touch show the the error
    const [emailTouched, setEmailTouched] = React.useState(false);
    const[lastNameTouched, setLastNameTouchd] = React.useState(false);
    const[nameTouhced, setNameTouched] = React.useState(false);
    const[phoneTouched, setPhoneTouched] = React.useState(false);


    // updating the state
    function handleEmailChange (e : ChangeEvent<HTMLInputElement>) : void { e.preventDefault(); setEmail(e.target.value)}
    function handleNameChange(e : ChangeEvent<HTMLInputElement>) : void { setName(e.target.value)}
    function handleLastNameChange(e : ChangeEvent<HTMLInputElement>) : void { setLastName(e.target.value)}
    function handlePhoneChange(e : ChangeEvent<HTMLInputElement>) : void { setPhone(e.target.value)}
    
    // now showing error if invalid inputs save it to database otherwies
    //
    function handleSubmit() : void {
        // show errors if occurs as toast messages
        showErrorsIfExists();
        // sending to backend if no error occurs
        
        let noErrors = validateEmail() && validateUserName(name) && validateUserName(lastName) && validatePhoneNumber();
    
        if (noErrors) {
            // sending to our api 
            // now going back to backend and setup everything there
        }
    }

    // toast messages for every input field
    function showErrorsIfExists() : void {
        if (!validateEmail())
            toast.error("check your email");
        if (!validateUserName(name))
            toast.error("invalid user name no spaces in between");
        if (!validateUserName(lastName))
            toast.error("invalid last name no spaces in between");
        if (!validatePhoneNumber())
            toast.error("invalid phone number");
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
                <input onBlur={() => setEmailTouched(!emailTouched)} 
                    style={{border: emailTouched ? (!validateEmail() ? "1px solid red" : "1px solid green")  : "null"}} onChange={handleEmailChange} type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="email" />
                
            </div>
            
            <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <CgNametag className="text-gray-400"/>
                </div>
                <input onBlur={() => setNameTouched(!nameTouhced)} 
                    style={{border: nameTouhced ? (!validateUserName(name) ? "1px solid red" : "1px solid green")  : "null"}} onChange={handleNameChange} type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="first name" />
            </div>
            
            <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <CgNametag className="text-gray-400"/>
                </div>
                <input onBlur={() => setLastNameTouchd(!lastNameTouched)} 
                style={{border: lastNameTouched ? (!validateUserName(lastName) ? "1px solid red" : "1px solid green")  : "null"}} onChange={handleLastNameChange} type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="last name" />
            </div>
            
            <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <AiOutlinePhone className="text-gray-400"/>
                </div>
                <input onBlur={() => setPhoneTouched(!phoneTouched)} 
                    style={{border: phoneTouched ? (!validatePhoneNumber() ? "1px solid red" : "1px solid green")  : "null"}} onChange={handlePhoneChange} type="tel"  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="phone" />
            </div>
            <button type="submit" onClick={handleSubmit} className="text-white bg-green-700 py-1 text-center px-4 md:py-2 md:px-5 md:text-[1rem] text-sm  rounded-sm border-none outline-none transition-all duration-300 hover:-translate-y-1 w-3/2 md:w-fit">Create</button>
            <ToastContainer 
                position="top-left"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                
            />
        </div>
  )
} /* thats it for the frontend now
    any thing will be added later
*/

export default Inputs;