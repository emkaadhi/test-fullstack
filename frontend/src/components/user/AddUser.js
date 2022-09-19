import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add_customer, update_customer, get_customers } from '../../store/user'
import Swal from 'sweetalert2'

const AddUser = () => {

    const [name, setName] = useState('')
    const [id, setId] = useState('')

    const dispatch = useDispatch()

    const { addcustomer, detailcustomer, updatecustomer } = useSelector((state) => state.customers)

    const onAdd = (e) => {
        e.preventDefault()
        if (id) {
            dispatch(update_customer({ id: id, name: name }))
            Swal.fire({
                position: 'top',
                icon: 'info',
                title: `Update User success !`,
                showConfirmButton: false,
                timer: 2500
            })
        } else {
            try {
                dispatch(add_customer({ name }))
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: `Add User success !`,
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
        if (addcustomer) {
            dispatch(get_customers())
            setName('')
        }
    }, [addcustomer, dispatch])

    useEffect(() => {
        if (detailcustomer) {
            setName(detailcustomer.name)
            setId(detailcustomer.id)
        }
    }, [detailcustomer, dispatch])

    useEffect(() => {
        if (updatecustomer) {
            dispatch(get_customers())
            setName('')
            setId('')
        }
    }, [updatecustomer, dispatch])

    return (
        <>
            <form onSubmit={onAdd}>
                <div className="form-group">
                    <label htmlFor=""><h6>Nama User</h6></label>
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

export default AddUser