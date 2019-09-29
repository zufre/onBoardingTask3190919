import React from 'react';
import ModalCreate from './ModalCreate';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';
import {Table } from 'semantic-ui-react';
import axios from 'axios';



class ProductList extends React.Component {
 constructor(props) {
        super(props);
        this.state = {
             products: []
           
        };
     this.fetchData = this.fetchData.bind(this);
    }
   
    componentDidMount() {
   
      
        axios.get('/Products/GetProducts')
            .then(res => {
                const products = res.data;
                this.setState({ products });
                console.log('get request success')
            })
            .catch((e) => console.log(e))
    }
    fetchData() {
        axios.get('/Products/GetProducts')
            .then(res => {
                const products = res.data;
                this.setState({ products });
                console.log('get request success')
            })
            .catch((e) => console.log(e))
    }

    render() {
        return (
            <div>
                <ModalCreate fetch={this.fetchData} /> 
                <Table className="ui compact selectable table"celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell >Name</Table.HeaderCell>
                            <Table.HeaderCell >Price</Table.HeaderCell>
                            <Table.HeaderCell >Action</Table.HeaderCell>
                            <Table.HeaderCell >Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.products.map(product =>
                            <Table.Row key={product.Id}>
                                <Table.Cell>{product.Name}</Table.Cell>
                                <Table.Cell>{product.Price}</Table.Cell>
                                <Table.Cell><ModalEdit fetch={this.fetchData} idToEdit={product.Id} name={product.Name} price={product.Price} /></Table.Cell>
                                <Table.Cell><ModalDelete fetch={this.fetchData} idToDelete={product.Id} /></Table.Cell>
                        </Table.Row>
                        )} 
                    </Table.Body>
                </Table>
          
            </div>
        )
    }

}

export default ProductList;