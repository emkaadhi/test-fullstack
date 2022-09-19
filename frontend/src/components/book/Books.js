import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_books } from 'store/book'
import { FaEdit, FaTimes } from 'react-icons/fa'
import { delete_book } from 'store/book'
import { detail_book } from 'store/book'
import Swal from 'sweetalert2'
import { Input, InputGroup, InputGroupAddon, InputGroupText, Spinner } from 'reactstrap'

const Books = () => {

    const [searchBook, setSearchBook] = useState('')
    const dispatch = useDispatch()

    const { books, loadingbook, deletebook } = useSelector((state) => state.books)

    useEffect(() => {
        dispatch(get_books())
    }, [])

    useEffect(() => {
        if (deletebook) {
            dispatch(get_books())
        }
    }, [deletebook, dispatch])



    return (
        <div>
            <InputGroup className="no-border">
                <Input placeholder="Cari berdasarkan judul buku..." onChange={(e) => setSearchBook(e.target.value)} />
                <InputGroupAddon addonType="append">
                    <InputGroupText>
                        <i className="nc-icon nc-zoom-split" />
                    </InputGroupText>
                </InputGroupAddon>
            </InputGroup>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nama Buku</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        loadingbook ? (<Spinner/>) :
                            books && books
                                .filter((value) => {
                                    if (searchBook === "") {
                                        return value;
                                    }
                                    else if
                                        (
                                        value.name.toLowerCase().includes(searchBook.toLowerCase())
                                    ) {
                                        return value;
                                    }
                                })
                                .map((book) => {
                                    return (
                                        <tr key={book.id}>
                                            <td>{book.name}</td>
                                            <td>
                                                <button type="button" className="btn btn-warning btn-sm mr-1" onClick={() => dispatch(detail_book(book))}><FaEdit /> edit</button>
                                                <button type="button" className="btn btn-danger btn-sm" onClick={() => dispatch(delete_book(book.id))}><FaTimes /> delete</button>
                                            </td>
                                        </tr>
                                    )
                                })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default Books