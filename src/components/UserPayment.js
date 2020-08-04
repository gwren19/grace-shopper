import React from 'react';
import { Grid, Segment, Button } from 'semantic-ui-react'
import axios from 'axios';

const Payments = ({ user, userPayments }) => {
    const deletePaymentOption = (id) => {
        console.log('handleDelete clicked. Id:', id);
        axios.delete(`/api/payments/${id}`)
            .then(res => res.data)
            .catch(error => console.error(error));
    }
    return (

        <Grid.Column
            width={10}
            style={{
                height: '100%',
                marginBottom: '1rem'
            }}
        >
            <Segment.Group >
                {
                    userPayments.map((payment) => {
                        const expDate = new Date(payment.expiration)
                        return (
                            <Segment.Group key={payment.payment_id} style={{ marginTop: '0.5rem' }} >
                                <Segment style={{ backgroundColor: '#8076a3' }} >
                                    Card Info:
                                    <Button
                                        icon='trash alternate outline'
                                        compact={true}
                                        size='mini'
                                        floated='right'
                                        onClick={() => deletePaymentOption(payment.payment_id)}
                                    >
                                    </Button>
                                </Segment>
                                <Segment>
                                    <label>Card Type:</label>
                                    <p>{payment.cardtype}</p>
                                </Segment>
                                <Segment>
                                    <label> Full Name:</label>
                                    <p>{payment.name}</p>
                                </Segment>
                                <Segment>
                                    <label>Card Number:</label>
                                    <p>{payment.number}</p>
                                </Segment>
                                <Segment.Group
                                    horizontal
                                    style={{
                                        backgroundColor: 'white'
                                    }}
                                >
                                    <Segment>
                                        <label>CID:</label>
                                        <p>{payment.cid}</p>
                                    </Segment>
                                    <Segment>
                                        <label>Expiration:</label>
                                        <p>{`${expDate.getMonth()}/${expDate.getFullYear()}`}</p>
                                    </Segment>
                                </Segment.Group>
                                <Segment>
                                    <label>Billing Address:</label>
                                    <p>{user.userPreferences.street}</p>
                                </Segment>
                                <Segment.Group
                                    horizontal
                                    style={{
                                        backgroundColor: 'white'
                                    }}
                                >
                                    <Segment>
                                        <label>City:</label>
                                        <p>{user.userPreferences.city}</p>
                                    </Segment>
                                    <Segment>
                                        <label>State:</label>
                                        <p>{user.userPreferences.state}</p>
                                    </Segment>
                                    <Segment>
                                        <label>Zip Code:</label>
                                        <p>{user.userPreferences.zip}</p>
                                    </Segment>
                                </Segment.Group>
                            </Segment.Group>
                        )
                    })
                }
            </Segment.Group>
        </Grid.Column>
    )
}
export default Payments;