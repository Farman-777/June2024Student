import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, ListGroup, Alert, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SectionComp from "./comps/SectionComp";
import FormUtil from "./comps/FormUtil";
import StudentMasterService from "../Services/StudentMasterService";
import Dialog from "./comps/Dialog";
import ModalComp from "./comps/ModalComp";
import UpdateForm from "./UpdateForm";
const FormComp = () => {
    const [students, setStudents] = useState([]);
    const [validated, setValidated] = useState(false);
    const [newStudent, setNewStudent] = useState({ name: "", email: "", mobile: "", });
    const [updateStudent, setUpdateStudent] = useState({ id: "", name: "", email: "", mobile: "", });
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false);
    const [error, setError] = useState("");
    const [show, setShow] = useState(false);
    const [studentId, setStudentId] = useState(0);


    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = StudentMasterService.getStudentList().then(result => {
                console.log("response.data: ", result.data)
                if (result.status === 200) {
                    setStudents(result.data);
                    return true;
                }
                else {
                    Dialog.error(result.message);
                    return false;
                }
            }).catch(error => {
                Dialog.error(error);
            });
        }
        finally {
            setLoading(false);
        }
    };

    const handleAddStudent = async (event) => {
        console.log("studentObject : ", newStudent);
        const form = document.getElementsByName('formStudent')[0];
        console.log("formDocument", form);
        if (form.checkValidity() === false) {
            form.reportValidity();
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            const values = FormUtil.data('formStudent');
            console.log("values : ", values);
            try {
                setLoading(true);
                await StudentMasterService.addStudentData(newStudent).then(result => {
                    if (result.status === 1) {
                        Dialog.success(result.message)
                        setNewStudent({ name: "", email: "", mobile: "" });
                        fetchStudents();
                        setValidated(false);
                        return;
                    }
                    else
                        console.error(result.message);
                }).catch(error => {
                    console.error(error);
                });
            } finally {
                setLoading(false);
            }
        }

        setValidated(true);
    };


    const handleUpdateStudent = async (event) => {
        event.preventDefault();
        console.log("updatedStudentObject : ", updateStudent);
        try {
            setLoading(true);
            await axios.put(`http://localhost:8080/student/update?id=${updateStudent.id}`, updateStudent);
            setUpdateStudent({ id: "", name: "", email: "", mobile: "" });
            fetchStudents();
        } catch (error) {
            console.error("Error updating student:", error);
            setError("Error updating student. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteStudent = async (id) => {
        console.log("id to delete record : ", id);
        try {
            setLoading(true);
            await axios.delete(`http://localhost:8080/student/delete?id=${id}`);
            fetchStudents();
        } catch (error) {
            console.error("Error deleting student:", error);
            setError("Error deleting student. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    const handleUpdateStu = (studentID) => {
        console.log("studentID: ", studentID)
        setUpdate(true);
        setShow(true);
        setStudentId(studentID);

    }


    const handleClose = () => setShow(false);

    return (
        <div className="container">
            <h1 className="mt-4 mb-4">Student Management</h1>

            <div className="mb-4">
                <Form noValidate validated={validated} name="formStudent">
                    <SectionComp
                        sectionTitle="Add Students"
                        collapse
                        type="textWithin"
                        pt0
                    >
                        <Form.Group controlId="formName">
                            <Form.Control
                                name="name"
                                className="mb-2"
                                type="text"
                                placeholder="Name"
                                value={newStudent.name}
                                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Control
                                name="email"
                                className="mb-2"
                                type="email"
                                placeholder="Email"
                                value={newStudent.email}
                                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formMobile">
                            <Form.Control
                                name="mobile"
                                className="mb-2"
                                type="text"
                                placeholder="Mobile"
                                value={newStudent.mobile}
                                onChange={(e) => { setNewStudent({ ...newStudent, mobile: e.target.value }); }}
                                maxLength="10"
                                pattern={"[1-9]{1}[0-9]{9}"}
                                required
                            />
                            <Button
                                variant="primary"
                                className="mb-2"
                                disabled={loading}
                                onClick={handleAddStudent}
                            >
                                {loading ? "Adding..." : "Add"}
                            </Button>
                        </Form.Group>
                    </SectionComp>
                </Form>
            </div>



            <SectionComp
                sectionTitle="Students"
                collapse
                type="textWithin"
                pt0
            >
                <div className="shadow p-3 rounded">
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th className="ms-4">Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.mobile}</td>
                                    <td>
                                        <Button
                                            variant="danger"
                                            className="me-2"
                                            onClick={() => handleDeleteStudent(student.id)}
                                            disabled={loading}
                                        >
                                            {loading ? "Deleting..." : "Delete"}
                                        </Button>
                                        <Button
                                            variant="warning"
                                            className="ms-4"
                                            onClick={() => handleUpdateStu(student.id)}
                                            disabled={loading}
                                        >
                                            {loading ? "Updating..." : "Update"}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </SectionComp>

            <ModalComp show={show} modalBody={<UpdateForm studentId={studentId}  handleClose={handleClose}/>} />
        </div>
    );
}

export default FormComp