import React from 'react';

import {Card, Checkbox, Label, Segment} from 'semantic-ui-react';

const ValuesCard = ({val, index}) => {
    // const {id, name, nickname, description, thumbnail, img} = val;
        return (
            <Card key = {index}>
                <Segment compact>      
                    <Label mini ribbon>  {val.name} </Label>
                    <Checkbox checked/>
                </Segment>
            </Card>
        ) 
} 

export default ValuesCard;
