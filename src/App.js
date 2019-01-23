import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignupPage';
import SettingsPage from './Pages/SettingsPage';
import PrimarySearchAppBar from './Pages/HomePage';
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

import './App.css';
const theme = createMuiTheme({ typography: { useNextVariants: true } });
class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <div>
            {/* Routes for app using react router v4 
              `path` is the url parameters
              component points to a react component
              Example https://reacttraining.com/react-router/web/example/basic
            */}
            <Route exact path="/" component={LoginPage} /> {/*Located at src/Pages/LoginPage.js */}
            <Route path="/home" component={PrimarySearchAppBar} /> {/* src/Pages/HomePage.js */}
            <Route path="/settings" component={SettingsPage} /> {/* src/Pages/SettingsPage.js */}
            <Route path="/signup" component={SignUpPage} /> {/* src/Pages/SignupPage.js */}
          </div>
        </Router>
      </ThemeProvider>

    );
  }
}

export default App;
