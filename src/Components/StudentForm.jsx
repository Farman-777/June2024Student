import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Table, Stack } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import StudentUpdateForm from './StudentUpdateForm';
import SectionComp from '../comps/SectionComp'
import Constants from '../comps/Constants';

const initialFormValues = {
    id: '',
    name: '',
    email: '',
    mobile: ''
};

const StudentForm = () => {
    const [data, setData] = useState([]);
    const [validated, setValidated] = useState(false);
    const [formValues, setFormValues] = useState({ ...initialFormValues });
    const [updatingStudent, setUpdatingStudent] = useState({ ...initialFormValues });

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getStudentData = () => {
        axios.get("http://localhost:8080/student/all")
            .then(response => {
                setData(response.data);
            })
            .catch(error => console.error('Error fetching student data:', error));
    };

    useEffect(() => {
        getStudentData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            form.reportValidity();
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/student/add", formValues);
            console.log(response.data);
            getStudentData();
            Swal.fire({
                icon: 'success',
                title: 'Record Addition',
                text: 'Record is Added Successfully'
            });
            handleClose();
            setFormValues({ ...initialFormValues });
        } catch (error) {
            if (error.response) {
                console.error('Request failed with status:', error.response.status);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data // Display error message from backend
                });
            } else {
                console.error('Request failed:', error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Request failed. Please check your network connection.'
                });
            }
        } finally {
            setValidated(true);
        }
    };

    const handleUpdate = (studentId) => {
        const studentToUpdate = data.find(student => student.id === studentId);
        setUpdatingStudent({ ...studentToUpdate });
        handleShow();
    };

    const handleDelete = async (id) => {
        console.log("Deleting student with ID:", id);
        try {
            await axios.delete(`http://localhost:8080/student/delete?id=${id}`);
            getStudentData();
        } catch (error) {
            console.error("Error deleting student:", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to delete student. Please try again.'
            });
        }
    };

    return (
        <div style={{ width: "75vw", marginLeft: "10%" }}>
            <Container>
                <Row>
                    <Col>
                        <Form name="formStudent" onSubmit={handleSubmit} className="p-4" style={{ border: "1px solid black", margin: "25px 0", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
                            <legend className="float-none w-auto sectionTitle" style={{ cursor: "pointer" }}> Student Details </legend>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control name="name" type="text" placeholder="Enter Name" value={formValues.name} onChange={(e) => setFormValues({ ...formValues, name: e.target.value })} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Enter Email" value={formValues.email} onChange={(e) => setFormValues({ ...formValues, email: e.target.value })} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicMobile">
                                <Form.Label>Mobile</Form.Label>
                                <Form.Control name="mobile" type="tel" placeholder="Enter Mobile" maxLength="10" pattern={Constants.PATTERN.Mobile_No} value={formValues.mobile} onChange={(e) => setFormValues({ ...formValues, mobile: e.target.value })} required />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <SectionComp pt0 sectionTitle="Student Record List" collapse type="textWithin">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((student, index) => (
                                        <tr key={student.id}>
                                            <td>{index + 1}</td>
                                            <td>{student.name}</td>
                                            <td>{student.email}</td>
                                            <td>{student.mobile}</td>
                                            <td>
                                                <Stack gap={4} direction="horizontal">
                                                    <Button className="text-white me-1" variant="warning" onClick={() => handleUpdate(student.id)}>Update</Button>
                                                    <Button className="text-white" variant="danger" onClick={() => handleDelete(student.id)}>Delete</Button>
                                                </Stack>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </SectionComp>
                    </Col>
                </Row>
            </Container>
            <StudentUpdateForm
                show={show}
                handleClose={handleClose}
                student={updatingStudent}
                getStudentList={getStudentData}
            />
        </div>
    );
};

export default StudentForm;
