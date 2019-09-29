import React from 'react';
import { Button, Header, Modal, Icon } from 'semantic-ui-react';
import axios from 'axios';

class ModalDelete extends React.Component {
   constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
        };
        
        this.cancelClickHandler = this.cancelClickHandler.bind(this);
        this.triggerClickHandler = this.triggerClickHandler.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
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
    deleteHandler() {
        let id = this.props.idToDelete;
        let data = { id: id }
        axios.post('/stores/Delete/' + id, data)
            .then(() => console.log('delete request success'))
            .then(() => this.props.fetch())
            .then(() => this.setState({ modalOpen: false }))
            .catch(e => console.log(e));
    }
    render() {


        return (
          
           <div>
                <Modal style={{ position: 'relative', top: '100px', height: '300px' }}  open={this.state.modalOpen} trigger={<Button onClick={this.triggerClickHandler} negative icon ><Icon name='trash' /> DELETE</Button>}  className="ui modal" size='tiny' >
                    <Header>Delete Stores</Header>

                    <Modal.Content>
                        <h1>Are you sure?</h1>
                        <Modal.Actions style={{ float: 'right' }} >
                            <Button  color='black' content="cancel" onClick={this.cancelClickHandler}/>
                            <Button  negative icon onClick={this.deleteHandler} >delete  <Icon name='trash' /> </Button>
                            </ Modal.Actions>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}
export default ModalDelete;