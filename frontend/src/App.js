  
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from "./components/Container";
import Home from "./pages/Home/index.js";
import Header from "./components/Header";
// import NoMatch from "./pages/NoMatch";

const App = () => (
  <Container>
    <Header />
    <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route component={NoMatch} /> */}
        </Switch>
    </Router>
  </Container>
);

export default App;
