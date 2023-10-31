import React from "react";
import axios from "axios";
import { nanoid } from "nanoid";

function App() {
  const [input, setInput] = React.useState("");
  const [data, setData] = React.useState([]);

  const renderPhoto = (name) => {
    if (input) {
      axios
        .get(
          `https://api.unsplash.com/search/photos?&query=${input}&client_id=C3EVbvYb4pKjmbB8bXRO6A7cz6doYO2No8ALJ5eCvlk`
        )
        .then((response) => {
          setData(response.data.results);
        });
    } else {
      axios
        .get(
          `https://api.unsplash.com/search/photos?&query=${name}&client_id=C3EVbvYb4pKjmbB8bXRO6A7cz6doYO2No8ALJ5eCvlk`
        )
        .then((response) => {
          setData(response.data.results);
        });
    }
  };

  React.useEffect(() => {
    renderPhoto("mountain");
  }, []);

  const displayData = data.map((value) => {
    return (
      <div key={nanoid()} className="image">
        <img src={value.urls.small} />
      </div>
    );
  });

  return (
    <div className="main-container">
      <h1 className="main-title">Image Search</h1>
      <div className="main-input">
        <input
          type="text"
          placeholder="Search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="search-btn" onClick={renderPhoto}>
          Get Photos
        </button>
      </div>
      <div className="button-container">
        <button
          onClick={() => {
            setInput("Mountain");
            return renderPhoto();
          }}
        >
          Mountain
        </button>
        <button
          onClick={() => {
            setInput("beach");
            return renderPhoto();
          }}
        >
          Beaches
        </button>
        <button
          onClick={() => {
            setInput("bird");
            return renderPhoto();
          }}
        >
          Birds
        </button>
        <button
          onClick={() => {
            setInput("food");
            return renderPhoto();
          }}
        >
          Food
        </button>
      </div>
      <div className="images-container">{displayData}</div>
    </div>
  );
}

export default App;
