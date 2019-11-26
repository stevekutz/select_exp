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

export default states;