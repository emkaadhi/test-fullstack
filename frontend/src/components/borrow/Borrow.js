import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { get_borrows } from '../../store/borrow'
import { Input, InputGroup, InputGroupAddon, InputGroupText, Spinner } from 'reactstrap'

const Borrow = () => {

  const [searchUser, setSearchUser] = useState('')
  const dispatch = useDispatch()

  const { borrows ,loadingborrow} = useSelector((state) => state.borrows)

  useEffect(() => {
    dispatch(get_borrows())
  }, [])
  return (
    <>
      <InputGroup className="no-border">
        <Input placeholder="Cari berdasarkan nama peminjam dan judul buku..." onChange={(e) => setSearchUser(e.target.value)} />
        <InputGroupAddon addonType="append">
          <InputGroupText>
            <i className="nc-icon nc-zoom-split" />
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
      <table className="table">
        <thead>
          <tr>
            <th>Nama Peminjam</th>
            <th>Judul Buku</th>
            <th>Tanggal Peminjaman</th>
          </tr>
        </thead>
        <tbody>
          {
            loadingborrow ? (<Spinner/>) :
            borrows && borrows
              .filter((value) => {
                if (searchUser === "") {
                  return value;
                }
                else if
                  (
                  value.name.toLowerCase().includes(searchUser.toLowerCase())
                ) {
                  return value;
                }
                else if
                  (
                  value.title.toLowerCase().includes(searchUser.toLowerCase())
                ) {
                  return value;
                }
              })
              .map((borrow) => {
                return (
                  <tr>
                    <td>{borrow.name}</td>
                    <td>{borrow.title}</td>
                    <td>{moment(borrow.borrow_date).format('DD-MMM-yyyy')}</td>
                  </tr>
                )
              }) 
          }

        </tbody>
      </table>
    </>
  )
}

export default Borrow