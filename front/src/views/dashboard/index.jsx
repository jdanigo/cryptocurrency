import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Table, Alert } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { parseFinancialNumber, UporDown } from "../../utils";
import { Link, Outlet } from "react-router-dom";
function Dashboard() {
  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/tickers/`)
      .then((res) => {
        setCrypto(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setFailed(true);
        console.log("Se ha presentado un error");
      });
  }, []);

  return (
    <>
    <Outlet />
      <Container fluid role="container-dashboard">
        {/* If Loading show the skeleton */}
        {loading ? (
          <>
            <Skeleton count={5} />
          </>
        ) : (
          <>
            {failed ? (
              <>
                <Alert variant={"danger"}>An Error has occured</Alert>
              </>
            ) : (
              <>
                <Row>
                  <Col>
                    <input
                      type="text"
                      placeholder="Search..."
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                      className="form-control my-3"
                    />
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Symbol</th>
                          <th>Name</th>
                          <th>Rank</th>
                          <th>Price USD</th>
                          <th>Price BTC</th>
                          <th>1hrs</th>
                          <th>24hrs</th>
                          <th>7d</th>
                          <th>Market Cap</th>
                          <th>Volume (24hrs)</th>
                        </tr>
                      </thead>
                      {/* Mapping all the cryptos */}
                      <tbody>
                        {/* Filtering to check for the searched crypto */}
                        {crypto
                          .filter((val) => {
                            return val.name
                              .toLowerCase()
                              .includes(search.toLowerCase());
                          })
                          .map((val, index) => {
                            return (
                              <>
                                <tr key={index}>
                                  <td>{val.id}</td>
                                  <td className="symbol">
                                    <Link to={"/detail/" + val.id}>
                                      {val.symbol}
                                    </Link>
                                  </td>
                                  <td>{val.name}</td>
                                  <td>{val.rank}</td>
                                  <td>
                                    &#36;{parseFinancialNumber(val.price_usd)}
                                  </td>
                                  <td>{val.price_btc}</td>
                                  <td>
                                    <td>{UporDown(val.percent_change_1h)}</td>
                                  </td>
                                  <td>{UporDown(val.percent_change_24h)}</td>
                                  <td>
                                    <td>{UporDown(val.percent_change_7d)}</td>
                                  </td>
                                  <td>
                                    &#36;
                                    {parseFinancialNumber(val.market_cap_usd)}
                                  </td>
                                  <td>
                                    &#36;{parseFinancialNumber(val.volume24)}
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </>
            )}
          </>
        )}
      </Container>
      
    </>
  );
}

export default Dashboard;
