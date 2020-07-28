import "./Footer.scss";

import React from "react";
import { PrivacyPolicy, TermsOfService } from "@fider/components";
import { useFider } from "@fider/hooks";

export const Footer = () => {
  const fider = useFider();

  return (
    <div id="c-footer">
      <div className="container">
        {fider.settings.hasLegal && (
          <div className="l-links">
            <PrivacyPolicy />
            &middot;
            <TermsOfService />
          </div>
        )}
        <a className="l-powered" target="_blank" href="https://discord.gg/ANAaYGe">
          <img src="https://i.ibb.co/FWFXyWF/Copy-of-Copy-of-Copy-of-T.png" alt="Fider" />
          <span>Powered by Beyop</span>
        </a>
      </div>
    </div>
  );
};
