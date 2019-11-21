import React, {useEffect} from 'react';
// import logo from './logo.svg';
import Fuse from 'fuse.js';
import {useState} from 'reinspect';
import Select from 'react-select';
import {Button, Card, Container, Form, Grid, Input, Label} from 'semantic-ui-react';
import './App.css';

const options = {
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

const App = () => {
  const initial = {selectedKey: null};

  const [dropDownVal, setDropDownVal] = useState(initial, "DropDownValues")
  const [dropArr, setDropArr] = useState([], "DropArr")
  const fuse = new Fuse(avengers, options);  

  let valuesFound = fuse.search(searchVal);
  let foundVals = valuesFound.length

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
      setDropArr([...dropArr, [dropDownVal.selectedKey] ]);
      resetDropDown();
    }

  }

  const options = [
    { value: 'low', label: "Low" },
    { value: 'medium', label: "Medium" },
    { value: 'high', label: "High"}
  ];

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
  },[dropArr])

  return (
    <div style = {{border: '1px solid green'}}>
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
      {dropArr.length
        ? 
          <div>
            {dropArr.map((item, index) => (
              <Card key = {index}> {item}</Card>
            ))}         
          </div>
        : 
          <p> No dropdown data yet</p>
      }
      

    </div>
  );
}

export default App;
