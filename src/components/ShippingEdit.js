import React, { useState } from "react";
import { Grid, Segment, Button, Input, Dropdown } from "semantic-ui-react";
import faker from 'faker';


const ShippingEdit = ({ user, setShipping, shippingInfo, setEditMode }) => {
    const [shipMethod, setShipMethod] = useState();

    const { firstname, lastname, street, city, state, zip, shipping } = shippingInfo;

    const shipOptions = [
        { key: 'UPS', text: 'UPS', value: 'UPS' },
        { key: 'USPS', text: 'USPS', value: 'USPS' },
        { key: 'FeDEX', text: 'FeDEX', value: 'FeDEX' }
    ]

    const handleSelect = (e, data) => {
        console.log('New shipping option chosen:', data.value);
        setShipMethod(data.value);
    }

    const handleInput = (e, data) => {
        console.log('Input changed for ', data.name);
        const { name, value } = data;
        console.log('name:', name, ' value:', value);
        setShipping({ ...shippingInfo, [name]: value })

    }

    const addressDefinitions = faker.definitions.address;
    const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
        key: addressDefinitions.state_abbr[index],
        text: state,
        value: addressDefinitions.state_abbr[index],
    }));

    const handleStateChange = (e, param) => {
        console.log('Handle State Change', param.value);
        setState(param.value);
    };

    console.log('Updated Shipping information:', shippingInfo);

    return (
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
                            onChange={handleInput}
                        >
                        </Input>
                    </Segment>
                    <Segment>
                        <p>Last Name:</p>
                        <Input
                            name='lastname'
                            onChange={handleInput}
                        >
                        </Input>
                    </Segment>
                    <Segment>
                        <p>Street Address:</p>
                        <Input
                            name='street'

                            onChange={handleInput}
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

                                onChange={handleInput}
                            >
                            </Input>
                        </Segment>
                        <Segment>
                            <p>State:</p>
                            <Dropdown
                                name='state'
                                placeholder='State'

                                style={{
                                    border: '1px solid black',
                                    borderRadius: '5px'
                                }}
                                search
                                selection
                                options={stateOptions}
                                onChange={handleInput}
                            />
                        </Segment>
                        <Segment>
                            <p>Zip Code:</p>
                            <Input
                                name='zip'

                                onChange={handleInput}
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

export { ShippingEdit };