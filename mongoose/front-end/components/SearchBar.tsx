import axios from "axios";
import type { NextPage } from "next";
import React, {ChangeEvent} from 'react';
import SearchTables from "./SearchTables";

const SearchBar : NextPage = () => {

    // controlling the seach input
    const [search, setSearch] = React.useState(String);
    const [searchClick, setSearchClick] = React.useState(false);

    const handleSearchChange = (e : ChangeEvent<HTMLInputElement>) : void => {
        setSearch(e.target.value);
    }
    // just show the searchTables comp when there is something in it
    return (
        <>
            <form className="w-[90%] mt-3 ml-auto mr-auto">   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input onChange={handleSearchChange} type="search" id="default-search" className="block p-4 pl-10 w-full text-sm border-none outline-none rounded-md text-gray-900 bg-gray-300 " placeholder="Search Web Dev, DevRels, and Programmers" required />
                    <button onClick={() => setSearchClick(prev => !prev)} type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 p-1 px-3 rounded-sm border-none outline-none transition-all duration-300 hover:-translate-y-1">Search</button>
                </div>
            </form>
            {search.length > 0 || searchClick ?<SearchTables text={search}/> : ""}
            {/* good to go */}
        </>
    );
}

export default SearchBar;