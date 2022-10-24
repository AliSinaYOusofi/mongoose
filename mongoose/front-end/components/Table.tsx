import React from 'react'
import type { NextPage } from 'next';
import axios from 'axios';

// type for our props
// something new is here
interface Props {
    click : boolean;
    color? : boolean; // be optional for now: false is descending true is ascending
}

const Table : NextPage<Props> = (props) =>  { // nice way of typescript being typescript

    const [users, setUsers] = React.useState(Array<object>); // type shoudl be Array<Gen>
    // useMemo is now working perfectly fine
    const sortedValue = React.useMemo( () => {
        function sortData(data : Array<object>) : Array<object> {
            let sortedProduct: Array<object> = 
                props.color 
                ? 
                    data.sort( 
                    (user1 : Keyable, user2 : Keyable) : number => 
                        (user1.name < user2.name) ? 1 : (user1.name > user2.name ? -1 : 0)
                    ) 
                : 
                    data.sort( 
                        (user1 : Keyable, user2 : Keyable) : number => 
                            (user1.name > user2.name) ? 1 : (user1.name < user2.name ? -1 : 0)
                    )
            return sortedProduct;
        }
        sortData(users);

    }, [users, props.color]);
    
   
    // in typescript that is a new of getting props
    // our result model
    
    // defining the type of data we will fetch from the the api
    interface Data {
        user?: Array<object>;
        data: Array<object>;
        users?: Array<object>;
    }

    /*
        making our sorting algorithms:
        if buttonColor is true ascending false descinding
        run useEffect() on every change of clicks for now

        should i add : modified, latest => idk 
    */
    React.useEffect( () => {
        const Data = async () => {
            try {
                const response : Data = await axios.get("http://localhost:3001/api/data");
                // before setting make sure of ascending or desending
                setUsers(response.data);
                // make ascending order
                // or descending
                
            } catch(error) { console.log(error);}
        } 
        Data();
    }, [props.click, props.color]);
    
    // defining the type for mapping item
    interface Keyable {
        [key : string] : any;
    }

    // ascending funcction 
    
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
  ); 
}
export default Table;