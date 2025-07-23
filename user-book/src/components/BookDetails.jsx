import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

function BookDetail() {
    let param = useParams();
    let [book, setBook] = useState({});
    let [status, setStatus] = useState("");
    let [pincode, setPincode] = useState();

    useEffect(() => {
        axios({
            url: 'http://localhost:3001/user/book/' + param.id,
            method: 'get'
        }).then((res) => {
            setBook(res.data.data);
        }).catch((err) => {
            console.log(err.message);
        });
    }, [param]);

    function checkStatus() {
        let data = {
            pincode: pincode
        };
        axios({
            url: "http://localhost:3001/check/status",
            method: "post",
            data: data,
        }).then((res) => {
            if (res.data.success) {
                setStatus(res.data.data);
            }
        }).catch((err) => {
            console.log(err.message);
        });
    }

    function gotopurchase() {
        let token = localStorage.getItem('token');
        if (token) {
            alert("You are most welcome and may proceed for payment");
        } else {
            alert("Please, Login First...");
        }
    }

    return (
        <Container fluid>
            <div style={{ display: "flex", marginTop: "10px" }}>
                <div style={{ border: '1px solid lightgrey' }}>
                    <img src={book.bookImage} height="400px" width="350px" alt="" />
                </div>
                <div style={{ marginLeft: '20px' }}>
                    <p style={{ fontSize: '25px', color: 'grey' }}>{book.bookName}</p>
                    <div style={{
                        width: '70px',
                        backgroundColor: 'seaGreen',
                        borderRadius: '5px',
                        color: 'white',
                        fontSize: '15px'
                    }}>4.4*</div>
                    <span style={{ fontWeight: 'bold' }}>&#x20b9;{book.finalPrice}</span>
                    <span style={{ marginLeft: '10px', color: 'grey', fontSize: '17px' }}>
                        &#x20b9;<s>{book.price}</s>
                    </span>
                    <p style={{ fontSize: '15px', color: 'grey' }}>Author : {book.authorName}</p>
                    <p style={{ fontSize: '15px', color: 'grey' }}>Highlights :</p>

                    <li style={{ fontSize: '16px', color: 'gray' }}>Description: {book.bookDescription}</li>
                    <li style={{ fontSize: '16px', color: 'gray', marginTop: '10px' }}>Language: {book.language}</li>
                    <li style={{ fontSize: '16px', color: 'gray', marginTop: '10px' }}>Edition: {book.edition}</li>
                    <li style={{ fontSize: '16px', color: 'gray', marginTop: '10px' }}>Binding: {book.binding}</li>
                    <li style={{ fontSize: '16px', color: 'gray', marginTop: '10px' }}>Publisher: {book.publisher}</li>
                    <li style={{ fontSize: '16px', color: 'gray', marginTop: '10px' }}>Seller: {book.seller}</li>

                    <div>
                        <label className="m-3"><h5>Check Delivery Status : </h5></label>
                        <input type="Number" onChange={(e) => setPincode(e.target.value)} />
                        <Button className="m-3 btn-dark btn-sm" onClick={checkStatus}>Check</Button>
                        <h6 style={{ color: "red" }}>{status}</h6>
                    </div>

                    <p>
                        <Button variant='success' onClick={gotopurchase}>Buy Now</Button>
                    </p>
                </div>
            </div>
        </Container>
    );
}

export default BookDetail;
