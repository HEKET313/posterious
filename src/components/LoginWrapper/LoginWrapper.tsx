import * as React from "react";
import {Col, Container, Row} from "reactstrap";
import LoginForm from "../LoginForm/LoginForm";
import {Route, Switch} from "react-router-dom";
import RegistrationForm from "../RegistrationForm/RegistrationForm";

class LoginWrapper extends React.Component {
    render() {
        return <Container style={{marginTop: "50px"}}>
            <Row>
                <Col xs="12" sm={{size: "auto", offset: "3"}}>
                    <Switch>
                        <Route exact path={"/register"} component={RegistrationForm} />
                        <Route exact path={"/login"} component={LoginForm} />
                    </Switch>
                </Col>
            </Row>
        </Container>;
    }
}

export default LoginWrapper;