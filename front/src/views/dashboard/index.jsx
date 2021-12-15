import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Table } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { parseFinancialNumber, UporDown } from "../../utils";
import { Link, Outlet } from "react-router-dom";
const useAxios = (setData, url) => {
    useEffect(
        () => {
            let mounted = true;
            const loadData = async () => {
                const result = await axios.get(url);
                if (mounted) {
                    setData(result.data.data);
                }
            };
            loadData();
            return () => {
                mounted = false;
            };
        },
        [url]
    );
};

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [search, setSearch] = useState("");
    const url = (`${process.env.REACT_APP_API_URL}/tickers/`);
    useAxios(setData, url);
    return (
        <>
            <Outlet />
            <Container fluid>
                {!data
                    ?
                    <div data-testid="loading">
                        <Skeleton count={5} />
                    </div>
                    :
                    <div data-testid="resolved">
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
                                    <tbody>
                                        {data
                                            .filter((val) => {
                                                return val.name
                                                    .toLowerCase()
                                                    .includes(search.toLowerCase());
                                            })
                                            .map((val, index) => {
                                                return (
                                                    <tr data-testid="table" key={index}>
                                                        <td>{val.id}</td>
                                                        <td className="symbol">
                                                            <Link to={"/detail/" + val.id}>
                                                                {val.symbol}
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            {val.name}
                                                        </td>
                                                        <td>
                                                            {val.rank}
                                                        </td>
                                                        <td>
                                                            &#36;{parseFinancialNumber(val.price_usd)}
                                                        </td>
                                                        <td>
                                                            {val.price_btc}
                                                        </td>
                                                        <td>
                                                            {UporDown(val.percent_change_1h)}
                                                        </td>
                                                        <td>
                                                            {UporDown(val.percent_change_24h)}
                                                        </td>
                                                        <td>
                                                            {UporDown(val.percent_change_7d)}
                                                        </td>
                                                        <td>
                                                            &#36;{parseFinancialNumber(val.market_cap_usd)}
                                                        </td>
                                                        <td>
                                                            &#36;{parseFinancialNumber(val.volume24)}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </div>
                }
            </Container>
        </>
    )
}