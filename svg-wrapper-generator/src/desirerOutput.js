import PropTypes from "prop-types";

import { getSizeDimension } from "../../utils";

const InvoiceIcon = ({ size, fill, style, className, onClick }) => {
  const sizeStyle = getSizeDimension(size);
  return (
    <svg
      onClick={onClick}
      className={className}
      style={{ ...sizeStyle, ...style }}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        stroke="#5D6169"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M8.504 6.5v-.9"></path>
        <path d="M9.85 6.5H8.024a1.208 1.208 0 0 0-.45 2.328l1.857.744a1.208 1.208 0 0 1-.45 2.328H7.15"></path>
        <path d="M8.504 12.8v-.9"></path>
        <path d="M19.3 21.8a.9.9 0 0 1-.9.9H4.9a.9.9 0 0 1-.9-.9V2.9a.9.9 0 0 1 .9-.9h8.631a.9.9 0 0 1 .639.264l4.873 4.872a.9.9 0 0 1 .263.637L19.3 21.8z"></path>
        <path d="M13.9 2.081V6.5a.9.9 0 0 0 .9.9h4.419"></path>
        <path d="M6.778 16.4h9.826"></path>
        <path d="M12.118 13.7h4.486"></path>
        <path d="M13.904 11h2.7"></path>
        <path d="M6.778 19.1h9.826"></path>
      </g>
    </svg>
  );
};

InvoiceIcon.defaultProps = {
  fill: "#4F4F4F",
  size: "huge", // mini | tiny | small | medium | large | big | huge | massive
  style: {},
  className: "",
  onClick: null,
};

InvoiceIcon.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default InvoiceIcon;
