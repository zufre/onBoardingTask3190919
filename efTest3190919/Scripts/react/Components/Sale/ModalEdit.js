import React from 'react';
import { Button, Form, Header, Modal, Icon, Dropdown } from 'semantic-ui-react';
import axios from 'axios';
class ModalEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage:"",
            idSelected: this.props.id,
            dateSoldSelected: this.props.date,
            storeSelected: this.props.store,
            customerSelected: this.props.customer,
            productSelected: this.props.product,
            modalOpen: false,
            customers: this.props.customers,
            products: this.props.products,
            stores: this.props.stores


        }
        this.triggerClickHandler = this.triggerClickHandler.bind(this);
        this.cancelClickHandler = this.cancelClickHandler.bind(this);
        this.editClickHandler = this.editClickHandler.bind(this);
        this.handleDateSoldChange = this.handleDateSoldChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleProductChange = this.handleProductChange.bind(this);
        this.handleStoreChange = this.handleStoreChange.bind(this);

    }
    cancelClickHandler() {

        this.setState(() => {
            return {
                errorMessage:"",
                dateSoldSelected: "",
                customerSelected: null,
                productSelected: null,
                storeSelected: null,
                modalOpen: false,
                idSelected: null,
                customers: [],
                products: [],
                stores: []
            };

        });
        this.props.fetch();
    }
    handleDateSoldChange(e) {
        this.setState({ dateSoldSelected: e.target.value });

    }
    triggerClickHandler() {
        this.setState(() => {
            return { modalOpen: true };
        });
    }
    editClickHandler(e) {
        e.preventDefault;
        if (!(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/g).test(this.state.dateSoldSelected)) {
            this.setState({ errorMessage: "Please insert a valid Date DD/MM/YYY" });
            return;
        }
        let data = {
            Id: this.state.idSelected,
            DateSold: this.state.dateSoldSelected,
            CustomerId: this.state.customerSelected,
            ProductId: this.state.productSelected,
            StoreId: this.state.storeSelected
        }
        axios.post('/Sales/Edit/', data)

            .then(() => console.log(`put request success`))
            .then(() => this.props.fetch())
            
            .then(() => this.setState({ errorMessage:"",modalOpen: false }))
            .catch(e => console.log(e));
    }
    handleCustomerChange(e, data) {
        e.preventDefault();
        let id = data.value;
        this.setState(() => {
            return { customerSelected: id };
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
            <div>
                <Modal style={{ position: 'relative', top: '50px', height: '600px' }}
                    open={this.state.modalOpen}
                    trigger={<Button onClick={this.triggerClickHandler} color='yellow' icon ><Icon name='external alternate' /> EDIT</ Button>}
                    className="ui modal"
                    size='mini' >
                    <Header>Edit Sale</Header>
                    <Modal.Content>
                        <Form className="ui form">
                            <div className="field">
                                <div style={{ color: 'red' }}>{this.state.errorMessage}</div>
                                <label htmlFor="dateSold">Date sold</label>
                                <input size='fluid'
                                    type="text"
                                    id="dateSold"
                                    name="dateSold"

                                    value={this.state.dateSoldSelected}
                                    onChange={this.handleDateSoldChange} />
                            </div>
                            <div className="field">
                                <label htmlFor="customer">Customer</label>
                                <Dropdown id="customer"
                                    value={this.state.customerSelected}
                                    onChange={this.handleCustomerChange}
                                    fluid
                                    selection
                                    placeholder='Customer'
                                    options={customerOptions} />
                            </div>
                            <div className="field">
                                <label htmlFor="product">Product</label>
                                <Dropdown id="product"
                                    value={this.state.productSelected}
                                    onChange={this.handleProductChange}
                                    fluid
                                    selection
                                    placeholder='Product'
                                    options={productOptions} />
                            </div>
                            <div className="field">
                                <label htmlFor="store">Store</label>
                                <Dropdown id="store"
                                    value={this.state.storeSelected}
                                    onChange={this.handleStoreChange}
                                    fluid
                                    selection
                                    placeholder='Store'
                                    options={storeOptions} />
                            </div>
                            <Modal.Actions style={{ float: 'right' }} >
                                <Button color='black' content="cancel" onClick={this.cancelClickHandler} />
                                <Button onClick={this.editClickHandler} positive type="submit" icon >edit  <Icon name='checkmark' /> </Button>
                            </ Modal.Actions>
                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}
export default ModalEdit;