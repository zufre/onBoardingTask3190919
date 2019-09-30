import React from 'react';
import ReactDOM from 'react-dom';
import ModalCreate from './ModalCreate';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';
import {  Table } from 'semantic-ui-react';
import axios from 'axios';


class SalesList extends React.Component {
    constructor(props) {
        super(props);
        console.log(1);
        this.state = {
            customers: [],
            products: [],
            stores: [],
            sales: []

        }
        this.fetchData = this.fetchData.bind(this);
        this.transformToDate = this.transformToDate.bind(this);
       
    }
    componentDidMount() {
        this.fetchData()
        
    }
      /*  axios.get('Customers/GetCustomers/')
            .then((res) => {
                const customers = res.data;
                this.setState({ customers });
                console.log('get c request success');
                this.setState({ customers: res })
                axios.get('Stores/GetStores/')
                    .then((res) => {
                        const stores = res.data;
                        this.setState({ stores });
                        console.log('get st request success')
                        this.setState({ stores: res });
                         axios.get('Products/GetProducts')
                            .then((res) => {
                                const products = res.data;
                                this.setState({ products });
                                console.log('get p request success')
                                this.setState({ products: res });
                                axios.get('Sales/GetSales')
                                    .then((res) => {
                                        const sales = res.data;
                                        this.setState({ sales });
                                        console.log('get sa request success')


                                    })
                            })
                    })

            })        
            axios.all([
              axios.get('/Stores/GetStores'),
              axios.get('/Customers/GetCustomers'),
              axios.get('/Products/GetProducts'),
             axios.get('Sales/GetSales')
          ])
              .then(axios.spread((customers, stores, products, sales) => {
                  this.setState({ customers, stores, products, sales })
                      .then(() => console.log('get req success'))
                  .catch((e)=> console.log(e))
              }));*/
      
        
   
              
     
    fetchData() {

        axios.get('/Sales/GetSales')
            .then(res => {
                const sales = res.data;
                this.setState({ sales });
                console.log('get sa request success')
            })
            .catch((e) => console.log(e))
            axios.get('/Customers/GetCustomers')
                .then(res => {
                    const customers = res.data;
                    this.setState({ customers });

                }).then(() => console.log('get c request success'))
                .catch((e) => console.log(e))

            axios.get('/Products/GetProducts')
                .then(res => {
                    const products = res.data;
                    this.setState({ products });
                    console.log('get p request success')
                })
                .catch((e) => console.log(e))
            axios.get('/Stores/GetStores')
                .then(res => {
                    const stores = res.data;
                    this.setState({ stores });

                }).then(() => console.log('get st request success'))
                .catch((e) => console.log(e))

        }
  transformToDate(miliSeconds) {
    var d = new Date(parseInt(miliSeconds.toString().slice(6, 19)));
    return d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
}
    render() {
        let stateContentCheck = (this.state.customers.length != 0 &&
            this.state.sales.length != 0 &&
            this.state.products.length != 0 &&
            this.state.stores.length != 0);
        let mes;
        if (this.state.customers.length == 0 ||
            this.state.products.length == 0 ||
            this.state.stores.length == 0) {
             mes = "Before you can create a Sale Entry you need have created at least one Customer, one Product and one Store";
        }
            return (
                <div>
                    <ModalCreate customers={this.state.customers}
                        products={this.state.products}
                        stores={this.state.stores}
                        sales={this.state.sales}
                        fetch={this.fetchData} />
                    {stateContentCheck ? (
                        <Table className="ui compact selectable table" celled striped>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell >Customer</Table.HeaderCell>
                                    <Table.HeaderCell >Product</Table.HeaderCell>
                                    <Table.HeaderCell >Store</Table.HeaderCell>
                                    <Table.HeaderCell >Date</Table.HeaderCell>
                                    <Table.HeaderCell >Action</Table.HeaderCell>
                                    <Table.HeaderCell >Action</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {this.state.sales.map(sale =>
                                    <Table.Row key={sale.Id}>

                                        <Table.Cell>{this.state.customers.find(c => c.Id == sale.CustomerId).Name}</Table.Cell>
                                        <Table.Cell>{this.state.products.find(p => p.Id == sale.ProductId).Name}</Table.Cell>
                                        <Table.Cell>{this.state.stores.find(s => s.Id == sale.StoreId).Name}</Table.Cell>
                                        <Table.Cell>{this.transformToDate(sale.DateSold)}</Table.Cell>
                                        <Table.Cell>< ModalEdit fetch={this.fetchData}
                                            customers={this.state.customers}
                                            products={this.state.products}
                                            stores={this.state.stores}
                                            id={sale.Id}
                                            customer={sale.CustomerId}
                                            product={sale.ProductId}
                                            store={sale.StoreId}
                                            date={sale.DateSold} /></Table.Cell>
                                        <Table.Cell><ModalDelete fetch={this.fetchData} idToDelete={sale.Id} /></Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>) : <div style={{ color: 'red' }}>{mes}</div>}
                </div>
            )
        
    }

}

export default SalesList;

/*ReactDOM.render(
    <SalesList />,
    document.getElementById('sale')
);*/