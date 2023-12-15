import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Card, CardBody, CardSubtitle, CardTitle, Col, Container, Form, FormGroup, Input, Label, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { adminUserList } from "../../../../redux/actions/listActions";
import { RootState } from "../../../../redux/reducers";
import { deleteUserRequest, updateUserRequest } from "../../../../redux/actions/userActions";

const UserManagement = () => {

  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => ({
    list: state.admin.adminUserList?.data?.results,
  }));

  const handleToggle = () => {
    if (!modal) {
      setName('')
      setEmail('')
    }
    setModal(!modal);
    setNameError('');
    setEmailError('');
  }

  const [users, setUsers] = useState([]);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loginType, setLoginType] = useState('JOB_SEEKER');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    getList()
  }, [])

  const getList = () => {
    const body = { page: 1, limit: 100, role: "JOB_SEEKER" }
    dispatch(adminUserList(body))
    // const body_2 = { page: 1, limit: 100, role: "EMPLOYER" }
    // dispatch(adminUserList(body_2))
  }

  useEffect(() => {
    if (list) {
      setUsers(list)
    }
  }, [list])

  const handleChangeName = (e: any) => {
    setName(e.target.value);
    setNameError('');
  }

  const handleChangeEmail = (e: any) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handleEdit = (item: any) => {
    setId(item._id);
    setName(item.username);
    setEmail(item.email);
    setLoginType(item.role);
    handleToggle();
  };

  const handleDelete = (item: any) => {
    dispatch(deleteUserRequest(item._id))
    setTimeout(() => {
      getList()
    }, 2000);
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    const user = {
      id,
      name,
      email,
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


    if (!isValid) {
      return;
    }
    dispatch(updateUserRequest(user))
    handleToggle()
    setTimeout(() => {
      getList()
    }, 2000);
  };

  return (
    <Container>

      {users.length > 0 ?
        <Row className="mt-4">
          {users?.map((item: any) => (
            <Col key={item._id} sm="4">
              <Card key={item._id} className="mb-2">
                <CardBody>
                  <CardTitle tag="h5">
                    {item.username}
                  </CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {item.location}
                  </CardSubtitle>
                  <CardSubtitle className="mb-2" tag="h6">
                    {item.email}
                  </CardSubtitle>
                  <CardTitle className="text-muted" tag="h6">
                    {item.title}
                  </CardTitle>
                  <CardSubtitle className="text-muted" tag="h6">
                    {item.location}
                  </CardSubtitle>

                  <div className="mt-4 d-flex justify-content-between">
                    <Button className='mr-2' color="success" onClick={() => handleEdit(item)}>
                      Edit
                    </Button>
                    <Button color="danger" onClick={() => handleDelete(item)}>
                      Delete
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
        :
        <Card className='mt-4'>
          <CardBody>
            <CardTitle className="text-center">No Job Seeker Found</CardTitle>
          </CardBody>
        </Card>
      }

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Update User</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="mb-3"
                defaultValue={name}
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
                defaultValue={email}
                onChange={handleChangeEmail}
              />
              {emailError && <Alert color="danger">{emailError}</Alert>}

              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Update User
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default UserManagement;
