import React from 'react';
import ReactDOM from 'react-dom';
import ModalCreate from './ModalCreate';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';
import { Table } from 'semantic-ui-react';
import axios from 'axios';


class CustomerList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
        };
        this.fetchData = this.fetchData.bind(this);
        
    }
    componentDidMount() {
        this.fetchData();
    
    }
  
    fetchData() {
        axios.get('/Customers/GetCustomers')
            .then(res => {
                const customers = res.data;
                this.setState({ customers });
                console.log('get request success')
            })

            .catch((e) => console.log(e))
    }
    render() {
       
        return (
            <div>
                <ModalCreate fetch={this.fetchData}/> 
                <Table className="ui compact selectable table"celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell >Name</Table.HeaderCell>
                            <Table.HeaderCell >Address</Table.HeaderCell>
                            <Table.HeaderCell >Action</Table.HeaderCell>
                            <Table.HeaderCell >Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.customers.map(customer =>
                            <Table.Row key={customer.Id}>
                                <Table.Cell>{customer.Name}</Table.Cell>
                                <Table.Cell>{customer.Address}</Table.Cell>
                                <Table.Cell><ModalEdit fetch={this.fetchData} idToEdit={customer.Id} name={customer.Name} address={customer.Address} /></Table.Cell>
                                <Table.Cell><ModalDelete fetch={this.fetchData} idToDelete={customer.Id} /></Table.Cell>
                        </Table.Row>
                        )} 
                    </Table.Body>
                </Table>
          
            </div>
        )
    }

}

export default CustomerList;


/*ReactDOM.render(
    <CustomerList />,
    document.getElementById('customer')
);*/