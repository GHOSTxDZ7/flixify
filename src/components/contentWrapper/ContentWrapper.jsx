import React from "react";

import "./style.scss";


//It will center the content.
const ContentWrapper = ({ children }) => {
    return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;