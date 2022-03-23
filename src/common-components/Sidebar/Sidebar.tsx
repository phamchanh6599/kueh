import "./Sidebar.scss";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useContext,
} from "react";

import { HomeContext } from "../../context/HomeContext";
import { useNavigation } from "../../hook/useNavigation";
import { isInviewPort } from "../../utils/helper";

const ID_SIDEBAR_TITLE = "sidebar-title";
interface ISidebar {
  title?: string;
}

const Sidebar: React.FC<ISidebar> = ({ title }) => {
  const homeContext = useContext(HomeContext);
  const listNavigation = useNavigation(homeContext.listSection);

  const [activeNav, setActiveNav] = homeContext.activeItem;
  const [, setIsAutoScroll] = homeContext.autoScroll;
  const [isIsVisibleTitle, setIsVisibleTitle] = useState(true);

  const isInViewPort = useCallback(() => {
    const isVisible = isInviewPort(ID_SIDEBAR_TITLE);
    setIsVisibleTitle(isVisible);
  }, []);

  useEffect(() => {
    if (!activeNav) setActiveNav(listNavigation[0]?.id);
  }, [activeNav, listNavigation, setActiveNav]);

  useEffect(() => {
    window.addEventListener("scroll", isInViewPort);

    return () => window.removeEventListener("scroll", isInViewPort);
  }, [isInViewPort]);

  const onHandleClick = useCallback(
    (item: string) => () => {
      setActiveNav(item);
      setIsAutoScroll(false);
    },
    [setActiveNav, setIsAutoScroll]
  );

  const _renderNav = useCallback(() => {
    return listNavigation.map((item, idx) => {
      return (
        <div
          key={idx}
          className={`Sidebar__item ${
            activeNav === item?.id ? "Sidebar--active" : ""
          }`}
          onClick={onHandleClick(item?.id)}
        >
          {item?.label}
        </div>
      );
    });
  }, [listNavigation, activeNav, onHandleClick]);

  const SidebarContentClass = useMemo(
    () =>
      `Sidebar__content ${!isIsVisibleTitle ? "Sidebar__content--top" : ""}`,
    [isIsVisibleTitle]
  );

  return (
    <div className="Sidebar">
      {/* Title  */}
      {title && (
        <div className="Sidebar__title" id={ID_SIDEBAR_TITLE}>
          {title}
        </div>
      )}

      {/* List navigation  */}
      <div className="Sidebar__container">
        <div className={SidebarContentClass}>{_renderNav()}</div>
      </div>
    </div>
  );
};

export default React.memo(Sidebar);
