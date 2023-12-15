import React from 'react';
import { useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loader from '../components/Loading';
import Services from '../scenes/app/seekers/Services/Services';
import { RootState } from '../redux/reducers';
import JobManagement from '../scenes/app/admin/Job/JobManagement';
import AdminProfile from '../scenes/app/admin/Profile/AdminProfile';
import UserManagement from '../scenes/app/admin/User/UserManagement';
import EmployeeManagement from '../scenes/app/admin/Employee/EmployeeManagement';
import JobListing from '../scenes/app/employers/Job/JobListing';
import Profile from '../scenes/app/employers/Profile/Profile';
import ApplicationsSeeker from '../scenes/app/seekers/Applications/ApplicationsSeeker';
import Home from '../scenes/app/seekers/Home/Home';
import ProfileSeeker from '../scenes/app/seekers/Profile/ProfileSeeker';
import DummyHome from '../scenes/auth/DummyHome';
import Applications from '../scenes/app/employers/Applications/Applications';

const Navigator = () => {

    const { token, role, loading } = useSelector((state: RootState) => ({
        loading: state.loader.loading ?? null,
        token: state.auth.loginResponse?.refreshToken?.token ?? null,
        role: state.auth.loginResponse?.data?.role ?? null
    }));

    const adminLinks = (
        <Routes>
            <Route path="/" element={<JobManagement />} />
            <Route path="/manageusers" element={<UserManagement />} />
            <Route path="/manageemployees" element={<EmployeeManagement />} />
            <Route path="/adminprofile" element={<AdminProfile />} />
        </Routes>
    );

    const employerLinks = (
        <Routes>
            <Route path="/" element={<JobListing />} />
            <Route path="/manageapplications" element={<Applications />} />
            <Route path="/myprofile" element={<Profile />} />
        </Routes>
    );

    const seekerLinks = (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/seekapplications" element={<ApplicationsSeeker />} />
            <Route path="/seekprofile" element={<ProfileSeeker />} />
        </Routes>
    );

    const authLinks = (
        <Routes>
            <Route path="/" element={<DummyHome />} />
            <Route path="/Services" element={<Services />} />

        </Routes>
    );

    return (
        <div>
            <Router>
                <Header />
                {loading ?
                    <Loader />
                    :
                    <>
                        {token && role === 'ADMIN' ? adminLinks : token && role === 'EMPLOYER' ? employerLinks : token && role === 'JOB_SEEKER' ? seekerLinks : authLinks}
                    </>
                }
                <ToastContainer />
                <Footer />
            </Router>
        </div>
    )
}

export default Navigator
