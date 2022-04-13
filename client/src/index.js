import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import "./scss/style.scss";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import Shop from "./Pages/Shop";
import Item from "./Pages/Item";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Success from "./Pages/Success";
import Cancel from "./Pages/Cancel";
import Information from "./Pages/Information";
import Shipping from "./Pages/Shipping";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY);

ReactDOM.render( <Provider store={store}>
    <BrowserRouter>
            <Elements stripe={stripePromise}>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="shop" element={<Shop />} />
                    <Route path="item" element={<Item />} />
                    <Route path="item/:id" element={<Item />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="cart/:id?" element={<Cart />} />
                    <Route path="checkout" element={<Checkout />} />
                    <Route path="information" element={<Information />} />
                    <Route path="shipping" element={<Shipping />} />
                    <Route path="success" element={<Success />} />
                    <Route path="cancel" element={<Cancel />} />
                </Routes>
            </Elements>
    </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);