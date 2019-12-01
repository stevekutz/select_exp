import React from 'react';

import {Card, Checkbox, Label, Segment} from 'semantic-ui-react';

const ValuesCard = ({val, index, checkedVal, handleChecked, setCheckedVal}) => {
    // const {id, name, nickname, description, thumbnail, img} = val;

    console.log('>>> checkedVal is ', checkedVal);
    console.log('>>> handleChecked is ', handleChecked)
        return (
            <Card key = {index}>
                <Segment compact>      
                    <Label ribbon>  {val.name} </Label>
                    <Checkbox 
                       checked = {checkedVal} 
                       onClick = {handleChecked(checkedVal)}
                    />
                </Segment>
            </Card>
        ) 
} 

export default ValuesCard;
