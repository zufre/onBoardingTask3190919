import React from 'react';
import { Button, Form, Header, Modal, Icon, Dropdown} from 'semantic-ui-react';
import axios from 'axios';

class ModalCreate extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            dateSoldSelected: "",
            storeSelected: null,
            customerSelected: null,
            productSelected: null,
            modalOpen: false,
            customers: this.props.customers,
            products: this.props.products,
            stores: this.props.stores,
            sales: this.props.sales
        }
        this.triggerClickHandler = this.triggerClickHandler.bind(this);
        this.cancelClickHandler = this.cancelClickHandler.bind(this);
        this.createClickHandler = this.createClickHandler.bind(this);
        this.handleDateSoldChange = this.handleDateSoldChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);          
        this.handleProductChange = this.handleProductChange.bind(this);          
        this.handleStoreChange = this.handleStoreChange.bind(this);
    }
    triggerClickHandler(e) {
        this.setState(() => {
            return { modalOpen: true };
        });
    }
    handleDateSoldChange(e) {
        this.setState({ dateSoldSelected: e.target.value });
    }
    createClickHandler(e) { 
        e.preventDefault;
        let data = {
            DateSold: this.state.dateSoldSelected,
            ProductId: this.state.productSelected,
            CustomerId: this.state.customerSelected,
            StoreId: this.state.storeSelected
        }
        axios.post('/Sales/Create/', data)
            .then(() => console.log(`post request success`))
            .then(() => this.props.fetch())
            .then(() => this.setState({
                dateSoldSelected: "",
                customerSelected: null,
                productSelected: null,
                storeSelected: null
            }))
            .then(() => this.setState({  modalOpen: false }))
            .catch(e => console.log(e))
    }
    cancelClickHandler(e) {
        this.setState(() => {
            return {
                dateSoldSelected: "",
                customerSelected: null,
                productSelected: null,
                storeSelected: null,
                modalOpen: false
            };
        });
    }
    handleCustomerChange(e, data) {
        e.preventDefault();
        let id = data.value;
        this.setState(() => {
            return { customerSelected: id};
        });  
    }
    handleProductChange(e, data) {
        e.preventDefault();
        let id = data.value;
        this.setState(() => {
            return { productSelected: id };
        });
    }
    handleStoreChange(e, data) {
        e.preventDefault();
        let id = data.value;
        this.setState(() => {
            return { storeSelected: id };
        });
    }
    render() {
        
        const customerOptions = this.props.customers.map(customer => ({
            key: customer.Id,
            text: customer.Name,
            value: customer.Id,
        }))
        const productOptions = this.props.products.map(product => ({
            key: product.Id,
            text: product.Name,
            value: product.Id,
        }))
        const storeOptions = this.props.stores.map(store => ({
            key: store.Id,
            text: store.Name,
            value: store.Id,
        }))
        return (
            <Modal style={{ position: 'relative', top: '50px', height: '600px' }}
                open={this.state.modalOpen}
                className="ui modal"
                size='tiny'
                trigger={<Button onClick={this.triggerClickHandler}
                    primary>New Sale</Button>}>
                <Header>Create Customer</Header>
                <Modal.Content>
                    <Form className="ui form">
                        <div className="field">
                            <label htmlFor="dateSold">Date sold</label>
                            <input fluid
                                type="date"
                                id="dateSold"
                                name="dateSold"
                                value={this.state.DateSold}
                                onChange={this.handleDateSoldChange} />
                        </div>
                       <div className="field">
                            <label htmlFor="customer">Customer</label>
                            <Dropdown id="customer"
                                onChange={this.handleCustomerChange}
                                fluid
                                selection
                                placeholder='Customer'
                                options={customerOptions} />
                        </div>
                        <div className="field">
                            <label htmlFor="product">Product</label>
                            <Dropdown id="product"
                                onChange={this.handleProductChange}
                                fluid
                                selection
                                placeholder='Product'
                                options={productOptions} />
                        </div>
                        <div className="field">
                            <label htmlFor="store">Store</label>
                            <Dropdown id="store"
                                onChange={this.handleStoreChange}
                                fluid
                                selection
                                placeholder='Store'
                                options={storeOptions} />
                        </div>
                        <Modal.Actions style={{ float: 'right' }} >
                            <Button color='black' content="cancel" onClick={this.cancelClickHandler} />
                            <Button onClick={this.createClickHandler}  type="submit" color='teal' icon >create  <Icon name='checkmark' /> </Button>
                        </ Modal.Actions>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }

}
export default ModalCreate;
