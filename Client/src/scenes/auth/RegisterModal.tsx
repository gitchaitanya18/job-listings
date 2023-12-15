import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  NavLink,
  Row
} from 'reactstrap';
import { RootState } from '../../redux/reducers';
import { registerRequest } from '../../redux/actions/authActions';

const RegisterModal = () => {

  const dispatch = useDispatch()
  const { registerError } = useSelector((state: RootState) => ({
    registerError: state.auth?.registerError
  }));

  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('JOB_SEEKER');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleToggle = () => {
    setModal(!modal);
    setNameError('');
    setEmailError('');
    setPasswordError('');
  }

  const handleChangeName = (e: any) => {
    setName(e.target.value);
    setNameError('');
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

    const user = {
      name,
      email,
      password,
      loginType
    };

    let isValid = true;

    if (name.trim() === '') {
      setNameError('Name is required');
      isValid = false;
    }


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
    dispatch(registerRequest(user))
    handleToggle()
  };

  return (
    <div>
      <NavLink onClick={handleToggle} href="#">
        Register
      </NavLink>

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Register</ModalHeader>
        <ModalBody>
          {registerError ? <Alert color="danger">{registerError}</Alert> : null}
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="mb-3"
                onChange={handleChangeName}
              />
              {nameError && <Alert color="danger">{nameError}</Alert>}

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
                    checked={loginType === 'JOB_SEEKER' ? true : false}
                    onChange={() => handleCheckboxChange('JOB_SEEKER')}
                  />
                  Seeker
                </Label>

                <Label check className="ml-4">
                  <Input
                    type="checkbox"
                    checked={loginType === 'EMPLOYER' ? true : false}
                    onChange={() => handleCheckboxChange('EMPLOYER')}
                  />
                  Employer
                </Label>

              </Row>

              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default RegisterModal
