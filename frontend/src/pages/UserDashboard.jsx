import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
const UserDashboard = () => {
  const [details, setDetails] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        setDetails(profileData.user);
        console.log(profileData);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProfile();
  }, []);
  const getProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.get(
        "http://localhost:8000/api/user/getProfile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };
  const handleLogOut = async () => {
    localStorage.removeItem("accessToken");
  };
  return (
    <>
      <Layout>
        <div className="bg-blue-200 min-h-screen flex items-center">
          <div className="w-full">
            <h2 className="text-center text-blue-900 font-bold text-2xl uppercase mb-10">
              Your Profile
            </h2>
            <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
              <form action="">
                <div className="mb-5">
                  <label
                    htmlFor="Location"
                    className="block mb-2 font-bold text-gray-600"
                  >
                    Location
                  </label>
                  <input
                    value={details?.location}
                    disabled
                    type="text"
                    id="Location"
                    name="Location"
                    placeholder="Enter your Location."
                    className="border border-gray-300 shadow p-3 w-full rounded mb-"
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="Age"
                    className="block mb-2 font-bold text-gray-600"
                  >
                    Age
                  </label>
                  <input
                    value={details?.age}
                    disabled
                    type="number"
                    id="Age"
                    name="Age"
                    placeholder="Enter your Age."
                    className="border border-gray-300 shadow p-3 w-full rounded mb-"
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="work"
                    className="block mb-2 font-bold text-gray-600"
                  >
                    work
                  </label>
                  <input
                    value={details?.work}
                    disabled
                    type="text"
                    id="work"
                    name="work"
                    placeholder="Enter your work."
                    className="border border-gray-300 shadow p-3 w-full rounded mb-"
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="dob"
                    className="block mb-2 font-bold text-gray-600"
                  >
                    DOB
                  </label>
                  <input
                    value={details?.dob}
                    disabled
                    type="text"
                    id="dob"
                    name="dob"
                    placeholder="Enter your DOB."
                    className="border border-gray-300 shadow p-3 w-full rounded mb-"
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="description"
                    className="block mb-2 font-bold text-gray-600"
                  >
                    Description
                  </label>
                  <input
                    value={details?.description}
                    disabled
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Enter your description."
                    className="border border-gray-300 shadow p-3 w-full rounded mb-"
                  />
                </div>
                <button
                  onClick={handleLogOut}
                  className="block w-full bg-red-400 hover:bg-red-500 text-white font-bold p-4 rounded-lg"
                >
                  LogOut
                </button>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserDashboard;
