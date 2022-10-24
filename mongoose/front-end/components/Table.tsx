import React from 'react'
import type { NextPage } from 'next';
import axios from 'axios';

// type for our props
// something new is here
interface Props {
    click : boolean;
}

const Table : NextPage<Props> = (props) =>  { // nice way of typescript being typescript

    const [users, setUsers] = React.useState(Array<object>); // type shoudl be Array<Gen>
    console.log(props.click); // that is something
    
    // in typescript that is a new of getting props
    // our result model
    
    // defining the type of data we will fetch from the the api
    interface Data {
        user?: Array<object>;
        data: Array<object>;
        users?: Array<object>;
    }

    React.useEffect( () => {
        const data = async () => {
            try {
                const response : Data = await axios.get("http://localhost:3001/api/data");
                setUsers(response.data);
            } catch(error) { console.log(error);}
        } 
        data();
    }, [props.click]);
    
    // defining the type for mapping item
    interface Keyable {
        [key : string] : any;
    }

    return (
        <div className="md:w-[90%] ml-auto mr-auto mt-5 lg:p-0 px-2 rounded-md ">
            
            <div className="overflow-x-auto relative shadow-md rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-black uppercase bg-gray-300 dark:bg-gray-200 ">
                        <tr>
                            <th scope="col" className="md:py-3 md:px-6 py-1 px-2 text-xs md:text-sm">
                                Name
                            </th>
                            <th scope="col" className="md:py-3 md:px-6 py-1 px-2 text-xs md:text-smx">
                                Last Name
                            </th>
                            <th scope="col" className="md:py-3 md:px-6 py-1 px-2 text-xs md:text-sm">
                                Email
                            </th>
                            <th scope="col" className="md:py-3 md:px-6 py-1 px-2 text-xs md:text-sm">
                                Phone
                            </th>
                            <th scope="col" className="md:py-3 md:px-6 py-1 px-2 text-xs md:text-sm">
                                Update
                            </th>
                            <th scope="col" className="md:py-3 md:px-6 py-1 px-2 text-xs md:text-sm">
                                Delete
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        
                        {
                            users.map((value : Keyable, index) => {
                                return (
                                    <tr className=" bg-gray-300 md:py-3 md:px-6 py-1 px-2 text-black" key={index}>
                                        <td  className="md:py-3 md:px-6 py-1 px-2  text-xs md:text-sm whitespace-nowrap ">
                                            {value.name}
                                        </td>
                                        <td className="md:py-3 md:px-6 py-1 px-2 text-xs md:text-sm">
                                            {value.lastName}
                                        </td>
                                        <td className="md:py-3 md:px-6 py-1 px-2 text-xs md:text-sm">
                                            {value.email}
                                        </td>
                                        <td className="md:py-3 md:px-6 py-1 px-2 text-xs md:text-sm">
                                            {value.phone}
                                        </td>
                                        
                                        <td className="md:py-3 md:px-6 py-1 px-2 text-xs md:text-sm">
                                            <button type="submit" className="text-white bg-blue-700 p-1 px-3 rounded-sm border-none outline-none transition-all duration-300 hover:-translate-y-1">Update</button>
                                        </td>
                                        <td className="md:py-3 md:px-6 py-1 px-2">
                                            <button type="submit" className="text-white bg-red-700 p-1 px-3 rounded-sm border-none outline-none transition-all duration-300 hover:-translate-y-1">Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
  )
}


export default Table;