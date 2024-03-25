import React, { useState } from 'react'
import LandingPage from './landingPage';
import EmployeList from './EmployeList';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate()

    const userData = localStorage.getItem("userData");
    const userDetails = JSON.parse(userData!)

    const [isLandingPage,setIsLandingPage] = useState<boolean>(true)
    const [isEmployePage,setIsEmployePage] = useState<boolean>(false)

    const handleEmployeClick = () => {
        setIsLandingPage(false)
        setIsEmployePage(true)
    }
    const handleHomeClick = () => {
        setIsLandingPage(true)
        setIsEmployePage(false)
    }

    const handleLogout = () => {
        localStorage.removeItem("userData");
        navigate("/")
    }
    
  return (
    <>
        <div className='home-header-container'> 
            <div className='home-header-left-container'>
                <div className='home-header-btn' onClick={handleHomeClick}>
                    Home
                </div>
                <div className='home-header-btn' onClick={handleEmployeClick}>
                    Employe List
                </div>
            </div>
            <div className='home-header-right-container'>
                {userDetails.f_UserName} - <span onClick={handleLogout} className='home-header-btn'> Logout</span>
            </div>
        </div>  

        {isLandingPage && <LandingPage />}
        {isEmployePage && <EmployeList />}
    </>
  ) 
}

export default Home