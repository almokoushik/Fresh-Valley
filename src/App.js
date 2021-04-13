import './App.css';
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Admin from './components/Admin/Admin';
import Orders from './components/Orders/Orders';
import NotFound from './components/NotFound/NotFound';
import { createContext, useEffect, useState } from 'react';
import Deals from './components/Deals/Deals';
import Manage from './components/Admin/Manage';
import Add from './components/Admin/Add';
import Edit from './components/Admin/Edit';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PrivateRoute2 from './components/PrivateRoute/PrivateRoute';
import Checkout from './components/Checkout/Checkout';
export const UserContext=createContext()

function App() {
  const [loggedInUser,setLoggedInUser]=useState({
    name:"",
    email:""
  })
  return (
    <div className="App">
        <UserContext.Provider value={[loggedInUser,setLoggedInUser]}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>

            <Route path="/login">
              <Login></Login>
            </Route>
            <Route exact path="/admin">
              <Admin></Admin>
            </Route>
            <Route path="/admin/manageProduct">
              <Manage></Manage>
            </Route>
            <Route path="/admin/addProduct">
              <Add></Add>
            </Route>
            <Route path="/admin/editProduct">
              <Edit></Edit>
            </Route>
            <Route path="/admin">
              <Admin></Admin>
            </Route>
            
            <Route path="/deals">
              <Deals></Deals>
            </Route>

            <PrivateRoute2 path="/orders">
              <Orders></Orders>
            </PrivateRoute2>

            <PrivateRoute path="/checkout/:id">
              <Checkout></Checkout>
            </PrivateRoute>

            <Route exact path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>       
      </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
