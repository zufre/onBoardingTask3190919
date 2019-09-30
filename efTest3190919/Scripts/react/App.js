import React from 'react';
import ReactDOM from 'react-dom';
import CustomerList from './Components/Customer/CustomerList';
import SalesList from './Components/Sale/SalesList';
import ProductList from './Components/Product/ProductList';
import StoreList from './Components/Store/StoreList';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';


if (window.location.pathname === '/') {
    ReactDOM.render(
        <SalesList />,
        document.getElementById('sale')
    );
}
if (window.location.pathname === '/Sales') {
    ReactDOM.render(
        <SalesList />,
        document.getElementById('sale')
    );
}
else if (window.location.pathname === '/Products') {
    ReactDOM.render(
        <ProductList />,
        document.getElementById('product')
    );
}
else if (window.location.pathname === '/Customers') {
    ReactDOM.render(
        <CustomerList />,
        document.getElementById('customer')
    );
}
else if (window.location.pathname === '/Stores') {
    ReactDOM.render(
        <StoreList />,
        document.getElementById('store')
    );  
}
/*class App extends React.Component {

    render() {
        return (
           
            <Router>
                <Link to="/react/customers">Customers </Link>
                <Link to="/react/products">Products </Link>
                <Link to="/react/stores">Stores </Link>
                <Link to="/react/sales">Sales</Link>
                <Route path="/react/customers" component={CustomerList} />
                <Route path="/react/products" component={ProductList} />
                <Route path="/react/stores" component={StoreList} />
                <Route path="/react/sales" component={SalesList} />
             </Router>
         
        )
    }
}
export default App;

ReactDOM.render(
    <App />,
    document.getElementById('root')
);*/