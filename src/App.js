import './App.css';
import { useEffect, useState } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

function App() {
  const [cat, setCat] = useState({
    cats: [],
    searchField: '',
  });

  const filteredCats = cat.cats.filter((filteredCat) => {
    return filteredCat.name.toLowerCase().includes(cat.searchField || '');
  });

  const onSearchChange = (event) => {
    const searchField = event.target.value.toLowerCase();
    setCat(() => {
      return { ...cat, searchField: searchField };
    });
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setCat(() => ({ cats: users })));
  }, []);

  return (
    <div className="App">
      <h1 className='app-title'>Cats Rolodex</h1>
      <SearchBox
        onChangeHandler={onSearchChange}
        placeholder="search cats"
        className="cat-search-box"
      />
      <CardList cats={filteredCats} />
    </div>
  );
}

export default App;
