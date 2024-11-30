import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const { data } = useSelector((state) => state.getUserList);

  useEffect(() => {
    const selectedUser = data.find((user) => user.id === parseInt(id));
    setUser(selectedUser);
  }, [id, data]);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  if (!user) return <p>Loading user details...</p>;

  return (
    <div className="p-6">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={handleBackClick}
      >
        Back to User List
      </button>

      <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Address:</strong> {user.address.street}, {user.address.city},{" "}
        {user.address.zipcode}
      </p>
      <p>
        <strong>Company:</strong> {user.company.name}
      </p>
      <p>
        <strong>Website:</strong>{" "}
        <a
          href={`https://${user.website}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {user.website}
        </a>
      </p>
    </div>
  );
};

export default UserDetail;
