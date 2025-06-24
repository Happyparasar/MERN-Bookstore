import React from 'react'
import { Container, Button, Table, Row, Col, Form } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios'
function AddPincode() {
    let navigate = useNavigate()
    let [pincode, setPincode] = useState(0);
    let [delivery, setDelivery] = useState("Product can't be delivered to this address.")
    function addPincode() {
        let data = {
            pincode: pincode,
            delivery: delivery
        }
        axios({
            url: "http://localhost:3001/add/pincode",
            method: "post",
            data: data

        }).then((res) => {
            if (res.data.success) {
                alert("Pincode Added")
                navigate('/pincode')
            }
        }).catch((err) => {
            console.log(err.message);
        })
    }
    return (
        <Container>
            <Row className='justify-content-center'>
                <Col></Col>
                <Col>
                    <Form className='bordered'>
                        <Form.Group className="mb-3">
                            <Form.Label>Pincode </Form.Label>
                            <Form.Control type="Number" onChange={(e) => setPincode(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Delivery Status</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e) => setDelivery(e.target.value)}>
                                <option value="">Pincode Delivery Status</option>
                                <option value="Product can be delivered to this address.">Product can be delivered to this address.</option>
                                <option value="Product can't be delivered to this address.">Product can't be delivered to this address.</option>
                            </Form.Select>
                        </Form.Group>
                        <Button  varient="primary " className='w-100 my-3' onClick={addPincode} >Add Pincode</Button>

                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}

export default AddPincode