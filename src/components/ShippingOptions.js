import React, { useState, useEffect } from "react";
import { Grid, Segment, Button, Input, Dropdown, Dimmer, Loader, Image } from "semantic-ui-react";
import { ShippingEdit } from './ShippingEdit';
import { Shipping } from '../components';

const ShippingOptions = ({ user, setStep }) => {
    const [editMode, setEditMode] = useState(false);
    const [shippingInfo, setShipping] = useState({});

    useEffect(() => {
        if (user.user_id) {
            console.log('setting setShipping');
            const { firstname, lastname, userPreferences: { street, city, state, zip, shipping } } = user;

            setShipping({ firstname, lastname, street, city, state, zip, shipping });
        } else {
            console.log('guest user');
        }

    }, []);

    const handleInput = (e, data) => {
        console.log('In handle input function');
        setShipping(data);
    } 

    return (
        user
            ?
            <Grid>
                {
                    editMode ?
                        <ShippingEdit user={user} setShipping={setShipping} shippingInfo={shippingInfo}
                            setEditMode={setEditMode} /> :
                        <Shipping setStep={setStep} shippingInfo={shippingInfo} setEditMode={setEditMode} />
                }
            </Grid >
            :
            <Grid celled='internally'>
                <Grid.Column
                    className='column-one'
                    width={3}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'space-between'
                    }}
                >
                </Grid.Column>
                <Grid.Column
                    width={10}
                    style={{
                        height: '100%'
                    }}
                >
                    <Segment.Group>
                        <Segment
                            style={{
                                backgroundColor: 'olivedrab',
                            }}
                        >
                            Edit Your Profile
                            </Segment>

                        <Segment>
                            <p> First Name:</p>
                            <Input
                                name='firstname'
                                defaultValue={firstname}
                            >
                            </Input>
                        </Segment>
                        <Segment>
                            <p>Last Name:</p>
                            <Input
                                name='lastname'
                                defaultValue={lastname}
                            >
                            </Input>
                        </Segment>
                        <Segment>
                            <p>Street Address:</p>
                            <Input
                                name='street'
                                defaultValue={street}
                            >
                            </Input>
                        </Segment>
                        <Segment.Group
                            horizontal
                            style={{
                                backgroundColor: 'white'
                            }}
                        >
                            <Segment>
                                <p>City:</p>
                                <Input
                                    name='city'
                                    defaultValue={city}
                                >
                                </Input>
                            </Segment>
                            <Segment>
                                <p>State:</p>
                                <Dropdown
                                    name='state'
                                    placeholder='State'
                                    defaultValue={state}
                                    style={{
                                        border: '1px solid black',
                                        borderRadius: '5px'
                                    }}
                                    search
                                    selection
                                    options={stateOptions}
                                />
                            </Segment>
                            <Segment>
                                <p>Zip Code:</p>
                                <Input
                                    name='zip'
                                    defaultValue={zip}
                                >
                                </Input>
                            </Segment>
                        </Segment.Group>
                        <Segment>
                            <p>Preferred Shipping Method:</p>
                            <Dropdown options={shipOptions} onChange={handleSelect} />
                        </Segment>
                    </Segment.Group>
                    <Segment>
                        <Button
                            onClick={e => setEditMode(false)}
                        >
                            DONE
                            </Button>
                    </Segment>
                </Grid.Column>
                <Grid.Column width={3}>
                </Grid.Column>
            </Grid>
    )
}

export { ShippingOptions };