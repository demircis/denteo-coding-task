import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class TimeModal extends React.Component<{}, {show: boolean}> {

    constructor(props: any) {
        super(props);
        this.state = {
            show: false
        };
    }

    handleShow = () => {
        this.setState({show: true});
    }

    handleClose = () => {
        this.setState({show: false});
    }

    render() {
        return (
            <>
            <Button onClick={this.handleShow}>Pick an available time slot.</Button>

            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Dialog>
                    <Modal.Header closeButton>
                        <Modal.Title>Pick an available time slot</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Select>
                            <option>Available time slots</option>
                            <option>12:30 pm</option>
                            <option>17:00 pm</option>
                        </Form.Select>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                        <Button variant="primary" onClick={this.handleClose}>Book</Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
            </>
        );
    }
}