import React, { useEffect, useState } from "react";
import { fetchData } from "../Features/GetUserListThunk";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"; // Import Link for navigation

const UserList = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.getUserList);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const cities = Array.from(new Set(data.map((item) => item.address.city)));

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCity === "" || item.address.city === selectedCity)
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-4 text-center">Data of UserList</h2>

      <div className="flex justify-center gap-2 pb-4">
        <input
          className="border h-[40px] w-[300px] rounded pl-2"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <select
          className="border h-[40px] w-[200px] rounded pl-2"
          value={selectedCity}
          onChange={handleCityChange}
        >
          <option value="">All Cities</option>
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-600 text-white font-semibold w-[150px] h-[40px] rounded"
          onClick={() => {
            setSearchQuery("");
            setSelectedCity("");
          }}
        >
          Clear
        </button>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Company
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, id) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={id}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Link
                    to={`/user/${item.id}`} // Link to UserDetail page with user ID
                    className="text-blue-500 hover:underline"
                  >
                    {item.name}
                  </Link>
                </th>
                <td className="px-6 py-4">{item.email}</td>
                <td className="px-6 py-4">{item.phone}</td>
                <td className="px-6 py-4">{item.address.city}</td>
                <td className="px-6 py-4">{item.company.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <p className="text-center mt-4">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default UserList;
