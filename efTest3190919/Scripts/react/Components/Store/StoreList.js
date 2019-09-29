import React from 'react';
import ModalCreate from './ModalCreate';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';
import { Table} from 'semantic-ui-react';
import axios from 'axios';


class StoreList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stores: [ ]
           
        };
        this.fetchData = this.fetchData.bind(this);
    }
    componentDidMount() {
        axios.get('/Stores/GetStores')
            .then(res => {
                const stores = res.data;
                this.setState({ stores });
                console.log('get request success')
            })
            .catch((e) => console.log(e))
    }
    fetchData() {
        axios.get('/Stores/GetStores')
            .then(res => {
                const stores = res.data;
                this.setState({ stores });
                console.log('get request success')
            })
            .catch((e) => console.log(e))
    }
    render() {
        return (
            <div>
                <ModalCreate fetch={this.fetchData} /> 
                <Table className="ui compact selectable table" celled striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell >Name</Table.HeaderCell>
                            <Table.HeaderCell >Address</Table.HeaderCell>
                            <Table.HeaderCell >Action</Table.HeaderCell>
                            <Table.HeaderCell >Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.state.stores.map(store =>
                            <Table.Row key={store.Id}>
                                <Table.Cell>{store.Name}</Table.Cell>
                                <Table.Cell>{store.Address}</Table.Cell>
                                <Table.Cell><ModalEdit fetch={this.fetchData}  idToEdit={store.Id} name={store.Name} address={store.Address} /></Table.Cell>
                                <Table.Cell><ModalDelete fetch={this.fetchData}  idToDelete={store.Id} /></Table.Cell>
                        </Table.Row>
                        )} 
                    </Table.Body>
                </Table>
          
            </div>
        )
    }

}

export default StoreList;