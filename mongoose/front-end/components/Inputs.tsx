import { NextPage } from 'next'
import React, { ChangeEvent, EventHandler } from 'react'
import {CgNametag} from 'react-icons/cg';
import {AiOutlinePhone, AiOutlineMail} from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Table from './Table';
import SearchBar from './SearchBar';
import Eyeballs from './Eyeballs';

// what if i reuse this comp for updation

interface Props {
    buttonTitle : boolean;
    id? : string;
}
const Inputs : NextPage<Props> = (props) => {
    
    // for controlled inputs
    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [click, setClick] = React.useState(false); // for useEffect() in Tables
    const [buttonColor, setButtonColor] = React.useState(false); // controlling colors
    

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
    // return a void Promise for async functions typescript
    async function handleSubmit() : Promise<void> {
        // show errors if occurs as toast messages
        showErrorsIfExists();
        // sending to backend if no error occurs
        
        let noErrors = validateEmail() && validateUserName(name) && validateUserName(lastName) && validatePhoneNumber();
    
        if (noErrors && ! props.buttonTitle) {
            // sending to our api 
            // now going back to backend and setup everything there
            // send details to server
            try {
                const response = await axios.post("http://localhost:3001/api/register", {
                    name,
                    lastName,
                    phone,
                    email
                });
                response.data.message === "done" ? toast.success("saved to database") : toast.error("duplicate email");
                // make the inputs empty after clicking the click
                // now show the saved data in the database
                setClick(prev => !prev) // reloading the page when user clicks it
                // and also sort the data make the options to do it t tommorow
            } catch(error) {
                console.log(error);
            }
        }
        // if buttonTitle is  true then it means that the updateFunctionality should work instead
        if (props.buttonTitle && noErrors) {
            // just make no errors and then send it to backend
            // got everythin
            try {
                const response = await axios.post("http://localhost:3001/api/update", {id: props.id, insert: name + " " + lastName + " " + email + " " + phone});
                response.data.message === "done" ? toast.success("user updated") : toast.error("failed to update, check you email again");
            } catch(error) { console.log(error)}
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
        <>
            <div id={`${props.buttonTitle}`} className="w-[80%] rounded-md bg-[#cfc9c9] md:mt-5 ml-auto mr-auto py-8 flex  justify-center items-center flex-wrap
                gap-x-2  gap-y-3 text-black">
                
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <AiOutlineMail className="text-gray-400"/>
                    </div>
                    <input onBlur={() => setEmailTouched(!emailTouched)} 
                        style={{border: emailTouched ? (!validateEmail() ? "1px solid red" : "1px solid green")  : "null"}} onChange={handleEmailChange} type="text" id="input-group-1" className="bg-gray-300 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-50 block w-full pl-10 p-2.5  dark:placeholder-gray-400" placeholder="email" />
                    
                </div>
                
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <CgNametag className="text-gray-400"/>
                    </div>
                    <input onBlur={() => setNameTouched(!nameTouhced)} 
                        style={{border: nameTouhced ? (!validateUserName(name) ? "1px solid red" : "1px solid green")  : "null"}} onChange={handleNameChange} type="text" id="input-group-1" className="bg-gray-300 border border-gray-300  text-sm rounded-lg focus:ring-blue-100 block w-full pl-10 p-2.5  text-black dark:placeholder-gray-400 " placeholder="first name" />
                </div>
                
                <div id={`${props.buttonTitle}`} className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <CgNametag className="text-gray-400"/>
                    </div>
                    <input onBlur={() => setLastNameTouchd(!lastNameTouched)} 
                    style={{border: lastNameTouched ? (!validateUserName(lastName) ? "1px solid red" : "1px solid green")  : "null"}} onChange={handleLastNameChange} type="text" id="input-group-1" className="bg-gray-300 border border-gray-300 text-sm rounded-lg focus:ring-blue-50 block w-full pl-10 p-2.5   dark:placeholder-gray-400 " placeholder="last name" />
                </div>
                
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <AiOutlinePhone className="text-gray-400"/>
                    </div>
                    <input onBlur={() => setPhoneTouched(!phoneTouched)} 
                        style={{border: phoneTouched ? (!validatePhoneNumber() ? "0.1px solid red" : "0.1px solid green")  : "null"}} onChange={handlePhoneChange} type="tel"  pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" id="input-group-1" className="bg-gray-300 outline-none border-none focus:outline-none focus:border-none focus:ring-blue-50  text-sm rounded-lg  block w-full pl-10 p-2.5    dark:placeholder-gray-400   " placeholder="phone" />
                </div>
                <button type="submit" onClick={handleSubmit} className="text-white bg-green-700 py-1 text-center px-4 md:py-2 md:px-5 md:text-[1rem] text-sm  rounded-md border-none outline-none transition-all duration-300 hover:-translate-y-1 w-3/2 md:w-fit">{ ! props.buttonTitle ? "Create" : "Update"}</button>
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
            {/* making it reusable. 
            it beame alot messy than i thought. everything comes with a price
            move to the inputs when from update utton using id of inputs.
            thats good solution.
            */}
            { ! props.buttonTitle ? <SearchBar /> : ""}
            
            {
                ! props.buttonTitle ?
                    <div className="lg:ml-16 ml-3 mt-5 flex gap-x-2">
                        <button type="submit"  onClick={() => setButtonColor(prev => !prev)} style={{backgroundColor: buttonColor ? "#3333ff" : "gray"}} className="text-white p-1 px-3 rounded-sm border-none outline-none transition-all duration-300">Asending</button>
                        <button type="submit" className="text-white p-1 px-3 rounded-sm border-none outline-none transition-all duration-300" onClick={() => setButtonColor(prev => !prev)} style={{backgroundColor: !buttonColor ? "#3333ff" : "gray"}}>Descending</button>
                    </div>
            : ""
            }
            { ! props.buttonTitle ? <Eyeballs /> : ""}
            
            { ! props.buttonTitle ? <Table click={click} color={buttonColor}/> : ""}
        </>
  )
} 
/* thats it for the frontend now
    any thing will be added later
*/

export default Inputs;