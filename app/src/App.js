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

  const options = [
    { value: 1, label: "Low" },
    { value: 2, label: "Medium" },
    { value: 3, label: "High"}
  ];


  return (
    <div >
      <form>
        <Select 
          name = "myDropDown"
          value = {options.filter(({value}) => value === dropDownVal.selectedKey)}
          getOptionLabel={({ label }) => label}
          getOptionValue={({ value }) => value}
          onChange={({ value }) => updateDropDown(value)}
          options={options}
        />
      
        <button value = "Reset dropdown" onClick = {resetDropDown}> Reset </button>
      
      </form>


    </div>
  );
}

export default App;
