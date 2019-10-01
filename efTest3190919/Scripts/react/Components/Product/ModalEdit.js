import React from 'react';
import { Button, Form, Header, Modal, Icon } from 'semantic-ui-react';
import axios from 'axios';
class ModalEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessagePrice: "",
            errorMessage: "",
            modalOpen: false, 
            Id: this.props.idToEdit,
            Name: this.props.name,
            Price: this.props.price
        };
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.cancelClickHandler = this.cancelClickHandler.bind(this);
        this.triggerClickHandler = this.triggerClickHandler.bind(this);
        this.editClickHandler = this.editClickHandler.bind(this)
    }
    handleNameChange(e) {
        this.setState({ Name: e.target.value });
    }
    handleAddressChange(e) {
        this.setState({ Price: e.target.value });
    }
    cancelClickHandler() {
        this.setState(() => {
            return { errorMessagePrice: "", errorMessage: "", modalOpen: false };
        });
    }
    triggerClickHandler() {
        this.setState(() => {
            return { modalOpen: true };
        });
    }
    editClickHandler(e) {
        
        e.preventDefault;
        if ((this.state.Price == null || this.state.Name == "")) {
            this.setState({
                errorMessage: "All fields must be filled out",
                errorMessagePrice: ""
            });
            return;
        }
        if (!(/^[A-Za-z\s]+$/g).test(this.state.Name) && !(/\d+\.*\d{2}$/g).test((this.state.Price).toString())) {
            this.setState({
                errorMessage: "Name field can only contain Letters",
                errorMessagePrice: "Price field contains invalid characters"
            });
            return;
        }
        if ((/^[A-Za-z\s]+$/g).test(this.state.Name) && !(/\d+\.*\d{2}$/g).test((this.state.Price).toString())) {
            this.setState({
                errorMessage: "",
                errorMessagePrice: "Price field contains invalid characters"
            });
            return;
        }
        if (!(/^[A-Za-z\s]+$/g).test(this.state.Name) && (/\d+\.*\d{2}$/g).test((this.state.Price).toString())) {
            this.setState({
                errorMessage: "Name field can only contain Letters",
                errorMessagePrice: ""
            })
            return;
        }
        let data = { Id: this.state.Id, Name: this.state.Name, Price: this.state.Price }
        axios.post('/Products/Edit/', data)
            .then(() => console.log(`put request success`))
            .then(() => this.props.fetch())
            .then(() => this.setState({ errorMessagePrice: "", errorMessage: "",  modalOpen: false }))
            .catch(e => console.log(e));   
    }
    render() {
        return (
           <div>
                <Modal style={{ position: 'relative', top: '100px', height: '300px' }}
                    open={this.state.modalOpen}
                    trigger={<Button
                        onClick={this.triggerClickHandler}
                        color='yellow' icon >
                        <Icon name='external alternate' /> EDIT</ Button>}
                    className="ui modal" size='tiny' >
                <Header>Edit Product</Header>
                <Modal.Content>
                        <Form className="ui form">
                        <div style={{ color: 'red' }}>{this.state.errorMessage}</div>
                        <div className="field">
                            <label htmlFor="name">NAME</label>
                                <input type="text" id="name" name="name" value={this.state.Name} onChange={this.handleNameChange} />
                        </div>
                            <div className="field">
                            <div style={{ color: 'red' }}>{this.state.errorMessagePrice}</div>
                            <label htmlFor="price">PRICE</label>
                            <input type="text" id="price" name="price" value={this.state.Price} onChange={this.handleAddressChange} />
                        </div>
                            <Modal.Actions style={{ float: 'right' }} >
                                <Button color='black' content="cancel" onClick={this.cancelClickHandler}/>
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