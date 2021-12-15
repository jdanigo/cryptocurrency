import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card , Alert } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import { UporDown } from "../../utils";

function CryptoDetail() {
  const params = useParams();
  const { id } = params;
  const [crypto, setCrypto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
      if(id){
        axios
        .get(`${process.env.REACT_APP_API_URL}/ticker/?id=${id}`)
        .then((response) => {
          console.log(response);
          setCrypto(response.data[0]);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setFailed(true);
          console.log("se ha presentado un error", error);
        });
      }
  }, [id]);

  return (
    <>
      {loading ? (
        <Skeleton count={5} />
      ) : (
        <>
        {failed
        ?
        (
            <>
            <Alert variant={'danger'}>
            An Error has occured
            </Alert>
            </>
        )
        :
        (
            <>
            <Container fluid>
            <Row className="my-3">
              <Col lg={12}>
                <div className="text-center">
                  <h1>
                    {crypto.name} ({crypto.symbol}){" "}
                  </h1>
                </div>
              </Col>
            </Row>

            <Row>
              <Col lg={3}>
                <Card>
                  <Card.Body>
                    <Card.Title>&#36;{crypto.price_usd}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      USD Price
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3}>
                <Card>
                  <Card.Body>
                    <Card.Title>&#36;{crypto.price_btc}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      BTC Price
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3}>
                <Card>
                  <Card.Body>
                    <Card.Title>&#36;{crypto.volume24}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      24h Volume
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={3}>
                <Card>
                  <Card.Body>
                    <Card.Title>&#36;{crypto.market_cap_usd}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Market Cap
                    </Card.Subtitle>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <Card>
                  <Card.Body>
                      <Row>
                      <Col lg={3} className="border-end">
                      <div className="text-center">
                        <h4>{UporDown(crypto.percent_change_1h)}</h4>
                        <h5>1h</h5>
                      </div>
                    </Col>
                    <Col lg={3} className="border-end">
                      <div className="text-center">
                        <h4>{UporDown(crypto.percent_change_24h)}</h4>
                        <h5>24h</h5>
                      </div>
                    </Col>
                    <Col lg={3} className="border-end">
                      <div className="text-center">
                        <h4>{UporDown(crypto.percent_change_7d)}</h4>
                        <h5>7d</h5>
                      </div>
                    </Col>
                    <Col lg={3}>
                      <div className="text-center">
                        <h4>{UporDown(crypto.volume24_native)}</h4>
                        <h5>24h Vol</h5>
                      </div>
                    </Col>

                      </Row>
                    
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
            </>
        )
        }
          
        </>
      )}
    </>
  );
}
export default CryptoDetail;
