import * as React from "react";
import {Col, Container, Row} from "reactstrap";
import LoginForm from "../LoginForm/LoginForm";

class LoginWrapper extends React.Component {
    render() {
        return <Container style={{marginTop: "50px"}}>
            <Row>
                <Col xs="12" sm={{size: "auto", offset: "3"}}>
                    <LoginForm/>
                </Col>
            </Row>
        </Container>;
    }
}

export default LoginWrapper;