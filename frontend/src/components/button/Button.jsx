import "./Button.css";
import PropTypes from "prop-types";
const Buttons = ({ className, name }) => {
  return (
    <div>
      <button className={className}>{name}</button>
    </div>
  );
};

Buttons.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
};

export default Buttons;
