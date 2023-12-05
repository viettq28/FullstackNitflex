import { useState } from 'react';

import classes from './SearchForm.module.css';
import AdvancedSearch from './AdvancedSearch';
import Button from '../UI/Button';
import { SearchIcon } from '../Navbar/Navbar';

const SearchForm = ({ submitSearchTerm }) => {
  const [value, setValue] = useState('');
  const [isAdvSearch, setIsAdvSearch] = useState(false);
  // handleChange lấy dữ liệu từ Input
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  // Mở advanced search
  const handleShowAdvancedSearch = (e) => {
    setIsAdvSearch((prevState) => !prevState);
  };
  // handleSubmit setSearchTerm bằng input value
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAdvSearch) submitSearchTerm({ keyword: value });
    else {
      const opts = {
        genre: new FormData(e.target).get('genre'),
        mediaType: new FormData(e.target).get('type'),
        language: new FormData(e.target).get('language'),
        year: new FormData(e.target).get('year'),
      };
      submitSearchTerm({ keyword: value, opts });
    }
    setValue('');
  };
  // Reset Input
  const handleReset = (e) => {
    setValue('');
  };

  return (
    <form className={classes['form']} onSubmit={handleSubmit}>
      <div className={classes['search-field']}>
        <input id="search-field" onChange={handleChange} value={value}></input>
        <label htmlFor="search-field">
          <SearchIcon />
        </label>
      </div>
      {isAdvSearch ? <AdvancedSearch /> : ''}
      <div className={classes['button-field']}>
        <Button type="reset" handleClick={handleReset}>
          RESET
        </Button>
        <Button
          className={classes['advanced-btn']}
          handleClick={handleShowAdvancedSearch}
        >
          ADVANCED SEARCH
        </Button>
        <Button type="submit" isDisabled={!value}>
          SEARCH
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
