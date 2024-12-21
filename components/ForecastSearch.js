import React from "react";
import { Button } from "react-native";
import styled from "styled-components/native";

const ForecastSearch = ({ city, setCity, fetchLatLongHandler }) => {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior if needed
    console.log(city);
    fetchLatLongHandler();
  };

  return (
    <Container>
      <SearchBy>
        <ButtonLabel>Search By City</ButtonLabel>
      </SearchBy>

      <SearchCity
        onChangeText={setCity}
        value={city}
        placeholder={"Search By City"}
        onSubmitEditing={handleSubmit}
      />
      {/* Use Button from react-native instead of a non-native 'button' element */}
      <Button class="button-special" onPress={handleSubmit} title="SUBMIT" />
    </Container>
  );
};

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 35px;
`;

const SearchBy = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
  justify-content: flex-start;
  width: 95%;
  max-width: 700px;
`;

const ButtonLabel = styled.Text`
  color: white;
  margin-right: 10px;
`;

const SearchCity = styled.TextInput`
  height: 50px;
  margin: 12px;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  width: 95%;
  max-width: 700px;
`;

export default ForecastSearch;
