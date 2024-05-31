import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UpdateForm from '../UpdateForm';

function ModalComp({
    show,
    handleClose,
    studentId,
    modalBody,
    close = false,
}) {

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className='mb-4'
            >
                {/* <Modal.Header closeButton>
                    <Modal.Title>Modal title studentId : {studentId}</Modal.Title>
                </Modal.Header>
                */}
                {/* <Modal.Body>
                    {modalBody}
                </Modal.Body> */}
                <div>
                {modalBody}
                </div>
                <Modal.Footer>
                    {close && <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>}
                </Modal.Footer> 
            </Modal>
        </>
    );
}

export default ModalComp;