import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { DateTime, Interval } from 'luxon';

const DAY_START = 8;
const DAY_END = 18;
const LUNCH_START = 12;
const LUNCH_END = 13;
const searchRange = { from: DateTime.fromISO("2021-01-04"), to: DateTime.fromISO("2021-01-07") };

export default class TimeModal extends React.Component<{}, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            show: false,
            appointments: [],
            availableSlots: []
        };
    }

    handleShow = () => {
        this.setState({show: true});
    }

    handleClose = () => {
        this.setState({show: false});
    }

    async componentDidMount() {
        const response = await axios.get("http://localhost:5000/api/appointments");
        const json = await response.data;
        var appointments = json.map((element: any) => {
            var from = DateTime.fromISO(element.from);
            var to = DateTime.fromISO(element.to);
            return Interval.fromDateTimes(from, to);
        });
        var avail = this.calculateAvailableSlots(appointments);
        this.setState({ appointments: appointments, availableSlots: avail });
    }

    calculatePossibleSlots() {
        const range = searchRange.to.diff(searchRange.from, 'days').toObject().days;
        var possibleSlots = [];
        if (range) {
            for (let i = 0; i < range; i++) {
                let day = searchRange.from.plus({days: i});
                let start;
                for (start = day.plus({hours: DAY_START}); start <= day.plus({hours: LUNCH_START}).minus({minutes: 30}); start = start.plus({minutes: 15})) {
                    possibleSlots.push(Interval.fromDateTimes(start, start.plus({minutes: 30})));
                }
                for (start = day.plus({hours: LUNCH_END}); start <= day.plus({hours: DAY_END}).minus({minutes: 30}); start = start.plus({minutes: 15})) {
                    possibleSlots.push(Interval.fromDateTimes(start, start.plus({minutes: 30})));
                }
            }
        }
        return possibleSlots;
    }

    calculateAvailableSlots(appointments: any) {
        var possibleSlots = this.calculatePossibleSlots();
        var filterSlots: any = [];
        for (let possible of possibleSlots) {
            let pushed: boolean = false;
            for (let app of appointments) {
                if (possible.overlaps(app) || possible.engulfs(app)) {
                    filterSlots.push(false);
                    pushed = true;
                    break;
                }
            }
            if (!pushed) {
                filterSlots.push(true);
            }
        }
        var avail = possibleSlots.filter((value: any, index: number) => { return filterSlots[index] === true });
        return avail;
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
                            {this.state.availableSlots.map((opt: any) => (
                                <option value={opt.toFormat('yyyy-MM-dd HH:mm')}>{opt.toFormat('yyyy-MM-dd HH:mm')}</option>
                            ))}
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