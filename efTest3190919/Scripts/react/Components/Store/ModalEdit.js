import React from 'react';
import { Button, Form, Header, Modal, Icon } from 'semantic-ui-react';
import axios from 'axios';
class ModalEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: "",
            modalOpen: false, 
            id: this.props.idToEdit,
            Name: this.props.name,
            Address: this.props.address
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
        this.setState({ Address: e.target.value });
    }
    cancelClickHandler() {
        this.setState(() => {
            return { modalOpen: false };
        });
    }
    triggerClickHandler() {
        this.setState(() => {
            return { modalOpen: true };
        });
    }
    editClickHandler(e) {
        e.preventDefault;
        if (this.state.Name == "" || this.state.Address == "") {
            this.setState({ errorMessage: "All fields must be filled out" });
            return;
        }
        let data = { Id: this.state.id, Name: this.state.Name, Address: this.state.Address }
        axios.post('/Stores/Edit/', data)
            .then(() => console.log(`put request success`))
            .then(() => this.props.fetch())
            .then(() => this.setState({ errorMessage: "", modalOpen: false }))
            .catch(e => console.log(e));
    }
    render() {
        return (
           <div>
                <Modal style={{ position: 'relative', top: '100px', height: '300px' }} open={this.state.modalOpen} trigger={<Button onClick={this.triggerClickHandler} color='yellow' icon ><Icon name='external alternate' /> EDIT</ Button>}  className="ui modal" size='mini' >
                <Header>Edit Store</Header>
                <Modal.Content>
                        <Form className="ui form">
                        <div style={{ color: 'red' }}>{this.state.errorMessage}</div>
                        <div className="field">
                            <label htmlFor="name">NAME</label>
                                <input type="text" id="name" name="name" value={this.state.Name} onChange={this.handleNameChange} />
                        </div>
                        <div className="field">
                            <label htmlFor="address">ADDRESS</label>
                            <input type="text" id="address" name="address" value={this.state.Address} onChange={this.handleAddressChange} />
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