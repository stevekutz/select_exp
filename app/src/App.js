import React, {useEffect} from 'react';
// import logo from './logo.svg';
import Fuse from 'fuse.js';
import {useState} from 'reinspect';
import Select from 'react-select';
import {Button, Card, Container, Form, Grid, Input, Label, Radio, FormField} from 'semantic-ui-react';
import { Chip } from 'react-rainbow-components';
import './App.css';
import rawstates from './states.json'

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

let states = []

rawstates.forEach(item => {
  states.push(
    {
      value: item.name,
      label: item.abbreviation  
    }
  )
});

console.log(states);


const mlh = [
  { value: 'low', label: "Low" },
  { value: 'medium', label: "Medium" },
  { value: 'high', label: "High"}
];

let options = mlh;

const App = () => {
    const initial = {selectedKey: null};
    const [checked, setChecked] = useState(true, "RadioSelected");
    const [options, setOptions] = useState(mlh, "Options Array") 

    const [radioChosen, setRadioChosen] = useState( 'mlh', "RadioChoice")

    const [dropDownVal, setDropDownVal] = useState(initial, "DropDownValues")
    const [dropArr, setDropArr] = useState([], "DropArr")

    const fuse = new Fuse(dropArr, fuseOptions);  
    const [searchVal, searchValues] = useState('');
    let valuesFound = fuse.search(searchVal);
    // let foundVals = valuesFound.length

    const updateDropDown = value => {
        setDropDownVal({...dropDownVal, selectedKey: value});  
    }

    const resetDropDown = () => {
        setDropDownVal(initial)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(dropDownVal.selectedKey !== null) {
        console.log('dropDownVal is ', dropDownVal.selectedKey);
        console.log(' dropDownVal ', dropDownVal);
        setDropArr([...dropArr, {name: dropDownVal.selectedKey} ]);
        resetDropDown();
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

  let valsFound = searchVal ? fuse.search(searchVal) : dropArr;
  let foundLength = dropArr.length;

  // const options = [
  //   { value: 'low', label: "Low" },
  //   { value: 'medium', label: "Medium" },
  //   { value: 'high', label: "High"}
  // ];

  // const options = states;

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

    useEffect(()=>{
        console.log('dropArr is ', dropArr);
    },[dropArr, radioChosen])

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

            <FormField>
                <Radio
                    label = "Medium - Low - High"
                    name = "radioChoice"
                    value = 'mlh'
                    checked = {radioChosen === 'mlh'}
                    // onClick = { () => setChecked(!checked)}
                    onChange = {handleRadio}
                />
            </FormField>
            <FormField>
                <Radio
                    label = "U.S. States"
                    name = "radioChoice"
                    value = 'states'
                    checked = {radioChosen === 'states'}
                    // onClick = { () => setChecked(!checked)}
                    onChange = {handleRadio}
                />
            </FormField>        
        </Form>

        <form style = {{width: '20%'}}>
            <Select 
                styles = {customStyles}
                name = "myDropDown"
                value = {options.filter(({value}) => value === dropDownVal.selectedKey)}
                getOptionLabel={({ label }) => label}
                getOptionValue={({ value }) => value}
                onChange={({ value }) => updateDropDown(value)}
                options={options}
            />
        
            <Button value = "Reset dropdown" onClick = {resetDropDown}> Reset </Button>
            <Button type = 'select' onClick = {handleSubmit}> Submit </Button>
        </form>

        <Label style = {{margin: '3px'}}> Dropdown selections : </Label>
        { valsFound.length
            ? 
                <Card.Group centered itemsPerRow={ foundLength || 1 }>
                {valsFound.map((val, index) => (
                    <Card key = {index}>
                        <ValuesCard index = {index} val = {val}/>
                    </Card>                                            
                ))}
                </Card.Group>
            :
                null 
        }    
      

    </div>
  );
}

export default App;

