import { useAuth } from '../security/AuthContext'
import { Button, Avatar, Dropdown, Navbar } from "flowbite-react";

import '../styles/header.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

export default function HeaderComponent({ handleOpen }) {

    // const authContext = useContext(AuthContext)
    const name = useAuth().name;
    const username = useAuth().username;
    const authContext = useAuth()
    const navigate = useNavigate();
    const isAuthenticated = authContext.isAuthenticated

    let userRole = "";
    let newUser = false;
    const loggedInUser = localStorage.getItem("loggedInUserData");

    if (loggedInUser) {
        const userObject = JSON.parse(loggedInUser);

        // Parse the string into an object
        userRole = userObject.userRole
        newUser = userObject.newUser

    } else {
        console.log("No user found");
    }

    const [profilePicture, setProfilePicture] = useState(null);

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         apiClient.get(`/users/${username}/dp`)
    //             .then(response => {
    //                 setProfilePicture(`data:image/jpeg;base64,${response.data}`);
    //             })
    //             .catch(error => {
    //                 console.error("Error fetching profile picture:", error);
    //             });
    //     }
    // }, [isAuthenticated]);

    return (
        <>
            <Navbar fluid className='bg-cyan-600'>
                <Navbar.Brand className='brand cursor-pointer'>
                    <span className="self-center whitespace-nowrap text-3xl font-semibold text-yellow-900">Acxiom Library</span>
                </Navbar.Brand>
                {isAuthenticated && <div className="flex md:order-2 h-[40px]">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar alt="User settings" img={profilePicture} rounded />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">{name}</span>
                            <span className="block truncate text-sm font-medium">{username}</span>
                        </Dropdown.Header>
                        <Dropdown.Item onClick={() => {
                            userRole === "ADMIN" ?
                                navigate("/employees")
                                : newUser ? navigate("/new") : navigate("/welcome")
                        }} className="w-[90%] cursor-pointer">Dashboard</Dropdown.Item>
                        <Dropdown.Item className="w-[90%] cursor-pointer">Settings</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={() => authContext.logout()} className="w-[90%] cursor-pointer">Sign out</Dropdown.Item>
                    </Dropdown>
                    <Navbar.Toggle />
                </div>}
                <Navbar.Collapse>
                    <Navbar.Link href="#" className='text-lg'>
                        Home
                    </Navbar.Link>
                    <Navbar.Link href="#" className='text-lg'>About</Navbar.Link>
                    <Navbar.Link href="#" className='text-lg'>Services</Navbar.Link>
                    <Navbar.Link href="#" className='text-lg'>Contact</Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
}