import { useEffect } from "react";
import axios from "axios";
import { Container, Card, Row, Col ,Button } from "react-bootstrap";
import { useState } from "react";
import {useNavigate} from "react-router-dom"


function Home() {
    let [books, setBooks] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        axios({
            url: "http://localhost:3001/user/books",
            method: "get",

        }).then((res) => {
            console.log(res)
            setBooks(res.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    function goToViewPage(id){
        navigate("/book/"+id)
    }
    return (
        <Container fluid>
            <Row>

                {
                    books.map((book, i) =>
                        <Col key={i} lg={3} className="mt-3">
                            <Card style={{ width: '18rem' }}>
                                <Card.Img src={book.bookImage} className="w-50 h-50" ></Card.Img>
                                <Card.Body>
                                    <Card.Title>{book.bookName}</Card.Title>
                                    <Card.Text>{book.bookDescription}</Card.Text>
                                    <div style={{width : "50px ", backgroundColor: "seaGreen", borderRadius: "5px" , color : "white", padding: "10px"}}>4.4 <i class="bi bi-star-fill"></i></div>
                                    <span style={{color: "grey", display: "black"}}>{book.language}, {book.author}</span>
                                    <span style={{fontWeight:'bold'}}>&#x20b9; {book.price}</span>
                                </Card.Body>
                                <Button className="w-100" style={{alignItems:"center", margin:"auto"}} onClick={()=>goToViewPage(book._id)}>View Detail</Button>
                            </Card>
                        </Col>
                    )
                }
            </Row>
        </Container>
    )
}
export default Home