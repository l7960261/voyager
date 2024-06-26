import React, { Component } from "react";
import { BrowserRouter, Route, Switch} from "react-router-dom";

import ViewPage from "./components/viewPage/viewPage";
import Home from "./components/homePage/home";
import HotelInfo from "./components/hotelInfo";
import HotelList from "./components/hotelList";
import HotelOrder from "./components/hotelOrderPage/Main";
import Member from "./components/member/Member";
import Welcome from "./components/welcomePage/welcome";
import Login from "./components/Login";
import Register from "./components/Register";
import Nav from "./components/nav";
import Footer from './components/homePage/Footer'

import axios from "axios";

axios.defaults.withCredentials = true;
class App extends Component {
  //  auth=>是否在cookie中
  //  account=>後端設定資料於前端獲取
  //  message=>存放不是登入狀態
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      message: "",
      account: "",
      uid: null,
    };
  }

  componentDidMount() {
    
    axios
      .get("http://localhost:8000/login")
      .then((res) => {
        if (res.data.Status === "Success") {
          this.setState({
            auth: true,
            account: res.data.account,
            uid: res.data.uid,
          });
          console.log("uid: " + res.data.uid);
        } else {
          this.setState({
            auth: false,
            message: res.data.Error,
          });
        }
        console.log("nooooo");
      })
      .catch((error) => {
        console.error("Error fetching login data:", error);
      });
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav
            auth={this.state.auth}
            message={this.state.message}
            account={this.state.account}
          />
          <Switch>
            <Route path="/welcome" component={Welcome} />
            <Route path="/" component={Home} exact />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route
              path="/viewPage/:location?"
              render={(props) => (
                <ViewPage {...props} userId={this.state.uid} />
              )}
            />
            <Route path="/hotelList" component={HotelList} />
            <Route path="/hotelInfo/:id" component={HotelInfo} />
            <Route
              path="/hotelOrder/:hotelId/:roomId/:price"
              render={(props) => <HotelOrder {...props} userId={this.state.uid}  auth={this.state.auth}/>}
            />
            <Route
              path="/member"
              render={(props) => <Member {...props} userId={this.state.uid} />}
            />
          </Switch>
        <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
