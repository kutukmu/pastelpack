import React, { Component } from "react";
import Home from "./Components/Home";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import AddProduct from "./Components/addProducts";
import EditProducts from "./Components/editProducts";
import EditProduct from "./Components/editProductScreen";
import ProductsPage from "./Components/ProductsPage";
import ProductDetails from "./Components/ProductDetail";
import CartScreen from "./Components/cartScreen";
import Shipping from "./Components/shipping";
import Payment from "./Components/payment";
import PlaceOrder from "./Components/placeorder";
import orderDetails from "./Components/orderdetails";
import Profile from "./Components/profile";
import Editorders from "./Components/editorders";
import Contact from "./Components/Contact";
import Sidebar from "./Components/sideBar";
import returnPolicy from "./Components/returnPolicy";
import Faq from "./Components/faq";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        {this.props.sidebar.isOpen && <Sidebar />}
        <Switch exact>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/signin" component={SignIn} />
          {this.props.user.isAdmin && (
            <Route exact path="/product" component={AddProduct} />
          )}
          {this.props.user.isAdmin && (
            <Route exact path="/editproducts" component={EditProducts} />
          )}
          {this.props.user.isAdmin && (
            <Route exact path="/editItem/:id" component={EditProduct} />
          )}
          <Route exact path="/products" component={ProductsPage} />
          <Route exact path="/item/:id" component={ProductDetails} />

          <Route exact path="/cart" component={CartScreen} />

          {this.props.user.name && (
            <Route exact path="/shipping" component={Shipping} />
          )}
          {this.props.user.name && (
            <Route exact path="/payment" component={Payment} />
          )}
          {this.props.user.name && (
            <Route exact path="/placeorder" component={PlaceOrder} />
          )}
          {this.props.user.name && (
            <Route exact path="/order/:id" component={orderDetails} />
          )}
          {this.props.user.name && (
            <Route exact path="/profile/:id" component={Profile} />
          )}
          {this.props.user.isAdmin && (
            <Route exact path="/editorders" component={Editorders} />
          )}
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/returnpolicy" component={returnPolicy} />
          <Route exact path="/faq" component={Faq} />
        </Switch>
      </div>
    );
  }
}

const getState = (state) => {
  return {
    user: state.signInUser,
    sidebar: state.sidebar,
  };
};

export default connect(getState, {})(App);
