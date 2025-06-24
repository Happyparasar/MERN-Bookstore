import React from 'react'
import { Container, Button, Table, Row, Col, Form } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios'
function EditPincode() {
    let navigate = useNavigate()
    let [pincode, setPincode] = useState({});
    let [delivery, setDelivery] = useState("")
    let params = useParams();
    let id = params.id;
    useEffect(() => {
        axios({
          url: "http://localhost:3001/get/pincode/" + id,
          method: "get",
        })
          .then((res) => {
            setPincode(res.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
    function editPincode() {
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
                            <Form.Control type="Number" value={pincode.pincode}  />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Select aria-label="Default select example" onChange={(e) => setDelivery(e.target.value)}>
                                <option value="">Pincode Delivery Status</option>
                                <option value="Product can be delivered to this address.">Product can be delivered to this address.</option>
                                <option value="Product can't be delivered to this address.">Product can't be delivered to this address.</option>
                            </Form.Select>
                        </Form.Group>

                        <Button varient="warning" className='w-100 my-3' onClick={editPincode} >Edit Pincode</Button>

                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}

export default EditPincode