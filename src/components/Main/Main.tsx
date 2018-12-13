import * as React from "react";
import {Container} from "reactstrap";
import {Route} from "react-router";
import Home from "../Home/Home";

class Main extends React.Component {

    render(): React.ReactNode {
        return <Container>
            <Route exact path={"/"} component={Home}/>
        </Container>;
    }
}

export default Main;