import AddBook from 'components/book/AddBook'
import Books from 'components/book/Books'
import React from 'react'
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'
import { booksData } from 'store/book'

const index = () => {
    return (
        <div className='content'>
            <Row>
                <Col md='12'>
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">
                                Form dan Table Master Buku
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Row>
                                <Col md='6'>
                                    <AddBook />
                                </Col>
                                <Col md='6'>
                                    <Books />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default index