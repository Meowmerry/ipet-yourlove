import React, { Component } from "react";
import "./App.css";
// import PrivateRoutes from "./components/routes/PrivateRoutes";
// import jwtDecode from "jwt-decode";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FindJobsPage from "./pages/FindJobsPage";
import FindCarePage from "./pages/FindCarePage";
import ProfileUserPage from "./pages/ProfileUserPage";
import ServiceInfo from "./pages/ServiceInfo";
import PetGuide from "./pages/blogPage/PetGuide";
import AboutDog from "./pages/blogPage/AboutDog";
import AppWalk from "./pages/blogPage/AppWalk";
import Pet from "./pages/blogPage/Pet";
import AboutUs from "./pages/AboutUs";
import AdminPage from './pages/AdminPage'

import NavBar from './components/NavBar'
import Footer from "./components/Footer";

class App extends Component {

  render() {

    return (
      <div>
        <NavBar />
        <Switch>
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/findjobs" component={FindJobsPage} />
          <Route exact path="/findcare" component={FindCarePage} />
          <Route exact path="/profile" component={ProfileUserPage} />
          <Route exact path="/service" component={ServiceInfo} />
          <Route exact path="/pet-guide" component={PetGuide} />
          <Route exact path="/blog-dog" component={AboutDog} />
          <Route exact path='/blog-app' component={AppWalk} />
          <Route exact path='/blog-pet' component={Pet} />
          <Route exact path='/aboutus' component={AboutUs} />
          <Route exact path="/admin" component={AdminPage} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
