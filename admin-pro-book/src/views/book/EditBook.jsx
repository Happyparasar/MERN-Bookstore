import { Form, Button, Spinner, Modal, Row, Col } from "react-bootstrap"
import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import React from "react"
function EditBook() {
    const [book, setBook] = useState({});
    const [file, setFile] = useState(null);
    let [showSpinner, setShowSpinner] = useState(false)
    let [buttonDisable, setbuttonDisabled] = useState(false)



    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/book/${id}`)
            .then((res) => {
                setBook(res.data.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [id]);

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        navigate('/books')
    }
    function editBook() {
        setbuttonDisabled(true)
        setShowSpinner(true)
        const formData = new FormData();
        formData.append('bookName', bookName)
        formData.append('authorName', authorName)
        formData.append('bookDescription', bookDescription)
        formData.append('language', language)
        formData.append('pages', pages)
        formData.append('status', status)
        formData.append('category', category)
        formData.append('isDiscountApplicable', isDiscountApplicable)
        formData.append('discountType', discountType)
        formData.append('discountedUnit', discountedUnit)
        formData.append('seller', seller)
        formData.append('binding', binding)
        formData.append('publisher', publisher)
        formData.append('edition', edition)
        formData.append('returnPolicy', returnPolicy)
        formData.append('quantityAvailable', quantityAvailable)
        formData.append('price', price)
        formData.append('file', file);
        formData.append('fileName', file.name);
        axios({
            // Endpoint to send files
            url: "http://localhost:3001/add/book",
            method: "post",
            data: formData,
            headers: {
                'content-type': 'multipart/form-data',
            },
        }).then((res) => {
            console.log(res)
            console.log("------------------------")
            console.log(res.data, 'req.data')
            if (res.data.success) {
                setShowSpinner(false)
                setShow(true)
            }
        }).catch((err) => {
            console.log(err)
        });
    }
    return (
        // eslint-disable-next-line react/react-in-jsx-scope
        <>
            {
                showSpinner &&
                <Spinner style={{ left: '50%', position: 'absolute', textAlign: 'center', top: '50%' }} animation="border" />
            }

            <Form>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Book Name</Form.Label>
                            <Form.Control value={book.bookName} type="text" onChange={(e) => setBookName(e.target.value)} placeholder="Book Name" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Author Name</Form.Label>
                            <Form.Control value={book.authorName} type="text" onChange={(e) => setAuthorName(e.target.value)} placeholder="Author Name" />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Book Description</Form.Label>
                    <Form.Control value={book.bookDescription} as="textarea" onChange={(e) => setBookDescription(e.target.value)} rows={3} />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Label>Language</Form.Label>
                        <Form.Select value={ book.language|| ""} aria-label="Default select example" onChange={(e) => setLanguage(e.target.value)}>
                            <option value="Hindi">Hindi</option>
                            <option value="English">English</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label>Pages </Form.Label>
                            <Form.Control value={ book.pages} type="text" onChange={(e) => setPages(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Status</Form.Label>
                        <Form.Select value={ book.status|| ""} aria-label="Default select example" onChange={(e) => setStatus(e.target.value)}>
                            <option value="New">New</option>
                            <option value="PreOwned">PreOwned</option>
                        </Form.Select>
                    </Col>
                    <Col>
                        <Form.Label>Category</Form.Label>
                        <Form.Select value={book.category || ""} aria-label="Default select example" onChange={(e) => setCategory(e.target.value)}>
                            <option value="Academic">Academic</option>
                            <option value="Comic">Comic</option>
                            <option value="Horror">Horror</option>
                            <option value="Sports">Sports</option>
                            <option value="Beauty">Beauty</option>
                            <option value="Medical">Medical</option>
                        </Form.Select>
                    </Col>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Price</Form.Label>
                            <Form.Control value={book.price} type="Number" placeholder="Book Price" onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Is Discount Applicable</Form.Label>
                            <Form.Check type="switch" id="custom-switch" onChange={(e) => setisDiscountApplicable(e.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Discount Type</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e) => setDiscountType(e.target.value)}>
                                <option value="Fixed">Fixed</option>
                                <option value="Percentage">Percentage</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Discount Amount/Percentage</Form.Label>
                            <Form.Control value={book.discountedUnit} type="Number" onChange={(e) => setDiscountedUnit(e.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Seller</Form.Label>
                            <Form.Control value={book.seller} type="text" onChange={(e) => setSeller(e.target.value)} placeholder="Seller Name" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Binding Type</Form.Label>
                            <Form.Control value={book.binding} type="text" onChange={(e) => setBinding(e.target.value)} placeholder="Binding Type" />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Publisher</Form.Label>
                            <Form.Control value={book.publisher} type="text" onChange={(e) => setPublisher(e.target.value)} placeholder="Publisher" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Edition</Form.Label>
                            <Form.Control value={book.edition} type="text" onChange={(e) => setEdition(e.target.value)} placeholder="Edition" />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Return Policy</Form.Label>
                    <Form.Control  value={book.returnPolicy} as="textarea" onChange={(e) => setReturnPolicy(e.target.value)} rows={3} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>quantityAvailable</Form.Label>
                    <Form.Control value={book.quantityAvailable} type="number" onChange={(e) => setQuantityAvailable(e.target.value)} rows={3} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Select Image</Form.Label>
                    <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} placeholder="Author Name" />
                </Form.Group>
                <Button variant="primary" disabled={buttonDisable} onClick={editBook}>Edit Book</Button>
            </Form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>status</Modal.Title>
                </Modal.Header>
                <Modal.Body>Book has been edited successfully</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </>
    )
}
export default EditBook