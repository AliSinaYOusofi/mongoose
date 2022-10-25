import { NextPage } from 'next';
import React from 'react'
import axios from 'axios';

// props passed types
interface Props { text : string; }

const SearchTables : NextPage<Props> = (searchText) => {
    // for the results from api
    const [searchResults, setSearchResults] = React.useState(Array<object>);

    interface Results {
        data : any; // first data is any 
        results: Array<object> // that results is an Array<object>
    }

    React.useEffect( () => {
        const getResultsFromDatabase = async () : Promise<void> => {
            if (searchText.text.length > 0) {
                try {
                    // we have the data from db
                    // just use memo for ascending and descending
                    const result : Results = await axios.get(`http://localhost:3001/api/search?searchThis=${searchText.text}`);
                    setSearchResults(result.data.results);
                }catch(error) { console.log(error);}
            } else { setSearchResults([]);}
        }
        getResultsFromDatabase();
    }, [searchText.text]);

    console.log(searchResults);

    interface Keyable {
        [key : string] : any;
    }
    return (
        <>
            <div className="md:w-[90%] ml-auto mr-auto mt-10 lg:p-0 px-2 rounded-md ">
            
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
                            searchResults.map((value : Keyable, index) => {
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
        </>
    )
}


export default SearchTables;