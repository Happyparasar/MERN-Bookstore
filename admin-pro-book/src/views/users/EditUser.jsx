import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Form ,Button } from "react-bootstrap";

const EditUser = () => {
  let navigate = useNavigate();
  let [user, setUser] = useState({});
  let [status, setStatus] = useState("Active");
  let params = useParams();
  let id = params.id;
  useEffect(() => {
    axios({
      url: "http://localhost:3001/user/" + id,
      method: "get",
    })
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function editUser(){
    let statusData = {status : status}
    console.log(status)
    axios({
      url: "http://localhost:3001/edit/user/" + id,
      method: "put",
      data:statusData
    })
      .then((res) => {
        navigate('/users')
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <Container>
        <Col>
          <Row>
            <img src={user.userImage} alt="User Image" height="400px" />
          </Row>
          <Row>
            <h1>
              {user.firstName} {user.lastName}
            </h1>
            <p>First Name : {user.firstName}</p>
            <p>Last Name : {user.lastName}</p>
            <p>Email : {user.email}</p>
            <p>Mobile No :{user.mobileNo} </p>
            <p>Status : {user.status} </p>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                  
                >
                  <option >Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Disabled">Disabled</option>
                </Form.Select>
              </Form.Group>
            </Form>

            <Container>
              <Button variant="dark" onClick={editUser}>
                Edit User
              </Button>
            </Container>
          </Row>
        </Col>
      </Container>
    </div>
  );
};

export default EditUser;
