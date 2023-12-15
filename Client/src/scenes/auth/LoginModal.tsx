import React, { useState } from 'react';
import { Alert, Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, NavLink, Row } from 'reactstrap';
import { connect, useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../redux/actions/authActions';
import { RootState } from '../../redux/reducers';

const LoginModal = () => {

  const dispatch = useDispatch();
  const { loginError } = useSelector((state: RootState) => ({
    loginError: state.auth?.loginError
  }));

  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [loginType, setLoginType] = useState('Seeker');

  const handleToggle = () => {
    setModal(!modal);
    setEmailError('');
    setPasswordError('');
  }

  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleCheckboxChange = (userType: any) => {
    setLoginType(userType)
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    let isValid = true;

    if (email.trim() === '') {
      setEmailError('Email is required');
      isValid = false;
    }

    if (password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const payload = { email, password, loginType };
    dispatch(loginRequest(payload))
    setModal(!modal);
  };

  return (
    <div>
      <NavLink onClick={handleToggle} href="#">
        Login
      </NavLink>

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Login</ModalHeader>
        <ModalBody>
          {loginError && <Alert color="danger">{loginError?.message}</Alert>}

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
              {emailError && <Alert color="danger">{emailError}</Alert>}

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={handleChangePassword}
              />
              {passwordError && <Alert color="danger">{passwordError}</Alert>}

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

const mapStateToProps = (state: any) => ({
  // data: state.something,
});

const mapDispatchToProps = (dispatch: any) => ({
  // loginReq: () => dispatch(loginRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
