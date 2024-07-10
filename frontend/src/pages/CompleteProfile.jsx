import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//location, age, work, dob, description
const CompleteProfile = () => {
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [work, setWork] = useState("");
  const [dob, setDob] = useState("");
  const [description, setDescription] = useState("");

  const navigate=useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log({location, age, work, dob, description});

    const profileData = {
      location,
      age,
      work,
      dob,
      description,
    };

    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post('http://localhost:8000/api/user/completeProfile', profileData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
      // Redirect to the dashboard or another page
      // window.location.href = '/dashboard';
    } catch (error) {
      console.log(error, 'Error completing profile');
      navigate('/login');
    }
  }
  return (
    <>
      <div className="bg-blue-200 min-h-screen flex items-center">
        <div className="w-full">
          <h2 className="text-center text-blue-900 font-bold text-2xl uppercase mb-10">
            Complete Your Profile
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
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
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
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
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
                  value={work}
                  onChange={(e) => {
                    setWork(e.target.value);
                  }}
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
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                  type="Date"
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
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  type="text"
                  id="description"
                  name="description"
                  placeholder="Enter your description."
                  className="border border-gray-300 shadow p-3 w-full rounded mb-"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompleteProfile;
