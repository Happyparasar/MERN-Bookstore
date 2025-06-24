import React from 'react'
import { Container, Button, Table, Row, Form } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios'
function PincodeList() {
  const navigate = useNavigate()
  let[pincodes, setPincodes]=useState([]);
  let[delivery, setDelivery]=useState(false);
  let [searchInput, setSearchInput] = useState('')
  function gotoEdit(id) {
    navigate('/edit/book/' + id)
  }
  useEffect(() => {
    axios({
      url: 'http://localhost:3001/pincodes',
      method: 'get',
      params: {

        search: searchInput,
      },
    }).then((res) => {
      setPincodes(res.data.data)
    }).catch((err) => {
      console.log(err)
      alert("something went wrong....")
    })
  }, [searchInput])

  function addPincode(){
    navigate('/add/pincode')
  }
  
  function gotoEdit(id){
    navigate('/edit/pincode/'+ id);
  }
  
  return (
    <Container>
      <Row>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

          <Form.Control type="text" placeholder="Search By Pincode"  />
        </Form.Group>
      </Row>
      <div style={{ float: 'right', marginBottom: '10px' }}>
        <Button variant="primary" onClick={addPincode}>Add Pincode</Button>
      </div>
      {searchInput}
      {/* {
                books.length > 0 && <BookList data = { books }> </BookList>
            } */}
      <Table bordered hover className="mt-2">
        <thead>
          <tr>
            <th>Pincode</th>
            <th>Delivery</th>
            <th> Actions </th>
          </tr>
        </thead>
        <tbody>
          {
            pincodes.map((pincode, i) =>
              <tr key={i}>
                <td>{pincode.pincode}</td>
                <td>{pincode.delivery}</td>
                <td><Button variant="warning" size="sm" onClick={() => gotoEdit(pincode._id)}><i className="bi bi-pencil"></i></Button></td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </Container>
  )
}
export default PincodeList

