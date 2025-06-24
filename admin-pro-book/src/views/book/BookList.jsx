import React from 'react'
import { Container, Button, Table, Row, Form } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from 'react-router-dom'
import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios'
function BookList() {
  const navigate = useNavigate()
  let [books, setBooks] = useState([])
  let [searchInput, setSearchInput] = useState('')
  function gotoEdit(id) {
    navigate('/edit/book/' + id)
  }
  useEffect(() => {
    axios({
      url: 'http://localhost:3001/books',
      method: 'get',
      params: {

        search: searchInput,
      },
    }).then((res) => {
      setBooks(res.data.data)
    }).catch((err) => {
      console.log(err)
      alert("something went wrong....")
    })
  }, [searchInput])

  function addBookRoute() {
    navigate('/add/book') 
  }
  function gotoEdit(id){
    navigate('/edit/book/'+ id);
  }
  function handleSearch(e) {
    setSearchInput(e.target.value)
  }
  return (
    <Container>
      <Row>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">

          <Form.Control type="text" placeholder="Search By BooK name" onChange={handleSearch} />
        </Form.Group>
      </Row>
      <div style={{ float: 'right', marginBottom: '10px' }}>
        <Button variant="primary" onClick={addBookRoute}>Add Book</Button>
      </div>
      {searchInput}
      {/* {
                books.length > 0 && <BookList data = { books }> </BookList>
            } */}
      <Table bordered hover className="mt-2">
        <thead>
          <tr>
            <th>Image</th>
            <th>Book Name</th>
            <th>Description</th>
            <th>Price</th>
            <th> Actions </th>
          </tr>
        </thead>
        <tbody>
          {
            books.map((book, i) =>
              <tr key={i}>
                <td><img src={book.bookImage} width="30px" height="30px"></img></td>
                <td>{book.bookName}</td>
                <td>{book.bookDescription}</td>
                <td>{book.price}</td>
                <td><Button variant="warning" size="sm" onClick={() => gotoEdit(book._id)}><i className="bi bi-pencil"></i></Button></td>
              </tr>
            )
          }
        </tbody>
      </Table>
    </Container>
  )
}
export default BookList

