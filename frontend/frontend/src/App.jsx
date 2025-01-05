import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; 


function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://hacks-for-hackers-2025.onrender.com/events")
      .then((response) => {
        const payload = response.data;
        setItems(payload);
      })
      .catch((error) => console.log(error));
  }, []);

  const eventList = items.map((x) => {
    return (
      <li key={x._id} className="individual-eles">
        <div>
          <h3 style={{textTransform: "uppercase"}} >{x.title}</h3>
          <p>Location: {x.location}</p>
          <p>Date and Time: {x.time}</p>
          <a href={x.map_link} target="_blank" >
            View Map
          </a>
        </div>
      </li>
    );
  });

  return (
    <div>
      <div className="Nav">
        <nav>
          <h1>Event Navigator</h1>
        </nav>
      </div>
      <p>----------------------------------------------------------------------------------------</p>
      <div>
        <ul>{eventList}</ul>
      </div>
    </div>
  );
}

export default App;
