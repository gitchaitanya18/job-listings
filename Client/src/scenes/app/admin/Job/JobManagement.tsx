import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Container, Form, FormGroup, Input, Label, Modal, ModalHeader, Row } from 'reactstrap';
import { adminDeleteJobRequest, adminJobListRequest, adminUpdateJobRequest, employerCreateJobRequest } from '../../../../redux/actions/jobsActions';
import { RootState } from '../../../../redux/reducers';

const JobManagement = () => {

  const dispatch = useDispatch();
  const { list, createJobError } = useSelector((state: RootState) => ({
    list: state.job.adminJobList?.data?.results,
    createJobError: state.job.employerCreateJobError
  }));

  const [jobs, setJobs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [id, setId] = useState('');
  const [company, setCompany] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');

  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [salaryError, setSalaryError] = useState('');

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    // if (!modalOpen) {
    setTimeout(() => {
      getList()
    }, 3000);
    // }
  }, [])

  const getList = () => {
    const body = { page: 1, limit: 100 }
    dispatch(adminJobListRequest(body))
  }

  useEffect(() => {
    if (list) {
      setJobs(list)
    }
  }, [list])

  const toggleUpdateModal = () => {
    setModalIsOpen(!modalIsOpen);
    setTitleError('');
    setDescriptionError('');
    setLocationError('');
    setSalaryError('');
  };

  const handleChangeTitle = (e: any) => {
    setTitle(e.target.value);
    setTitleError('');
  }

  const handleChangeDescription = (e: any) => {
    setDescription(e.target.value);
    setDescriptionError('');
  };

  const handleChangeLocation = (e: any) => {
    setLocation(e.target.value);
    setLocationError('');
  };

  const handleChangeSalary = (e: any) => {
    setSalary(e.target.value);
    setSalaryError('');
  };

  const handleDelete = (item: any) => {
    dispatch(adminDeleteJobRequest({ id: item._id }))
    setTimeout(() => {
      getList()
    }, 3000);
  };

  const handleEditJob = (item: any) => {
    console.log('==>', item)
    setId(item._id);
    setTitle(item.title);
    setDescription(item.description);
    setLocation(item.location);
    setSalary(item.salary);
    setModalIsOpen(!modalIsOpen);
  };

  const handleUpdateSubmit = (e: any) => {
    e.preventDefault();

    const jobPayload = {
      id,
      company,
      title,
      description,
      location,
      salary
    };

    let isValid = true;

    if (title.trim() === '') {
      setTitleError('Title is required');
      isValid = false;
    }

    if (description.trim() === '') {
      setDescriptionError('Description is required');
      isValid = false;
    }

    if (location.trim() === '') {
      setLocationError('Location is required');
      isValid = false;
    }

    if (salary === '') {
      setSalaryError('Salary is required');
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    dispatch(adminUpdateJobRequest(jobPayload))
    // setTimeout(() => {
    //   toggleUpdateModal()
    //   getList()
    // }, 3000);
  };


  return (
    <div>
      <Container>
        {jobs.length > 0 ?
          <Row className="mt-4">
            {jobs?.map((item: any) => (
              <Col key={item._id} sm="3">
                <Card className='mb-2'>
                  <CardBody >
                    <CardTitle tag="h5">
                      {item.company}
                    </CardTitle>
                    <CardTitle tag="h6">
                      {item.title}
                    </CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      {item.location}
                    </CardSubtitle>
                    <CardText>
                      {item.description}
                    </CardText>
                    <CardSubtitle
                      className="mb-2 text-muted"
                      tag="h6"
                    >
                      ${item.salary}
                    </CardSubtitle>
                    <div className="d-flex justify-content-between">
                      <Button className='mr-2' color="success" onClick={() => handleEditJob(item)}>
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
              <CardTitle className="text-center">No Jobs Posted</CardTitle>
            </CardBody>
          </Card>
        }

        <Modal isOpen={modalIsOpen} toggle={toggleUpdateModal}>
          <ModalHeader toggle={toggleUpdateModal}>Edit Job</ModalHeader>
          <Col>
            <Form onSubmit={handleUpdateSubmit}>
              <FormGroup className='mt-2'>
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter job title"
                  defaultValue={title}
                  onChange={handleChangeTitle}
                />
                {titleError && <Alert color="danger">{titleError}</Alert>}


                <Label for="description">Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  placeholder="Enter job description"
                  defaultValue={description}
                  onChange={handleChangeDescription}
                />
                {descriptionError && <Alert color="danger">{descriptionError}</Alert>}


                <Label for="location">Location</Label>
                <Input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Enter job location"
                  defaultValue={location}
                  onChange={handleChangeLocation}
                />
                {locationError && <Alert color="danger">{locationError}</Alert>}

                <Label for="salary">Salary</Label>
                <Input
                  type="number"
                  name="salary"
                  id="salary"
                  placeholder="Enter job salary"
                  defaultValue={salary}
                  onChange={handleChangeSalary}
                />

                {salaryError && <Alert color="danger">{salaryError}</Alert>}

              </FormGroup>

              <Button color="success" type="submit" className='mb-4 float-right'>
                Update Job
              </Button>
            </Form>
          </Col>
        </Modal>

      </Container>
    </div>
  );
};

export default JobManagement;