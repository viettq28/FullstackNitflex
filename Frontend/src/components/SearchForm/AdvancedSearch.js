import opts from '../../data/searchOpts.json';
import classes from './SearchForm.module.css';

const AdvancedSearch = () => {
  const {genres, mediaTypes, languages, years} = opts;
  const languageName = new Intl.DisplayNames(['en'], {type: 'language'});

  return (
    <div className={classes['advanced-search']}>
      <select className ={classes['advanced-select']} name="genre">
        <option value=''>Genre</option>
        {genres.map(genre => {
          return <option key={genre.id} value={genre.id}>{genre.name}</option>
        })}
      </select>

      <select className ={classes['advanced-select']} name="type">
        <option value=''>Media type</option>
        {mediaTypes.map(type => {
          return <option key={type} value={type}>{type}</option>
        })}
      </select>

      <select className ={classes['advanced-select']} name="language">
        <option value=''>Language</option>
        {languages.map(language => {
          return <option key={language} value={language}>{languageName.of(language)}</option>
        })}
      </select>

      <select className ={classes['advanced-select']} name="year">
        <option value=''>Year</option>
        {years.map(year => {
          return <option key={year} value={year}>{year}</option>
        })}
      </select>
    </div>
  );
};
export default AdvancedSearch;
