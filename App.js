import React, { useEffect, useState } from "react";
import { ScrollView, ImageBackground, View } from "react-native";
import ForecastSearch from "./components/ForecastSearch";
import CurrentForecast from "./components/CurrentForecast";
import DailyForecast from "./components/DailyForecast";
import styled from "styled-components/native";
import config from "./config";
import bgImg from "./assets/4.png";
import LinearGradient from "react-native-web-linear-gradient";

const App = () => {
  const [city, setCity] = useState("Toronto");
  const [lat, setLat] = useState(43.6532);
  const [long, setLong] = useState(-79.3832);
  const [weather, setWeather] = useState({});

  const controller = new AbortController();
  const signal = controller.signal;

  //fetch lat long by city
  const fetchLatLongHandler = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${config.API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLat(data.coord.lat);
        setLong(data.coord.lon);
      });
  };

  //updates the weather when lat long changes
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&units=metric&appid=${config.API_KEY}`,
      { signal }
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        console.log(weather);
      })
      .catch((err) => {
        console.log("error", err);
      });
    return () => controller.abort();
  }, [lat, long]);

  return (
    <Container>
      <ImageBackground source={bgImg} style={{ width: "100%", height: "100%" }}>
        <LinearGradient colors={["#0e4196", "#FEB47B"]}>
          <ForecastSearch
            city={city}
            setCity={setCity}
            fetchLatLongHandler={fetchLatLongHandler}
          />
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ flex: 1 }}
          >
            <CurrentForecast
              currentWeather={weather}
              timezone={weather.timezone}
            />
            <FutureForecastContainer>
              {weather.daily ? (
                weather.daily.map((day, index) => {
                  if (index !== 0) {
                    return (
                      <DailyForecast key={day.dt} day={day} index={index} />
                    );
                  }
                })
              ) : (
                <NoWeather>No Weather to show</NoWeather>
              )}
            </FutureForecastContainer>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: dodgerblue;
`;

const NoWeather = styled.Text`
  text-align: center;
  color: white;
`;

const FutureForecastContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default App;
