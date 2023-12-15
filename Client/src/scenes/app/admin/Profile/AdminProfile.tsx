
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Card, CardBody, CardTitle, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { adminProfileRequest, adminUpdateProfileRequest } from '../../../../redux/actions/profileActions';
import { RootState } from '../../../../redux/reducers';

const AdminProfile = () => {

    const dispatch = useDispatch();
    const { userId, profile, profileError } = useSelector((state: RootState) => ({
        userId: state.auth.loginResponse?.data?._id,
        profile: state.profile?.adminProfile?.data,
        profileError: state.profile?.adminProfileError
    }));

    const [userProfile, setUserProfile] = useState({
        userId: profile?._id,
        username: profile?.username || '',
        email: profile?.email,
        role: profile?.role,
    });
    const [nameError, setNameError] = useState('');

    const handleInputChange = (e: any) => {
        e.preventDefault();
        const { name, value } = e.target;
        setUserProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
        setNameError('');
    };

    const handleUpdateProfile = () => {
        const { username } = userProfile;
        let isValid = true;

        if (username.trim() === '') {
            setNameError('Name is required');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        dispatch(adminUpdateProfileRequest(userProfile))
    };

    useEffect(() => {
        const body = { userId, role: "ADMIN" }
        dispatch(adminProfileRequest(body))
    }, []);

    return (
        <Container>
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Profile</CardTitle>
                    <Form>
                        {profileError ? <Alert color="danger">{profileError}</Alert> : null}
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input
                                type="text"
                                name="username"
                                id="username"
                                defaultValue={profile?.username}
                                onChange={handleInputChange}
                                readOnly
                            />
                            {nameError && <Alert color="danger">{nameError}</Alert>}

                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                value={profile?.email}
                                onChange={handleInputChange}
                                readOnly
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="role">Role</Label>
                            <Input
                                type="text"
                                name="role"
                                id="role"
                                value={profile?.role}
                                onChange={handleInputChange}
                                readOnly
                            />
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        </Container>
    );
};

export default AdminProfile;