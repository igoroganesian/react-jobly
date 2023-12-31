import React from "react";
import { Link } from "react-router-dom";
import "./CompanyCard.css";

/** Displays individual company info
 *
 * Props: {handle, name, description, logo}
 *
 * State: None
 *
 * CompanyList --> CompanyCard
 *
 */

function CompanyCard({ handle, name, description, logo }) {
  return (
    <Link className="CompanyCard" to={`/companies/${handle}`}>
      <div className="CompanyCard-card">
        <div className="CompanyCard-content">
          <strong>{name}</strong>
          {' '}
          {description}
        </div>
        <div className="CompanyCard-logo">
          {logo && <img src={logo} alt={name} />}
        </div>
      </div>
    </Link>
  );
}

export default CompanyCard;