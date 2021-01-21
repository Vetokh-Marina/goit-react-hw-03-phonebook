import PropTypes from 'prop-types';
import s from './Section.module.css';

 function Section({ title, children }) {
  return (
    <div className ={s.section}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};
export default  Section;