import PropTypes from 'prop-types';
import s from './Filter.module.css';

function filter({ value, onChange }) {
  return (
    <label>
      <input className={s.input} type="text" value={value} onChange={onChange} 
      placeholder=" Fined contacts by name"
      ></input>
    </label>
  );
}

filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default filter;