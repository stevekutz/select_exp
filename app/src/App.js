import React, {useEffect, Fragment} from 'react';
// import logo from './logo.svg';
import Fuse from 'fuse.js';
import {useState} from 'reinspect';
import Select from 'react-select';
import {Button, Card, Checkbox, Container, Content, Form, Grid, Header, Input, Label, Radio, Segment} from 'semantic-ui-react';
import { Chip } from 'react-rainbow-components';
import './App.css';

import ValuesCard from './components/ValuesCard';

//      import data arrays method 1
// import states from './data/states';
// import mlh from './data/med_low_high';

//      import data arrays method 2
import {states, mlh} from './data/array_data';

const fuseOptions = {
  shouldSort: true,
  threshold: 0.5,
  location:4,
  distance: 10,
  maxPatternLength: 12,
  minMatchCharLength: 1,
  keys: [
    "name",
  ]
};


let options = mlh;

const App = () => {
    const initial = {selectedKey: null};

    const [options, setOptions] = useState(mlh, "Options Array") 

    const [radioChosen, setRadioChosen] = useState( 'mlh', "RadioChoice")

    const [dropDownVal, setDropDownVal] = useState(initial, "DropDownValues")
    const [dropArr, setDropArr] = useState([], "DropArr")

    const fuse = new Fuse(dropArr, fuseOptions);  
    const [searchVal, searchValues] = useState('');
    let valuesFound = fuse.search(searchVal);
    // let foundVals = valuesFound.length

    const [checkedArr, toggleCheckedArr] = useState([], "ToggleCheckedArr");
    const [checkedVal, setCheckedVal] = useState(true, "CheckedVal");

    const  handleChecked = (checkedVal) => {
        console.log("handler called ");
        setCheckedVal(!checkedVal)

    }

    const updateDropDown = value => {
        setDropDownVal({...dropDownVal, selectedKey: value});  
    }

    const resetDropDown = (e) => {
        e.preventDefault();
        setDropArr([]);
        setDropDownVal(initial)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(dropDownVal.selectedKey !== null) {
        console.log('dropDownVal is ', dropDownVal.selectedKey);
        console.log(' dropDownVal ', dropDownVal);
        setDropArr([...dropArr, {name: dropDownVal.selectedKey} ]);
        setDropDownVal(initial);
        // resetDropDown(e);
        }

    }

    const handleRadio = (e, {value}) => {
        // const [name, value] = e.target;
        console.log('handleRadio value is ', value);
        setRadioChosen(value);
        switch (value) {
            case 'mlh':
                setOptions(mlh);
                break;
            case 'states':
                setOptions(states);
                break;    
        }

    }

    const handleChange = e => {
        const {name, value} = e.target
        searchValues(value);
        // setRadioChosen(value);
        console.log('handleChange value is ', value);

        console.log('searchVal is ', searchVal);
        console.log('valueFound ', valuesFound);

    }

    let valsFound = searchVal ? fuse.search(searchVal) : dropArr;
    let foundLength = dropArr.length;


    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            border: '1px solid blue',
            borderBottom: '5px dotted pink',
            color: state.isSelected ? 'red' : 'blue',
            fontWeight: state.isSelected ? 'bolder' : 'lighter',
            color: state.isFocused ? 'black' : 'darkslategray',
            fontWeight: state.isFocused ? 'bolder' : 'lighter',
            padding: '10px',
        }),
        //  this makes a lable on top and removes dropdown box
        // control: () => ({
        //   // none of react-select's styles are passed to <Control />
        //   width: '200px',
        // })
    }

    // useEffect(()=>{
    // //    console.log('dropArr is ', dropArr);
    //     console.log("checked via handler is ", checkedVal);
    // },[checkedVal])

  return (
    
    <div  style = {{ border: `1px solid seagreen`, margin: `30px`, padding: `30px`}} >

        <Card.Group centered itemsPerRow={2}>
            <Card style = {{border: '1px solid brown', width: 'auto'}} >
                <Card.Content>
                    <Label style = {{lineHeight: `1.5`}}> Hooks + Fuse </Label>
                </Card.Content>
            </Card>    

            <Card style = {{border: '1px solid brown', width: 'auto'}}  fluid >
                <Card.Content>
                    <Input type = 'text' placeholder = '...search' value = {searchVal} onChange = {handleChange}/>
                </Card.Content>                
            </Card>
        </Card.Group>

        <Form>
            <Chip 
                label = { "Current dropdown array: " + radioChosen }
            />

            <Segment compact>
                <Header color = 'blue'> Semantic UI React</Header>
                <Form.Field>
                    <Form.Radio
                        label = "Medium - Low - High"
                        name = "radioChoice"
                        value = 'mlh'
                        checked = {radioChosen === 'mlh'}
                        onChange = {handleRadio}
                    />
                </Form.Field>
                <Form.Field>
                    <Form.Radio
                        label = "U.S. States"
                        name = "radioChoice"
                        value = 'states'
                        checked = {radioChosen === 'states'}
                        onChange = {handleRadio}
                    />
                </Form.Field>            
            </Segment>    
        </Form>
                        
        <Segment compact>
        <form>
               
            
            
            <Select 
                styles = {customStyles}
                name = "myDropDown"
                value = {options.filter(({value}) => value === dropDownVal.selectedKey)}
                getOptionLabel={({ label }) => label}
                getOptionValue={({ value }) => value}
                onChange={({ value }) => updateDropDown(value)}
                options={options}
            />        
        <Segment>  
        {/*  Using Button causes refresh  */}
             <Button color = 'red'size = 'mini' onClick = {() => resetDropDown()}> Reset refreshes </Button>
        {/*  Using Button NO Refresh */}
            <Button color = 'pink' size = 'mini' onClick = {resetDropDown}> Reset </Button>
            <Button color = 'pink' size = 'mini' onClick = {(e) => resetDropDown(e)}> Reset </Button>
        {/*    <Input type = "button"  color = 'pink'  value = "Reset dropdown better" onClick = {resetDropDown} />    */}
            <Button color = 'facebook' size = 'mini' type = 'select' onClick = {handleSubmit}> Submit </Button> 
        </Segment> 

        </form>    
        </Segment> 
            
        <Label style = {{margin: '3px'}}> Dropdown selections : </Label>
        { valsFound.length
            ? 
            <Segment raised>
                <Card.Group itemsPerRow= { 5 }>
                {valsFound.map((val, index) => (                 
                        <ValuesCard 
                            key = {index} 
                            val = {val}  
                            checkedVal = {checkedVal} 
                            // handleChecked = {handleChecked} 
                            setCheckedVal = {setCheckedVal}
                        />                                                                            
                ))}
                </Card.Group>

            </Segment>
            :
                null 
        }          

    </div>
  );
}

export default App;
