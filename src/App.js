import "./App.css";
import { useState } from "react";
import axios from "axios";

const App = () => {

  const [user, setUser] = useState({
    text: '',
  })

  const onTextChange = (field) => {
    setUser({
      text: field.target.value,
    })
  }

  const cityList = ["Amsterdam", "Berlin", "Madrid", "London", "Brussel"];

  const [city, setCity] = useState();

  const mappedButtons = cityList.map((citylisted) => {
    return (
      <div>
        <button
          onClick={() => {
            return setCity(
              <CityApi key={citylisted} city={citylisted}></CityApi>
            );
          }}
        >
          {citylisted}
        </button>
      </div>
    );
  });

  console.log(mappedButtons);
  return (
    <div>
      <div>{mappedButtons}</div>
      <div>{city}</div>
      <div className = 'search-form'>
        <div>
          <input type ='text' id='text' name="text" placeholder='capitol' value={user.text} onChange={onTextChange}></input>
        </div>
      </div>
    </div>
  );
};

const CityApi = (props) => {
  const [selectedCity, setSelectedCity] = useState();

  if (!selectedCity) {
    axios
      .get("https://photon.komoot.io/api/?q=" + props.city)
      .then((response) => {
        const { data } = response;

        const photonAPI = data.features.map((feature) => {
          return (
            <div>
              <div>{feature.properties.country}</div>
            </div>
          );
        });
        console.log(response);
        setSelectedCity(
          <div>
            <div>{photonAPI}</div>
          </div>
        );
      })
      .catch((e) => {
        console.log("Error: " + e);
      });
  }

  return <div>{selectedCity}</div>;
};

export default App;
