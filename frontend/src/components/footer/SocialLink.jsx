import PropTypes from "prop-types";

function SocialLink(props) {
  return (
    <>
      <div className="social-links">
        <a href={props.link} className="social-link">
          <i className={props.icon}></i>
          {props.name}
        </a>
      </div>
    </>
  );
}

SocialLink.propTypes = {
  link: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default SocialLink;
