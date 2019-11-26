import rawstates from './states.json'

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

export {states, mlh};