import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardSubtitle, CardTitle, Col, Container, Row } from 'reactstrap';
import { employerApplicationListRequest } from '../../../../redux/actions/applicationActions';
import { employerCreateJobRequest, employerDeleteJobRequest } from '../../../../redux/actions/jobsActions';
import { RootState } from '../../../../redux/reducers';

const Applications = () => {

  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => ({
    list: state.apply.employerApplicationList?.data?.results
  }));

  const [jobs, setJobs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary: '',
  });

  useEffect(() => {
    setTimeout(() => {
      getList()
    }, 1500);
  }, [])

  const getList = () => {
    const body = { page: 1, limit: 100 }
    dispatch(employerApplicationListRequest(body))
  }

  useEffect(() => {
    if (list) {
      setJobs(list)
    }
  }, [list])

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(employerCreateJobRequest(formData))
    setTimeout(() => {
      setModalOpen(!modalOpen);
      getList()
    }, 1500);
  };

  const handleDelete = (item: any) => {
    // e.preventDefault();
    dispatch(employerDeleteJobRequest({ id: item._id }))
    setTimeout(() => {
      getList()
    }, 1500);
  };

  return (
    <Container>
      {jobs.length > 0 ?
        <Row className="mt-4">
          {jobs?.map((item: any) => (
            <Col key={item._id} sm="4">
              <Card>
                <CardBody>
                  <CardTitle tag="h5">
                    {item.seeker_id.username}
                  </CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {item.location}
                  </CardSubtitle>
                  <CardSubtitle className="mb-2" tag="h6">
                    {item.seeker_id.email}
                  </CardSubtitle>
                  <CardTitle className="text-muted" tag="h6">
                    {item.job_id.title}
                  </CardTitle>
                  <CardSubtitle className="text-muted" tag="h6">
                    {item.job_id.location}
                  </CardSubtitle>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
        :
        <Card className='mt-4'>
          <CardBody>
            <CardTitle className="text-center">No Applications Found</CardTitle>
          </CardBody>
        </Card>
      }
    </Container>
  );
};

export default Applications;