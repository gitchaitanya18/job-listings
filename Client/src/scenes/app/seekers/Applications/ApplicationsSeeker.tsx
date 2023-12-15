import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardFooter, CardSubtitle, CardText, CardTitle, Col, Container, Row } from 'reactstrap';
import { seekerApplicationListRequest } from '../../../../redux/actions/applicationActions';
import { RootState } from '../../../../redux/reducers';

const ApplicationsSeeker = () => {

  const dispatch = useDispatch();
  const { list } = useSelector((state: RootState) => ({
    list: state.apply.seekerApplicationList
  }));

  const [jobs, setJobs] = useState([]);

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
    dispatch(seekerApplicationListRequest(body))
  }

  return (
    <Container>

      {jobs.length > 0 ?
        <Row className="mt-4">
          {jobs?.map((item: any) => (
            <Col key={item._id} sm="3">
              <Card className='mb-2'>
                <CardBody >
                  <CardTitle tag="h5">
                    {item?.job_id?.company}
                  </CardTitle>
                  <CardTitle tag="h5">
                    {item?.job_id?.title}
                  </CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    {item?.job_id?.location}
                  </CardSubtitle>
                  <CardText>
                    {item?.job_id?.description}
                  </CardText>
                  <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                  >
                    ${item?.job_id?.salary}
                  </CardSubtitle>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
        :
        <Card className='mt-4'>
          <CardBody>
            <CardTitle className="text-center">No Jobs Applications</CardTitle>
          </CardBody>
        </Card>
      }

    </Container>
  );
};

export default ApplicationsSeeker;