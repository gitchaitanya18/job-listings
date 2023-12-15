import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardTitle, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { seekerProfileRequest } from '../../../../redux/actions/profileActions';
import { RootState } from '../../../../redux/reducers';

const ProfileSeeker = () => {

  const dispatch = useDispatch();
  const { userId, profile } = useSelector((state: RootState) => ({
    userId: state.auth.loginResponse?.data?._id,
    profile: state.profile?.seekerProfile?.data
  }));

  useEffect(() => {
    const body = { userId, role: "EMPLOYER" }
    dispatch(seekerProfileRequest(body))
  }, []);


  return (
    <Container>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Profile</CardTitle>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="username"
                id="username"
                value={profile?.username}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={profile?.email}
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
                readOnly
              />
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default ProfileSeeker;