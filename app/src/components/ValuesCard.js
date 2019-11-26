import React from 'react';

import {Card, Label} from 'semantic-ui-react';

const ValuesCard = ({val, index}) => {
    // const {id, name, nickname, description, thumbnail, img} = val;
        return (
            <Card key = {index} fluid>      
                <Card.Content key = {index}>     
                    <Label ribbon>  {val.name} </Label>                                 
                </Card.Content>
            </Card>
        ) 
} 

export default ValuesCard;
