import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_customers, delete_customer, detail_customer } from 'store/user'
import { FaEdit, FaTimes } from 'react-icons/fa'
import { Input, InputGroup, InputGroupAddon, InputGroupText, Spinner } from 'reactstrap'

const Users = () => {

    const [searchUser, setSearchUser] = useState('')
    const dispatch = useDispatch()

    const { customers, loadingcustomer, deletecustomer } = useSelector((state) => state.customers)

    useEffect(() => {
        dispatch(get_customers())
    }, [])

    useEffect(() => {
        if (deletecustomer) {
            dispatch(get_customers())
        }
    }, [deletecustomer, dispatch])



    return (
        <div>
            <InputGroup className="no-border">
                <Input placeholder="Cari berdasarkan nama peminjam..." onChange={(e) => setSearchUser(e.target.value)}/>
                <InputGroupAddon addonType="append">
                    <InputGroupText>
                        <i className="nc-icon nc-zoom-split" />
                    </InputGroupText>
                </InputGroupAddon>
            </InputGroup>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nama User</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loadingcustomer ? (<Spinner/>) :
                        customers && customers
                        .filter((value)=>{
                            if (searchUser === "") {
                                return value;
                              }
                              else if
                                (
                                value.name.toLowerCase().includes(searchUser.toLowerCase())
                              ) {
                                return value;
                              }
                        })
                        .map((customer) => {
                            return (
                                <tr key={customer.id}>
                                    <td>{customer.name}</td>
                                    <td>
                                        <button type="button" className="btn btn-warning btn-sm mr-1" onClick={() => dispatch(detail_customer(customer))}><FaEdit /> edit</button>
                                        <button type="button" className="btn btn-danger btn-sm" onClick={() => dispatch(delete_customer(customer.id))}><FaTimes /> delete</button>
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

export default Users