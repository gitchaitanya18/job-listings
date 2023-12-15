import React, { useCallback, useState } from 'react';
import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, NavLink, Row } from 'reactstrap';
import { connect, useDispatch } from 'react-redux';
import { loginRequest } from '../../../../redux/actions/authActions';

const EmployerCreateJob = () => {
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState(null);

    const [loginType, setLoginType] = useState('Seeker');

    const handleToggle = useCallback(() => {
        setModal(!modal);
    }, [modal]);

    const handleChangeEmail = (e: any) => setEmail(e.target.value);
    const handleChangePassword = (e: any) => setPassword(e.target.value);

    const handleOnSubmit = (e: any) => {
        e.preventDefault();
        const payload = { email, password, loginType };
        dispatch(loginRequest(payload))
        setModal(!modal);
    };

    const handleCheckboxChange = (userType: any) => {
        setLoginType(userType)
    };

    return (
        <div>
            <NavLink onClick={handleToggle} href="#">
                Login
            </NavLink>

            <Modal isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}>Login</ModalHeader>
                <ModalBody>
                    {msg && <Alert color="danger">{msg}</Alert>}

                    <Form>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                className="mb-3"
                                onChange={handleChangeEmail}
                            />

                            <Label for="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                className="mb-3"
                                onChange={handleChangePassword}
                            />

                            <Row className="ml-4">
                                <Label check>
                                    <Input
                                        type="checkbox"
                                        checked={loginType === 'Seeker' ? true : false}
                                        onChange={() => handleCheckboxChange('Seeker')}
                                    />
                                    Seeker
                                </Label>

                                <Label check className="ml-4">
                                    <Input
                                        type="checkbox"
                                        checked={loginType === 'Employer' ? true : false}
                                        onChange={() => handleCheckboxChange('Employer')}
                                    />
                                    Employer
                                </Label>

                                <Label check className="ml-4">
                                    <Input
                                        type="checkbox"
                                        checked={loginType === 'Admin' ? true : false}
                                        onChange={() => handleCheckboxChange('Admin')}
                                    />
                                    Admin
                                </Label>
                            </Row>

                            <Button
                                color="dark"
                                style={{ marginTop: '2rem' }}
                                block
                                onClick={handleOnSubmit}
                            >
                                Login
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default EmployerCreateJob
