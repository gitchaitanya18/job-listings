import React, { useState } from 'react';
import { Alert, Button, Card, CardBody, CardFooter, CardSubtitle, CardText, CardTitle, Col, Container, Row } from 'reactstrap';

const DummyHome = () => {

    const jobs = [
        {
            "title": "Web Designer",
            "description": "Exciting opportunity for a creative web designer to join our innovative design team.",
            "location": "San Francisco, USA",
            "salary": 60000
        },
        {
            "title": "Data Analyst",
            "description": "Analytical minds wanted! Join our team to analyze and interpret complex data sets.",
            "location": "Chicago, USA",
            "salary": 70000
        },
        {
            "title": "Mobile App Developer",
            "description": "Create cutting-edge mobile applications for Android and iOS platforms.",
            "location": "Seattle, USA",
            "salary": 80000
        },
        {
            "title": "UX/UI Designer",
            "description": "Craft seamless user experiences and visually stunning interfaces.",
            "location": "Los Angeles, USA",
            "salary": 75000
        },
        {
            "title": "Network Engineer",
            "description": "Join our network engineering team to build and maintain robust network infrastructures.",
            "location": "Austin, USA",
            "salary": 90000
        },
        {
            "title": "Data Scientist",
            "description": "Exciting opportunity for a skilled data scientist to analyze and derive insights from large datasets.",
            "location": "San Francisco, CA",
            "salary": 110000
        },
        {
            "title": "Marketing Coordinator",
            "description": "Exciting opportunity for a marketing enthusiast to coordinate and execute marketing campaigns.",
            "location": "Chicago, IL",
            "salary": 75000
        },
        {
            "title": "iOS Developer",
            "description": "Experienced iOS developer needed to build innovative and user-friendly mobile applications.",
            "location": "New York, NY",
            "salary": 100000
        },
        {
            "title": "Web Designer",
            "description": "Exciting opportunity for a creative web designer to join our innovative design team.",
            "location": "San Francisco, USA",
            "salary": 60000
        },
        {
            "title": "Data Analyst",
            "description": "Analytical minds wanted! Join our team to analyze and interpret complex data sets.",
            "location": "Chicago, USA",
            "salary": 70000
        },
        {
            "title": "Mobile App Developer",
            "description": "Create cutting-edge mobile applications for Android and iOS platforms.",
            "location": "Seattle, USA",
            "salary": 80000
        },
        {
            "title": "UX/UI Designer",
            "description": "Craft seamless user experiences and visually stunning interfaces.",
            "location": "Los Angeles, USA",
            "salary": 75000
        },
        {
            "title": "Network Engineer",
            "description": "Join our network engineering team to build and maintain robust network infrastructures.",
            "location": "Austin, USA",
            "salary": 90000
        },
        {
            "title": "Data Scientist",
            "description": "Exciting opportunity for a skilled data scientist to analyze and derive insights from large datasets.",
            "location": "San Francisco, CA",
            "salary": 110000
        },
        {
            "title": "Marketing Coordinator",
            "description": "Exciting opportunity for a marketing enthusiast to coordinate and execute marketing campaigns.",
            "location": "Chicago, IL",
            "salary": 75000
        },
        {
            "title": "iOS Developer",
            "description": "Experienced iOS developer needed to build innovative and user-friendly mobile applications.",
            "location": "New York, NY",
            "salary": 100000
        }
    ]

    const [alertVisible, setAlertVisible] = useState(false);

    const onDismiss = () => setAlertVisible(false);

    const handleApply = () => setAlertVisible(true);

    return (
        <Container>
            <Alert color="info" isOpen={alertVisible} toggle={onDismiss}>
                Please login to apply for the jobs!
            </Alert>
            <Row style={{ paddingBottom: 50 }}>
                {jobs?.map((item: any, index: any) => (
                    <Col key={index} sm="3" className="mb-4">
                        <Card className='mb-1'>
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
                            </CardBody>
                            <CardFooter>
                                <Button onClick={handleApply} className='primary'>Apply</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default DummyHome;