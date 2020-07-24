import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'semantic-ui-react';
import axios from 'axios';

const AddPaymentModal = ({ paymentModalShow, setPaymentModalShow, user }) => {

    const [name, setName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cid, setCid] = useState('');
    const [expiration, setExpiration] = useState('');
    const [cardType, setCardType] = useState('');

    

    const handleClose = () => {
        console.log('Clicking handle close button!');
        setPaymentModalShow(false);
    }

    const handleSubmit = () => {

        axios.post('/api/payments', {
            name: name,
            number: cardNumber,
            cardType: cardType,
            cid: cid,
            expiration: expiration
        }, 
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((res) => {console.log(res)})
        .catch((error) => {console.error(error)})

    }

    return(
        <div>
        <Modal open={paymentModalShow} size='small'>
            <Modal.Header className='create-user-header'
                style={{
                    backgroundColor: 'olivedrab',
                    color: 'white',
                    borderBottom: '2px solid black'
                }}>Add Payment Option</Modal.Header>
            <Modal.Content
                style={{
                    backgroundColor: 'lightgrey'
                }}>
                <Form>
                    <Form.Field required>
                        <label>Name on Card:</label>
                        <Input
                            type='text'
                            placeholder='Name on Card'
                            style={{
                                border: '1px solid black',
                                borderRadius: '5px'
                            }}
                            onChange={event => setName(event.target.value)}
                            value={name}
                        />
                    </Form.Field>
                    <Form.Field required>
                        <label>Card Number:</label>
                        <Input
                            type='text'
                            placeholder='Card Number'
                            style={{
                                border: '1px solid black',
                                borderRadius: '5px'
                            }}
                            onChange={event => setCardNumber(event.target.value)}
                            value={cardNumber}
                        />
                    </Form.Field>
                    <Form.Field required>
                        <label>CID:</label>
                        <Input
                            type='text'
                            placeholder='CID'
                            style={{
                                border: '1px solid black',
                                borderRadius: '5px'
                            }}
                            onChange={event => setCid(event.target.value)}
                            value={cid}
                        />
                    </Form.Field>
                    <Form.Group widths='equal'>
                        <Form.Field required>
                            <label>Expiration:</label>
                            <Input
                                type='text'
                                placeholder='Expiration Date'
                                style={{
                                    border: '1px solid black',
                                    borderRadius: '5px'
                                }}
                                onChange={event => setExpiration(event.target.value)}
                                value={expiration}
                            />
                        </Form.Field>
                        <Form.Field required>
                            <label>Card Type:</label>
                            <Input
                                type='text'
                                placeholder='Card Type'
                                style={{
                                    border: '1px solid black',
                                    borderRadius: '5px'
                                }}
                                onChange={event => setCardType(event.target.value)}
                                value={cardType}
                            />
                        </Form.Field>
                    </Form.Group>
                </Form>
            </Modal.Content>
            <Modal.Actions
                style={{
                    backgroundColor: 'darkgrey',
                    color: 'white',
                    borderTop: '2px solid black'
                }}>
                <Button negative
                    style={{
                        boxShadow: '3px 3px 5px black'
                    }}
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button
                    positive
                    icon='checkmark'
                    labelPosition='right'
                    content='Submit'
                    style={{
                        backgroundColor: 'olivedrab',
                        boxShadow: '3px 3px 5px black'
                    }}
                    onClick={handleSubmit}
                />
            </Modal.Actions>
        </Modal>
    </div>
    )
}

export default AddPaymentModal;