import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';
import axios from 'axios';
import toast from 'react-hot-toast';


function EditProfileForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    (
      async () => {
        try {
          const { data } = await axios.get('/api/users/me');
          setUser(data);
        } catch (err) {
          console.log(err);
        }
      }
    )();
  }, []);

  const updateUserInfo = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('/api/users/me', user);
      toast.success('Profile updated successfully');
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Link className="font-medium text-4xl" to="/">
        <BsArrowLeftShort />
        Home
      </Link>
      <div className="flex flex-col h-screen justify-center">
        <h1 className="text-center text-4xl mb-5">Edit Profile</h1>
        <form className="" onSubmit={updateProfile}>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">
            Full Name:
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              required
              value={user.name}
              onChange={updateUserInfo}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </label>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">
            email:
            <input
              name="email"
              type="email"
              placeholder="email"
              required
              value={user.email}
              onChange={updateUserInfo}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </label>
          <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-10 py-2.5 text-center mr-2 mt-2" type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileForm;
