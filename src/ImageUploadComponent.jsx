import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const ImageUploadComponent = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', selectedFile);

        axios.post('http://localhost:8080/api/images/upload', formData)
            .then(response => {
                console.log(response.data);
                alert('Image uploaded successfully!');
            })
            .catch(error => {
                console.error('Error uploading image: ', error);
                alert('Error uploading image. Please try again.');
            });
    };

    return (
        <Form>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Select an image to upload:</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Button variant="primary" onClick={handleUpload}>
                Upload
            </Button>
        </Form>
    );
};

export default ImageUploadComponent;
