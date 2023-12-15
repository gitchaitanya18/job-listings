
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardTitle, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { employerProfileRequest } from '../../../../redux/actions/profileActions';
import { RootState } from '../../../../redux/reducers';

const Profile = () => {

  const dispatch = useDispatch();
  const { userId, profile } = useSelector((state: RootState) => ({
    userId: state.auth.loginResponse?.data?._id,
    profile: state.profile?.employerProfile?.data
  }));

  const [userprofile, setProfile] = useState({
    username: '',
    email: '',
    role: ''
  })

  useEffect(() => {
    const body = { userId, role: "EMPLOYER" }
    dispatch(employerProfileRequest(body))
  }, []);

  useEffect(() => {
    if (profile) {
      setProfile(profile)
    }
  }, [profile])



  return (
    <Container>
      <Card className='mt-4'>
        <CardBody>
          <CardTitle tag="h5">Profile</CardTitle>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="username"
                id="username"
                value={userprofile?.username}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={userprofile?.email}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="role">Role</Label>
              <Input
                type="text"
                name="role"
                id="role"
                value={userprofile?.role}
                readOnly
              />
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Profile;