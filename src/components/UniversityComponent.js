// src/components/UniversityComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  background-color: #f9f9f9;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 4px;
`;

const Total = styled.p`
  text-align: center;
  color: #555;
  margin-bottom: 10px;
`;

const UniversityComponent = () => {
  const [country, setCountry] = useState('');
  const [universities, setUniversities] = useState([]);
  const [maxUniversities, setMaxUniversities] = useState('');
  const [minUniversities, setMinUniversities] = useState('');

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get(`http://universities.hipolabs.com/search?country=${country}`);
        setUniversities(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (country.trim() !== '') {
      fetchUniversities();
    } else {
      setUniversities([]);
    }
  }, [country]);

  useEffect(() => {
    const countriesWithUniversities = universities.map((uni) => uni.country);
    const uniqueCountries = Array.from(new Set(countriesWithUniversities));

    const universitiesCountByCountry = uniqueCountries.map((c) => ({
      country: c,
      count: universities.filter((uni) => uni.country === c).length,
    }));

    const maxCount = Math.max(...universitiesCountByCountry.map((c) => c.count));
    const minCount = Math.min(...universitiesCountByCountry.map((c) => c.count));

    setMaxUniversities(
      universitiesCountByCountry.find((c) => c.count === maxCount)?.country || ''
    );
    setMinUniversities(
      universitiesCountByCountry.find((c) => c.count === minCount)?.country || ''
    );
  }, [universities]);

  return (
    <Wrapper>
      <Title>University Search</Title>
      <Input
        type="text"
        placeholder="Enter country name"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      />
      <ButtonGroup>
        <Button onClick={() => alert(`Country with the most universities: ${maxUniversities}`)}>
          Country with Most Universities
        </Button>
        <Button onClick={() => alert(`Country with the least universities: ${minUniversities}`)}>
          Country with Least Universities
        </Button>
      </ButtonGroup>
      {universities.length > 0 && (
        <>
          <Total>Total Universities in {country}: {universities.length}</Total>
          <List>
            {universities.map((uni) => (
              <ListItem key={uni.name}>{uni.name}</ListItem>
            ))}
          </List>
        </>
      )}
    </Wrapper>
  );
};

export default UniversityComponent;
