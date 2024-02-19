import React from "react";
import { Button,Input } from "@material-tailwind/react";

const home = () => {
  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nota
            </th>
            <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Porcentaje
            </th>
            <th className="px-6 py-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="">
          <tr>
            <td className="px-6 py-4 whitespace-nowrap"><Input className="w-48" placeholder="Nota" /></td>
            <td className="px-6 py-4 whitespace-nowrap"><Input label="Username" /></td>

            <td className="px-6 py-4 whitespace-nowrap">
              <button className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out">
                Edit
              </button>
              <button className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out">
                Delete
              </button>
            </td>
          </tr>
         
        </tbody>
      </table>
    </div>
  );
};
export default home;
