import "./App.css";
import { useState } from "react";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState({
    query: "",
    osmTag: "",
    ui: null
  });

  const onCityChanged = (field) => {
    setUser({
      query: field.target.value,
      osmTag: "",
      ui: null
    });
  };

  const onOsmTagChanged = (field) => {
    setUser({
      query: user.query,
      osmTag: field.target.value,
      ui: null
    });
  };

  const cityList = ["Amsterdam", "Berlin", "Madrid", "London", "Brussel"];

  const mappedButtons = cityList.map((citylisted) => {
    return (
      <div key={Math.random()}>
        <button
          onClick={() => {
            setUser(
              <CityApi
                key={Math.random()}
                osmTag={"tourism"}
                city={citylisted}
              ></CityApi>
            );
          }}
        >
          {citylisted}
        </button>
      </div>
    );
  });

  // console.log(mappedButtons);
  return (
    <div>
      <div>{mappedButtons}</div>

      <div className="search-form">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            console.log("Submitting! " + JSON.stringify(user));

            setUser({
              query: user.query,
              osmTag: user.osmTag,
              ui: <CityApi
                key={Math.random()}
                osmTag={user.osmTag}
                city={user.query}
              ></CityApi>}
            );
            
          }}
        >
          <input
            type="text"
            id="text"
            name="text"
            placeholder="capitol"
            value={user.text}
            onChange={onCityChanged}
          ></input>
          <input
            type="text"
            id="osm"
            placeholder="osm"
            value={user.osmTag}
            onChange={onOsmTagChanged}
          ></input>
          <button>Submit</button>
        </form>
        <div>{user.ui}</div>
      </div>
    </div>
  );
};

const CityApi = (props) => {
  const [selectedCity, setSelectedCity] = useState();

  if (!selectedCity) {
    let baseApi = "https://photon.komoot.io/api/?q=" + props.city;
    if (props.osmTag) {
      baseApi = baseApi + "&osm_tag=" + props.osmTag;
    }

    console.log("Base API: " + baseApi);
    axios
      .get(baseApi)
      .then((response) => {
        const { data } = response;

        const photonAPI = data.features.map((feature) => {
          return (
            <div key={Math.random()}>
              <div>{feature.properties.name}</div>
            </div>
          );
        });
        // console.log(response);
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
