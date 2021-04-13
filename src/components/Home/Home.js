import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import Product from '../Product/Product';
import CircularProgress from '@material-ui/core/CircularProgress';


const spinner = () => {
    return <CircularProgress disableShrink />;
}


const Home = () => {
    const [loggedInUser,setLoggedInUser]=useContext(UserContext)
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch("https://freshvalley.herokuapp.com/posts")
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    return (
        <div id="homeArea">
            <Header></Header>
               {
                !products.length ? spinner() : <div className="container my-4">
                    <div className="row">
                        {
                            products.map(pd => <Product key={pd._id} product={pd}></Product>)

                        }

                    </div>

                </div>
               }
            
        </div>
    );
};

export default Home;