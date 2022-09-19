import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_books } from 'store/book'
import { get_customers } from 'store/user'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import Swal from 'sweetalert2'
import { add_borrow } from 'store/borrow'
import { get_borrows } from 'store/borrow'

const AddBorrow = () => {
    const [selectBook, setSelectBook] = useState('')
    const [selectCustomer, setSelectCustomer] = useState('')
    const [selectDate, setSelectDate] = useState(null)

    const dispatch = useDispatch()

    const { books } = useSelector((state) => state.books)
    const { customers } = useSelector((state) => state.customers)
    const {addborrow} = useSelector((state)=>state.borrows)

    useEffect(() => {
        dispatch(get_books())
    }, [])

    useEffect(() => {
        dispatch(get_customers())
    }, [])

    const onAdd = (e) => {
        e.preventDefault()

        dispatch(add_borrow({ 
            customer_id: selectCustomer,
            book_id: selectBook,
            borrow_date: moment(selectDate).format("YYYY-MM-DD HH:mm:ss")
        }))

        Swal.fire({
            position: 'top',
            icon: 'success',
            title: `Borrow Book success !`,
            showConfirmButton: false,
            timer: 2500
        })
    }

    useEffect(()=>{
        if (addborrow) {
            dispatch(get_borrows())
            setSelectBook('') 
            setSelectCustomer('') 
            setSelectDate(null) 
        }
    },[addborrow,dispatch])

    return (
        <>
            <form onSubmit={onAdd}>
                <div className='form-group'>
                    <label htmlFor="">Nama Peminjam</label>
                    <select name="" id="" onChange={(e) => {
                        const selectedCustomer = e.target.value
                        setSelectCustomer(selectedCustomer)
                    }} className='form-control' required>
                        <option value="">Pilih Nama Peminjam</option>
                        {
                            customers.map((item) => {
                                return (
                                    <>
                                        <option value={item.id}>{item.name}</option>
                                    </>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor="">Judul Buku</label>
                    <select name="" id="" onChange={(e) => {
                        const selectedBook = e.target.value
                        setSelectBook(selectedBook)
                    }} className='form-control' required>
                        <option value="">Pilih Judul Buku</option>
                        {
                            books.map((book) => {
                                return (
                                    <>
                                        <option value={book.id}>{book.name}</option>
                                    </>
                                )
                            })
                        }
                    </select>
                </div>
                <label htmlFor="" className='mt-2'>Pilih Tanggal</label>
                <DatePicker
                    className='form-control'
                    selected={selectDate}
                    onChange={date => setSelectDate(date)}
                    dateFormat="Y-M-d"
                    showYearDropdown
                    scrollableYearDropdown
                    showMonthDropdown
                    scrollableMonthYearDropdown
                    maxDate={new Date()}
                    required
                />
                <input type='submit' value='Submit' className='btn btn-primary btn-block' />
            </form>
        </>
    )
}

export default AddBorrow