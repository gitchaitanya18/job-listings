import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Container, Form, FormGroup, Input, Label, Modal, ModalHeader, Row } from 'reactstrap';
import { employerCreateJobRequest, employerDeleteJobRequest, employerJobListRequest, employerUpdateJobRequest } from '../../../../redux/actions/jobsActions';
import { RootState } from '../../../../redux/reducers';

const JobListing = () => {

  const dispatch = useDispatch();
  const { list, createJobError } = useSelector((state: RootState) => ({
    list: state.job.employerJobList?.data?.results,
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

  const [companyError, setCompanyError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [salaryError, setSalaryError] = useState('');

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [initialValues, setInitialValues] = useState({
    id,
    company,
    title,
    description,
    location,
    salary
  });

  useEffect(() => {
    // if (!modalOpen) {
    getList()
    // }
  }, [])

  const getList = () => {
    const body = { page: 1, limit: 100 }
    dispatch(employerJobListRequest(body))
  }

  useEffect(() => {
    if (list) {
      setJobs(list)
    }
  }, [list])

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    setCompanyError('');
    setTitleError('');
    setDescriptionError('');
    setLocationError('');
    setSalaryError('');
  };

  const toggleUpdateModal = () => {
    setModalIsOpen(!modalIsOpen);
    setDescription('')
    setCompanyError('');
    setTitleError('');
    setDescriptionError('');
    setLocationError('');
    setSalaryError('');
  };

  const handleChangeCompany = (e: any) => {
    setCompany(e.target.value);
    setCompanyError('');
  }
    
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const jobPayload = {
      company,
      title,
      description,
      location,
      salary
    };

    let isValid = true;

    if (company.trim() === '') {
      setCompanyError('Company name is required');
      isValid = false;
      }
      
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

    dispatch(employerCreateJobRequest(jobPayload))
    setTimeout(() => {
      setModalOpen(!modalOpen);
      getList()
    }, 1500);
  };

  const handleDelete = (item: any) => {
    dispatch(employerDeleteJobRequest({ id: item._id }))
    setTimeout(() => {
      getList()
    }, 2500);
  };

  const handleEditJob = (item: any) => {
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

    if (company.trim() === '') {
      setCompanyError('company is required');
      isValid = false;
    }
      
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

    dispatch(employerUpdateJobRequest(jobPayload))
    setTimeout(() => {
      setModalIsOpen(!modalIsOpen);
      getList()
    }, 1500);
  };


  return (
    <div>
      <Container>
        <div className="mt-4 text-right">
          <Button color="success" onClick={toggleModal}>
            Post Job
          </Button>
        </div>

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

        <Modal isOpen={modalOpen} toggle={toggleModal} initialValues={initialValues}>
          <ModalHeader toggle={toggleModal}>Post Job</ModalHeader>
          {createJobError ? <Alert color="danger">{createJobError}</Alert> : null}
          <Col>
            <Form onSubmit={handleSubmit}>
              <FormGroup className='mt-2'>
                <Label for="company">company</Label>
                <Input
                  type="text"
                  name="company"
                  id="company"
                  placeholder="Enter company name"
                  value={company}
                  onChange={handleChangeCompany}
                />
                {companyError && <Alert color="danger">{companyError}</Alert>}
                              
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Enter job title"
                  value={title}
                  onChange={handleChangeTitle}
                />
                {titleError && <Alert color="danger">{titleError}</Alert>}


                <Label for="description">Description</Label>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  placeholder="Enter job description"
                  value={description}
                  onChange={handleChangeDescription}
                />
                {descriptionError && <Alert color="danger">{descriptionError}</Alert>}


                <Label for="location">Location</Label>
                <Input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Enter job location"
                  value={location}
                  onChange={handleChangeLocation}
                />
                {locationError && <Alert color="danger">{locationError}</Alert>}

                <Label for="salary">Salary</Label>
                <Input
                  type="number"
                  name="salary"
                  id="salary"
                  placeholder="Enter job salary"
                  value={salary}
                  onChange={handleChangeSalary}
                />
                {salaryError && <Alert color="danger">{salaryError}</Alert>}

              </FormGroup>

              <Button color="primary" type="submit" className='mb-4 float-right'>
                Create Job Post
              </Button>
            </Form>
          </Col>

        </Modal>

        <Modal isOpen={modalIsOpen} toggle={toggleUpdateModal}>
          <ModalHeader toggle={toggleUpdateModal}>Edit Job</ModalHeader>
          <Col>
            <Form onSubmit={handleUpdateSubmit}>
              <FormGroup className='mt-2'>
                <Label for="company">company</Label>
                <Input
                  type="text"
                  name="company"
                  id="company"
                  placeholder="Enter Company Name"
                  defaultValue={company}
                  onChange={handleChangeCompany}
                />
                {companyError && <Alert color="danger">{companyError}</Alert>}


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

export default JobListing;