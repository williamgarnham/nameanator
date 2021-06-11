import './App.css';
import Card from './components/Card/Card'
import List from './components/List/List'
import {useState} from 'react'


function App() {
  const [name, setName] = useState('')
  const [countryID, setCountryID] = useState('')
  const [age, setAge] = useState('')
  const [data, setData] = useState([])
  const [gender, setGender] = useState('')

  const ageStyle = {
    color: "lightblue",
    background: "green",
    borderRadius: "5px",
    width: "100px",
    left: "50%",
    right: "50%",
    transform: "translate(150%, 50%)",
  }

  const getData = async (name) =>{

    try{

      //Get name/location data
      let response = await fetch(`https://api.nationalize.io?name=${name}`)
        .then(response => response.json())

      setData([])
      response.country.map((item)=>{
        return setData(data=>[...data,item.country_id])
      })

      //Get age data
      if(countryID.length > 0){
        let responseAge = await fetch(`https://api.agify.io?name=${name}&country_id=${countryID}`)
          .then(responseAge => responseAge.json())
        console.log(responseAge)
        setAge(responseAge.age)
    }else{
      let responseAge = await fetch(`https://api.agify.io?name=${name}`)
        .then(responseAge => responseAge.json())
      console.log(responseAge)
      setAge(responseAge.age)
    }

    //Get gender data
    let responseGender = await fetch(`https://api.genderize.io?name=${name}`)
      .then(responseGender => responseGender.json())
    setGender(responseGender.gender)

    }catch(err){
      console.log(err.message)
    }

  }


  return (
    <div className="App">

      <Card>
        <input
          placeholder="Enter Name"
          onChange={e => setName(e.target.value)}
          onKeyDown={e => {
            if(e.key === 'Enter'){
              getData(name)
            }
          }}
        />
        <input
          placeholder="Enter country ID"
          onChange={e => setCountryID(e.target.value)}
          onKeyDown={e => {
            if(e.key === 'Enter'){
              getData(name)
            }
          }}
        />
        <button onClick={() => getData(name)}>Submit</button>
        <List items={data}/>
        <p style={ageStyle}>Age: {age} </p>
        <p style={ageStyle}>Gender: {gender} </p>
      </Card>


    </div>
  );
}

export default App;
