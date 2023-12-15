import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Col, Container, Input, InputGroup, Row } from 'reactstrap';
import { seekerApplyRequest } from '../../../../redux/actions/applicationActions';
import { seekerJobListRequest } from '../../../../redux/actions/jobsActions';
import { RootState } from '../../../../redux/reducers';

const Home = () => {

  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => ({
    list: state.job.seekerJobList?.data?.results
  }));

  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getList()
  }, [])

  useEffect(() => {
    if (list) {
      setJobs(list)
    }
  }, [list])

  const getList = () => {
    const body = { page: 1, limit: 100 }
    dispatch(seekerJobListRequest(body))
  }

  const searchJob = (search: any) => {
    const body = { page: 1, limit: 100, search }
    dispatch(seekerJobListRequest(body))
  }

  const handleInputChange = (e: any) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);

    if (searchValue.length > 0) {
      setTimeout(() => {
        searchJob(searchValue)
      }, 2500);
    } else {
      setTimeout(() => {
        getList()
      }, 1000);
    }

  };

  const handleApply = (item: any) => {
    // e.preventDefault();
    console.log('item', item)
    dispatch(seekerApplyRequest({ job_id: item._id }))
    setTimeout(() => {
      getList()
    }, 1500);
  };


  return (
    <div>
      <Container>
        <InputGroup>
          <Input
            type="text"
            placeholder="Search Job or Location..."
            value={searchTerm}
            onChange={handleInputChange}
          />
        </InputGroup>

        {jobs.length > 0 ?
          <Row className="mt-4">
            {jobs?.map((item: any) => (
              <Col key={item._id} sm="3">
                <Card className='mb-2'>
                  <CardBody >
                    <CardTitle tag="h5">
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
                    <Button color={item.status === 'active' ? "primary" : "secondary"} onClick={() => handleApply(item)}>
                      {item.status === 'active' ? 'Apply' : 'Pending'}
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
          :
          <Card className='mt-4'>
            <CardBody>
              <CardTitle className="text-center">No Jobs Found</CardTitle>
            </CardBody>
          </Card>

        }



      </Container>
    </div>
  );
};

export default Home;