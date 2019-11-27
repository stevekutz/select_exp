import React from 'react';

import {Card, Label, Segment} from 'semantic-ui-react';

const ValuesCard = ({val, index}) => {
    // const {id, name, nickname, description, thumbnail, img} = val;
        return (
            <Card key = {index}>
                <Segment compact>      
                    <Label mini ribbon>  {val.name} </Label>                                     
                </Segment>
            </Card>
        ) 
} 

export default ValuesCard;
