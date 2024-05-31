import React, { useState, useEffect } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const UpdateForm = ({ studentId, handleClose }) => {
    const [updateStudent, setUpdateStudent] = useState({
        id: studentId,
        name: '',
        email: '',
        mobile: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (studentId) {
            // Fetch student details by ID and set the initial state
            fetchStudentDetails();
        }
    }, [studentId]);

    const fetchStudentDetails = async () => {
        try {
            console.log("studentId : ", studentId);
            const response = await axios.get(`http://localhost:8080/student/${studentId}`);
            const studentData = response.data;
            console.log("studentData : ", studentData);
            setUpdateStudent({
                id: studentData.id,
                name: studentData.name,
                email: studentData.email,
                mobile: studentData.mobile
            });
        } catch (error) {
            console.error('Error fetching student details:', error);
        }
    };

    const handleUpdateStudent = async (event) => {
        console.log("hi");
        //     event.preventDefault();
        //     console.log("updateStudent : ", updateStudent);
        handleClose();
        //     setMessage('');
        //     try {
        //         const response = await axios.put(`http://localhost:8080/student/${updateStudent.id}`, updateStudent);
        //         setMessage('Student updated successfully');
        //     } catch (error) {
        //         console.error('Error updating student:', error);
        //         setMessage('Error updating student');
        //     }
    };

    const handleStudentChange = (event) => {
        const { name, value } = event.target;
        setUpdateStudent((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    if (updateStudent) { console.log(updateStudent); }

    return (
        <>
            <Modal.Header
            // closeButton
            >
                <Modal.Title>UpdateForm</Modal.Title>
            </Modal.Header>
            <div className="p-4">
                <Form className="shadow-lg p-4 rounded" onSubmit={handleUpdateStudent}>
                    <Form.Group controlId="formUpdateName" className="mb-3">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            name='name'
                            type="text"
                            placeholder="Enter name"
                            value={updateStudent.name}
                            onChange={handleStudentChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formUpdateEmail" className="mb-3">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            name='email'
                            type="email"
                            placeholder="Enter email"
                            value={updateStudent.email}
                            onChange={handleStudentChange}
                            disabled={true}
                        />
                    </Form.Group>
                    <Form.Group controlId="formUpdateMobile" className="mb-3">
                        <Form.Label>Mobile:</Form.Label>
                        <Form.Control
                            name='mobile'
                            type="text"
                            placeholder="Enter mobile number"
                            value={updateStudent.mobile}
                            onChange={handleStudentChange}
                        />
                    </Form.Group>
                    {message && <div className="mt-2">{message}</div>}
                    <Button
                        variant="warning"
                        // type="submit"
                        className="w-100 mb-3"
                    // onClick={handleUpdateStudent}
                    >
                        Update
                    </Button>
                </Form>
            </div>
        </>
    );
};

export default UpdateForm;
