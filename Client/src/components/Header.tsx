import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Container,
    Nav,
    NavItem,
    Navbar,
    NavbarBrand,
    NavbarToggler
} from 'reactstrap';
import { logoutAction } from '../redux/actions/authActions';
import { RootState } from '../redux/reducers';
import LoginModal from '../scenes/auth/LoginModal';
import RegisterModal from '../scenes/auth/RegisterModal';

const linkStyle = {
    marginRight: '10px',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'normal',
    fontSize: 18
};

const Header = () => {

    const dispatch = useDispatch();
    const { token, role } = useSelector((state: RootState) => ({
        token: state.auth.loginResponse?.refreshToken?.token,
        role: state.auth.loginResponse?.data?.role
    }));

    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => setIsOpen(!isOpen);

    const handleLogout = () => {
        dispatch(logoutAction())
    }

    const adminLinks = (
        <nav>
            <Link style={linkStyle} to="/">Jobs</Link>
            <Link style={linkStyle} to="/manageusers">Users</Link>
            <Link style={linkStyle} to="/manageemployees">Employees</Link>
            <Link style={linkStyle} to="/adminprofile">Profile</Link>
            <Link style={linkStyle} to="/" onClick={handleLogout}>Logout</Link>
        </nav>
    );

    const employerLinks = (
        <nav>
            <Link to="/" style={linkStyle}>Jobs</Link>
            <Link to="/manageapplications" style={linkStyle}>Applications</Link>
            <Link to="/myprofile" style={linkStyle}>Profile</Link>
            <Link to="/" onClick={handleLogout} style={linkStyle}>Logout</Link>
        </nav>
    );

    const seekerLinks = (
        <nav>
            <Link to="/" style={linkStyle}>Jobs</Link>
            <Link to="/Services" style={linkStyle}>Services</Link>
            <Link to="/seekapplications" style={linkStyle}>Applications</Link>
            <Link to="/seekprofile" style={linkStyle}>Profile</Link>
            <Link to="/" onClick={handleLogout} style={linkStyle}>Logout</Link>
        </nav>
    );

    const authLinks = (
        <nav className='row'>
            <NavItem>
                <LoginModal />
            </NavItem>
            <NavItem>
                <RegisterModal />
            </NavItem>
            
        </nav>
    );

    return (
        <div className="sticky-top">
            <Navbar style={{ backgroundColor: 'rgb(26 9 91)' }} dark expand="sm" className="mb-2" >
                <Container>
                    <NavbarBrand href="/">OCCUPATION</NavbarBrand>
                    <NavbarToggler onClick={handleToggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {token && role === 'ADMIN' ? adminLinks : token && role === 'EMPLOYER' ? employerLinks : token && role === 'JOB_SEEKER' ? seekerLinks : authLinks}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    );
};


export default Header
