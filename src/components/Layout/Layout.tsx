import "./Layout.scss";
import React from "react";

import Sidebar from "../../common-components/Sidebar/Sidebar";

interface ILayout {
  list: string[];
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ list = [], children }) => {
  return (
    <div className="Layout">
      {/* Side bar  */}
      <div className="Layout__sidebar">
        <Sidebar listNav={list} title="Our Menu" />
      </div>

      {/* Content  */}
      <div className="Layout__content"> {children}</div>
    </div>
  );
};

export default React.memo(Layout);
