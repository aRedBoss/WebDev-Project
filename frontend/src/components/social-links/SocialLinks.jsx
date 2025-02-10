import { socialLinks } from "../../data/data.js";
import SocialLink from "./SocialLink.jsx";
import PropTypes from "prop-types";

function SocialLinks() {
  return (
    <>
      <ul className="social-links">
        {socialLinks.map((link) => {
          return <SocialLink key={link.id} link={link.url} name={link.name} />;
        })}
      </ul>
    </>
  );
}

SocialLinks.propTypes = {
  socialLinks: PropTypes.array,
};

export default SocialLinks;
