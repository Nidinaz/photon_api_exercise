import "./App.css";
import { useState } from "react";
import axios from "axios";

const App = () => {

  const cityList = ["Amsterdam", "Berlin", "Madrid", "London", "Brussel"];

  const [city, setCity] = useState("Amsterdam");


  const mappedButtons = cityList.map((citylisted) => {
    return (
      <div>
      <button
        onClick={() => {
          return setCity(<CityApi key={1} city={citylisted}></CityApi>);
        }}
      >
        {citylisted}
      </button>
          </div>
    );
  });
  console.log(mappedButtons);
  return <div>{mappedButtons}</div>
};

const CityApi = (props) => {
  const [selectedCity, setSelectedCity] = useState();

  if (!selectedCity) {
    axios
    .get("photon.komoot.io/api/?q=" + props.city)
    .then((response) => {
      // const photonAPI = features.map(())
      console.log(response)
      setSelectedCity()
    })
    .catch((e) => {
      console.log("Error: " + e);
   
    })

  }

};

export default App;
