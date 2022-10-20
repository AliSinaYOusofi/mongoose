import React from 'react'
import type { NextPage } from 'next';

const Table : NextPage = () =>  {
  return (
    <div className="">
        <table> 
            <tr>
                <th> One </th>
                <th> One </th>
                <th> One </th>
                <th> One </th>
            </tr>
            <tr>
                <td> Two </td>
                <td> Two </td>
                <td> Two </td>
                <td> Two </td>
                <td> <button> Delete </button></td>
                <td> <button> Update </button></td>
            </tr>
        </table>
    </div>
  )
}

export default Table;