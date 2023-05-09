import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import SpotifyWebApi from "spotify-web-api-js";

function App() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const hash = window.location.hash
      .substring(1)
      .split("&")
      .reduce(function (initial, item) {
        if (item) {
          var parts = item.split("=");
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});
    window.location.hash = "";
    let _accessToken = hash.access_token;
    if (_accessToken) {
      setAccessToken(_accessToken);
    }
  }, []);

  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(accessToken);

  return (
    <div className="App">
      <Home spotifyApi={spotifyApi} />
      <Footer />
    </div>
  );
}

export default App;
