import React, { useEffect, useState } from 'react'
import { Container, Button, Table, Row, Form } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
function UserList() {
    let navigate = useNavigate();
    let [users, setUsers] = useState([]);
    useEffect(() => {

        axios({
            url: "http://localhost:3001/users",
            method: "get",

        }).then((res) => {
            setUsers(res.data.data);
            console.log(users)
        }).catch((err) => {
            alert("Somthing went wrong...")
        })
    }, [])
    function gotoEdit(id){
        navigate('/edit/user/'+ id)
    }
    return (
        <Container>
            <Row>
                <Table bordered hover >
                    <thead>
                        <tr>
                            <th>S. No.</th>
                            <th>First Name </th>
                            <th>Email</th>
                            <th>Mobile No. </th>
                            <th>Status </th>
                            <th>Action </th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobileNo}</td>
                                    <td>{user.status}</td>
                                    <td><Button variant="warning" size="sm" onClick={() => gotoEdit(user._id)}><i className="bi bi-pencil"></i></Button></td>

                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}

export default UserList
