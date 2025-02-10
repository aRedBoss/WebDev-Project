import React from "react";
import { sociallinks } from "./SocialLinksDB.js";
import SocialLink from "./SocialLink.jsx";

function SocialLinks(props) {
  return (
    <div>
      {sociallinks.map((socialLink) => {
        return <SocialLink key={socialLink.id} {...socialLink} />;
      })}
    </div>
  );
}

export default SocialLinks;
