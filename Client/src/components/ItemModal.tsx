import React, { useState } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader
} from 'reactstrap';

const ItemModal = ({ isAuthenticated, addItem }: any) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');

  const handleToggle = () => setModal(!modal);

  const handleChangeName = (e: any) => setName(e.target.value);

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    const newItem = {
      name
    };

    // Add item via addItem action
    // addItem(newItem);
    // Close modal
    handleToggle();
  };

  return (
    <div>
      {isAuthenticated ? (
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={handleToggle}
        >
          Add Item
        </Button>
      ) : (
        <h4 className="mb-3 ml-4">Please log in to manage items</h4>
      )}

      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={handleChangeName}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};


export default ItemModal
