import Header from './../Header/Header';
import Search from './../Search/Search';
import Dashboard from './../Dashboard/Dashboard';
import { useState, useEffect } from 'react';

const App = () => {
  // Cards from database
  const [countries, setCountries] = useState([]);

  // Function responsable to fetch the countries from api
  const getCountriesData = () => {
    // Get places from api
    fetch(process.env.REACT_APP_API + '/places', { method: 'GET' })
      .then(res => res.json())
      .then(data => data.map(item => {
        return {
          id: item.id,
          country: item.country,
          place: item.place,
          goal: `${item.month < 9 ? '0' + item.month : item.month}/${item.year}`,
          flag: item.iconUrl,
        }
      }))
      .then(data => { setCountries(data) })
  }
  useEffect(() => {
    getCountriesData();
  }, []);

  // CRUD: Add a new country object
  const addCountryHandler = (country) => {
    getCountriesData();
    // TODO: just update in state array
    // setCountries(prev => {
    //   // Find the position to insert
    //   return [...prev, country];
    // })
  }
  // CRUD: Remove an object based on its index number
  const removeCountryHandler = (index) => {
    setCountries(countries => {
      countries.splice(index, 1);
      return [...countries];
    })
  }
  // CRUD: Edit an object based on its index number
  const editCountryHandler = (index, place, goal) => {
    if (goal !== countries[index].goal)
      getCountriesData();
    // If didn't affect the goal, we can only change the text field
    else
      setCountries(prev => {
        prev[index].place = place;
        prev[index].goal = goal;
        return prev;
      });
  }



  return (
    <main>
      <Header />
      <Search addCountry={addCountryHandler} />
      <Dashboard
        countries={countries}
        addCountry={addCountryHandler}
        removeCountry={removeCountryHandler}
        editCountry={editCountryHandler}
      />
    </main>
  );
}

export default App;
