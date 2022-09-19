import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import { most_Borrow } from "store/dashboard";
import { get_sixMonth } from "store/dashboard";
import { get_oneMonth } from "store/dashboard";


function Dashboard() {

  const dispatch = useDispatch()

  const { oneMonth, sixMonth, mostBorrow, loadingMostBorrow, loadingOneMonth, loadingSixMonth } = useSelector((state) => state.dashboards)

  useEffect(() => {
    dispatch(get_oneMonth())
  }, [dispatch])

  useEffect(() => {
    dispatch(get_sixMonth())
  }, [dispatch])

  useEffect(() => {
    dispatch(most_Borrow())
  }, [dispatch])

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-book-bookmark" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Jumlah Peminjaman</p>
                      <CardTitle tag="p">{loadingOneMonth ? (<Spinner />) : oneMonth}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-calendar" /> Dalam 1 Bulan
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-book-bookmark" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Jumlah Peminjaman</p>
                      <CardTitle tag="p">{loadingSixMonth ? (<Spinner />) : sixMonth}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-calendar" /> Dalam 6 Bulan
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">
                  Data 5 Peminjam Terbanyak
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md='12'>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Nama Peminjam</th>
                          <th>Jumlah Buku Yang Dipinjam</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          loadingMostBorrow ? (<Spinner />) :
                            mostBorrow && mostBorrow.map((item) => {
                              return (
                                <tr key={item.id}>
                                  <td>{item.name}</td>
                                  <td>{item.jumlah}</td>
                                </tr>
                              )
                            })
                        }
                      </tbody>
                    </table>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
