import PropTypes from "prop-types";

function SocialLink({ link, name }) {
  return (
    <li>
      <a href={link} className="social-link">
        {name}
      </a>
    </li>
  );
}

SocialLink.propTypes = {
  link: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default SocialLink;
