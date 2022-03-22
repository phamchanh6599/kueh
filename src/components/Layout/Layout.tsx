import "./Layout.scss";
import React, { useEffect, useState, useCallback } from "react";

import Sidebar from "../../common-components/Sidebar/Sidebar";

import { isInviewPort } from "../../utils/helper";

interface ILayout {
  children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  const [isShowDesktop, setIsShowDesktop] = useState(true);

  const isInViewPort = useCallback(() => {
    const isVisible = isInviewPort("desktop-sidebar");
    setIsShowDesktop(isVisible);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", isInViewPort);

    return () => window.removeEventListener("scroll", isInViewPort);
  }, [isInViewPort]);

  return (
    <div className="Layout">
      {/* Side bar  */}
      <div className="Layout__sidebar" id="desktop-sidebar">
        <Sidebar title="Our Menu" />
      </div>

      {/* Content  */}
      <div className="Layout__content"> {children}</div>

      {/* Sidebar mobile  */}
      {!isShowDesktop && (
        <div className="Layout__sidebar--mobile" id="mobile-sidebar">
          <Sidebar />
        </div>
      )}
    </div>
  );
};

export default React.memo(Layout);
