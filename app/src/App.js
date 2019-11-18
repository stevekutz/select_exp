import React, {useEffect} from 'react';
// import logo from './logo.svg';
import {useState} from 'reinspect';
import Select from 'react-select';
import './App.css';

const App = () => {
  const initial = {selectedKey: null};

  const [dropDownVal, setDropDownVal] = useState(initial, "DropDownValues")
  const [dropArr, setDropArr] = useState([], "DropArr")

  const updateDropDown = value => {
    setDropDownVal({... dropDownVal, selectedKey: value});  
  }

  const resetDropDown = () => {
    setDropDownVal(initial)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const [value, name] = e.target; 
    console.log('value is ', value);

    setDropArr([...dropArr,dropDownVal]);
  }

  const options = [
    { value: 1, label: "Low" },
    { value: 2, label: "Medium" },
    { value: 3, label: "High"}
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

      padding: 20,
    }),
    //  this makes a lable on top and removes dropdown box
    // control: () => ({
    //   // none of react-select's styles are passed to <Control />
    //   width: '200px',
    // })
  }

  return (
    <div >
      <form style = {{width: '40%'}}>
        <Select 
          styles = {customStyles}
          name = "myDropDown"
          value = {options.filter(({value}) => value === dropDownVal.selectedKey)}
          getOptionLabel={({ label }) => label}
          getOptionValue={({ value }) => value}
          onChange={({ value }) => updateDropDown(value)}
          options={options}
        />
      
        <button value = "Reset dropdown" onClick = {resetDropDown}> Reset </button>
        <button type = 'select' onClick = {handleSubmit}> Submit </button>
      </form>

      

    </div>
  );
}

export default App;
