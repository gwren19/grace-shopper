import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Sticky } from 'semantic-ui-react';
import axios from 'axios';

import {
    Categories,
    Hero,
    Merchandise,
    NavBar,
    ProductPage,
    UserProfile,
    Wishlist,
    AboutUsPage,
    Orders,
    Stories,
    ContactUs,
} from './components';

const App = () => {
    const [wishlist, setWishlist] = useState([]);
    const [merchandise, setMerchandise] = useState([]);
    const [results, setResults] = useState([]);
    const [user, setUser] = useState({});
    const [login, setLogin] = useState(false);
    const [searchTerm, setSearchTerm] = useState({ value: '', category: '' });
    const [editMode, setEditMode] = useState(false);
    const [item, setItem] = useState({});
    const [cart, setCart] = useState([]);
    const [userPayments, setUserPayments] = useState([]);
    const [order, setOrder] = useState();
    const [paymentModalShow, setPaymentModalShow] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && token.length) {
            axios.post('/api/users/token', { token })
                .then(res => {
                    if (res.data.user_id) {
                        setUser(res.data);
                        setLogin(true);
                    }
                })
                .catch(error => console.error(error));
        }
    }, []);

    useEffect(() => {
        if (!cart || !cart.length) {

            const savedCart = JSON.parse(localStorage.getItem('activeCart'));
            console.log(savedCart);
            if (savedCart) {
                console.log('After parsing', savedCart);
                setCart(savedCart);
            }
        }
    }, [])

    return (
        <Router>
            <Sticky>
                <NavBar
                    setSearchTerm={setSearchTerm}
                    setLogin={setLogin}
                    login={login}
                    user={user}
                    setUser={setUser}
                    cart={cart} 
                    setEditMode={setEditMode} />
            </Sticky>
            <Switch>
                <Route path='/contact'>
                    <ContactUs />
                </Route>
                <Route path='/about'>
                    <AboutUsPage />
                </Route>
                <Route path='/categories'>
                    <Categories
                        setMerchandise={setMerchandise}
                        merchandise={merchandise} />
                </Route>
                <Route path='/stories'>
                    <Stories />
                </Route>
                <Route path='/about'>
                    <AboutUsPage />
                </Route>
                <Route path='/userprofile'>
                    <UserProfile
                        userPayments={userPayments}
                        setUserPayments={setUserPayments}
                        user={user}
                        setUser={setUser}
                        editMode={editMode}
                        setEditMode={setEditMode} 
                        paymentModalShow={paymentModalShow}
                        setPaymentModalShow={setPaymentModalShow} />
                </Route>
                <Route path="/productpage/:id">
                    <ProductPage
                        item={item}
                        setItem={setItem}
                        setCart={setCart}
                        cart={cart}
                        user={user} 
                        order={order}
                        setOrder={setOrder}
                        wishlist={wishlist}
                        setWishlist={setWishlist}/>
                </Route>
                <Route path='/wishlist'>
                    <Wishlist
                        wishlist={wishlist}
                        setWishlist={setWishlist}
                        user={user} />
                </Route>
                <Route path='/orders'>
                    <Orders 
                        cart={cart}
                        setCart={setCart}
                        user={user}
                        userPayments={userPayments}
                        order={order}
                        setOrder={setOrder} />
                </Route>
                <Route path='/'>
                    <Hero
                        results={results}
                        setResults={setResults} />
                    <Merchandise
                        merchandise={merchandise}
                        setMerchandise={setMerchandise}
                        searchTerm={searchTerm} />
                </Route>
                <Redirect from='/home' to='/' />
            </Switch>
        </Router>
    )
}

ReactDOM.render(<App />, document.getElementById("app"));