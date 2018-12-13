import * as React from 'react';
import './App.css';
import LoginWrapper from "./components/LoginWrapper/LoginWrapper";
import {Route} from "react-router-dom";
import Main from "./components/Main/Main";

class App extends React.Component {
  public render() {
    return <div>
      <Route path={"/"} component={Main}/>
      <Route path={"/login"} component={LoginWrapper}/>
      <Route path={"/register"} component={LoginWrapper}/>
    </div>;
  }
}

export default App;
