import "./Sidebar.scss";
import React, { useCallback, useEffect, useMemo, useState } from "react";

interface ISidebar {
  title: string;
  listNav: string[];
}

const Sidebar: React.FC<ISidebar> = ({ listNav, title }) => {
  const [defaultValue, setDefaultValue] = useState("active");
  const [isIsVisibleTitle, setIsVisibleTitle] = useState(true);

  const isInViewport = useCallback(() => {
    const title = document.getElementById("sidebar-title");
    const rect = title?.getBoundingClientRect();
    const isVisible = !!(
      rect &&
      rect?.top >= 0 &&
      rect?.left >= 0 &&
      rect?.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect?.right <= (window.innerWidth || document.documentElement.clientWidth)
    );

    setIsVisibleTitle(isVisible);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", isInViewport);

    return () => window.removeEventListener("scroll", isInViewport);
  }, [isInViewport]);

  const onHandleClick = useCallback(
    (item: string) => () => {
      setDefaultValue(item);
    },
    []
  );

  const _renderNav = useCallback(() => {
    return listNav.map((item, idx) => {
      return (
        <div
          key={idx}
          className={`Sidebar__item ${
            defaultValue === item ? "Sidebar--active" : ""
          }`}
          onClick={onHandleClick(item)}
        >
          {item}
        </div>
      );
    });
  }, [listNav, defaultValue, onHandleClick]);

  const SidebarContentClass = useMemo(
    () =>
      `Sidebar__content ${!isIsVisibleTitle ? "Sidebar__content--top" : ""}`,
    [isIsVisibleTitle]
  );

  return (
    <div className="Sidebar">
      <div className="Sidebar__title" id="sidebar-title">
        {title}
      </div>
      <div className="Sidebar__container">
        <div className={SidebarContentClass}>{_renderNav()}</div>
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
