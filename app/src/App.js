import React, {useEffect} from 'react';
// import logo from './logo.svg';
import {useState} from 'reinspect';
import './App.css';

const App = () => {
  const initial = {selectedKey: null};

  const [dropDownVal, setDropDownVal] = useState(initial, "DropDownValues")

  const updateDropDown = value => {
    setDropDownVal({... formVal, selectedKey: value});  
  }

  resetDropDown = () => {
    setDropDownVal(initial)
  }

  const options = [
    { value: 1, label: "Low" },
    { value: 2, label: "Medium" },
    { value: 3, label: "High"}
  ];


  return (
    <div >



    </div>
  );
}

export default App;
