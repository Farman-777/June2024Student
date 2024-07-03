import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Constants from '../comps/Constants';

const initialFormValues = {
    id: '',
    name: '',
    email: '',
    mobile: ''
}
const StudentUpdateForm = ({ student, show, handleClose, getStudentList }) => {
    const [updatedStudent, setUpdatedStudent] = useState(initialFormValues);

    const [validated, setValidated] = useState(false);

    useEffect(() => {
        if (student) {
            setUpdatedStudent({
                id: student.id,
                name: student.name || '',
                email: student.email || '',
                mobile: student.mobile || ''
            });
        }
    }, [student]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedStudent((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            console.log('Updated student details:', updatedStudent);
            try {
                const response = await axios.put(`http://localhost:8080/student/update`, updatedStudent);
                console.log("response: ", response);
                getStudentList();
                handleClose();
            } catch (error) {
                console.error('Error updating student:', error);
            }
        }
        setValidated(true);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSave}>
                        <Form.Group controlId="formStudentName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={updatedStudent.name}
                                onChange={handleChange}
                                placeholder="Enter student's name"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter the student's name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formStudentEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={updatedStudent.email}
                                disabled={true}
                                placeholder="Enter student's email"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formStudentMobile">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control
                                type="tel"
                                name="mobile"
                                value={updatedStudent.mobile}
                                onChange={handleChange}
                                maxLength={10}
                                pattern={Constants.PATTERN.Mobile_No}
                                placeholder="Enter student's mobile number"
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid mobile number.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default StudentUpdateForm;

