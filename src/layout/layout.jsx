import React,{useEffect} from 'react'
import Navbar from './navbar'
import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function Layout() {
    const user = localStorage.getItem("approve-it-user")
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [])

    if(!user){
        return null
    }

    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}
