import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const ImageDisplayComponent = () => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/images/')
            .then(response => {
                setImages(response.data);
            })
            .catch(error => {
                console.error('Error fetching images: ', error);
            });
    }, []);

    return (
        <Container>
            <Row>
                {images.map(image => (
                    <Col key={image.id} xs={6} md={4}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={`data:${image.mimetype};base64,${Buffer.from(image.image.data).toString('base64')}`} />
                            <Card.Body>
                                <Card.Title>{image.filename}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ImageDisplayComponent;
