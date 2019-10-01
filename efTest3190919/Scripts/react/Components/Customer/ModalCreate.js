import React from 'react';
import { Button, Form, Header, Modal, Icon } from 'semantic-ui-react';
import axios from 'axios';

class ModalCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                errorMessage :"",
                modalOpen: false, 
                Name: '',
                Address: ''     
            }; 
        this.triggerClickHandler = this.triggerClickHandler.bind(this);
        this.cancelClickHandler = this.cancelClickHandler.bind(this);
        this.createClickHandler = this.createClickHandler.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    triggerClickHandler()  {
        this.setState(() => {
            return { modalOpen: true };     
        });
    }
    cancelClickHandler(e) {
        this.setState(() => {
            return { errorMessage: "", Name: "", Address: "" , modalOpen: false };
            
        });
    }
    handleNameChange(e) {
        this.setState({Name: e.target.value });
    }
    handleAddressChange(e) {
        this.setState({ Address: e.target.value });
    }
    createClickHandler(e) {
        e.preventDefault;
        if ((this.state.Name == "" || this.state.Address == "")) {
            this.setState({ errorMessage: "All fields must be filled out" });
            return;
        }
        if (!(/^[A-Za-z\s]+$/g).test(this.state.Name)) {
            this.setState({ errorMessage: "Name field can only contain Letters" })
            return;
        }

        let data = { "Name": this.state.Name, "Address": this.state.Address }
        axios.post('/Customers/Create', data)
            .then(() => console.log(`post request success`))
            .then(() => this.props.fetch())
            .then(() => this.setState({ Name: "", Address: "" }))
            .then(() => this.setState({ errorMessage: "", modalOpen: false }))
            .catch(e => console.log(e))
    }
    render() {
        return (
            <Modal style={{position:'relative', top: '100px', height: '300px'}}   open={this.state.modalOpen} className="ui modal" size='tiny' trigger={<Button onClick={this.triggerClickHandler} primary>New Customer</Button>}>
            <Header>Create Customer</Header>
                <Modal.Content>
                    <Form className="ui form">
                        <div style={{ color: 'red' }}>{this.state.errorMessage}</div>
                        <div className="field">
                            <label htmlFor="name">NAME</label>
                            <input size='fluid' type="text" id="name" name="name" value={this.state.Name} onChange={this.handleNameChange}/>
                        </div>
                        <div className="field">
                            <label htmlFor="address">ADDRESS</label>
                            <input size='fluid' type="text" id="address" name="address" value={this.state.Address} onChange={this.handleAddressChange} />
                        </div>
                        <Modal.Actions style={{ float: 'right' }} >
                            <Button  color='black' content="cancel" onClick={this.cancelClickHandler}  />
                            <Button onClick={this.createClickHandler} type="submit"  color='teal' icon >create  <Icon name='checkmark' /> </Button>
                        </ Modal.Actions>
                    </Form>
                </Modal.Content>    
            </Modal>
        )
    }
}

export default ModalCreate;
