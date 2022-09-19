import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add_book, update_book, get_books } from '../../store/book'
import Swal from 'sweetalert2'

const AddBook = () => {
    const [name, setName] = useState('')
    // const [description, setDescription] = useState('')
    // const [price, setPrice] = useState('')
    // const [image, setImage] = useState('')
    const [id, setId] = useState('')

    const dispatch = useDispatch()

    const { addbook, detailbook, updatebook } = useSelector((state) => state.books)

    const onAdd = (e) => {
        e.preventDefault()

        if (id) {
            dispatch(update_book({ id: id, name: name}))
            Swal.fire({
                position: 'top',
                icon: 'info',
                title: `Update book success !`,
                showConfirmButton: false,
                timer: 2500
            })
        } else {
            try {
                dispatch(add_book({ name}))
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: `Add book success !`,
                    showConfirmButton: false,
                    timer: 2500
                })
            } catch (err) {
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: err,
                    showConfirmButton: false,
                    timer: 2500
                })
            }
        }
    }

    useEffect(() => {
        if (addbook) {
            dispatch(get_books())
            setName('')
            // setImage('')
            // setDescription('')
            // setPrice('')
        }
    }, [addbook, dispatch])

    useEffect(() => {
        if (detailbook) {
            setName(detailbook.name)
            // setImage(detailbook.image)
            // setDescription(detailbook.description)
            // setPrice(detailbook.price)
            setId(detailbook.id)
        }
    }, [detailbook, dispatch])

    useEffect(() => {
        if (updatebook) {
            dispatch(get_books())
            setName('')
            // setImage('')
            // setDescription('')
            // setPrice('')
            setId('')
        }
    }, [updatebook, dispatch])

    return (
        <>
            <form onSubmit={onAdd}>
                <div className="form-group">
                    <label htmlFor=""><h6>Nama Buku</h6></label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary btn-block">submit</button>
            </form>
        </>
    )
}

export default AddBook