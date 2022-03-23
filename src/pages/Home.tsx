import { useCallback, useContext, useEffect } from "react";

import Section from "../common-components/Section/Section";
import Layout from "../components/Layout/Layout";

import { ISections } from "../utils/constant";
import { HomeContext } from "../context/HomeContext";
import { useNavigation } from "../hook/useNavigation";

const Home = () => {
  const homeContext = useContext(HomeContext);
  const listNavigation = useNavigation(homeContext.listSection);

  const { listSection } = homeContext;
  const [activeNav, setActiveNav] = homeContext.activeItem;
  const [isAutoScroll, setIsAutoScroll] = homeContext.autoScroll;

  const isInViewPort = useCallback((id: string) => {
    const ele = document.getElementById(id);

    const { top, bottom } = ele?.getBoundingClientRect() ?? {
      top: "",
      bottom: "",
    };
    const vHeight = window.innerHeight || document.documentElement.clientHeight;
    const isVisible = (top > 0 || bottom > 0) && top < vHeight;

    return isVisible;
  }, []);

  const findElement = useCallback(() => {
    if (!isAutoScroll) return;

    listNavigation.forEach((item) => {
      const isVisible = isInViewPort(item?.id);

      if (isVisible) {
        setActiveNav(item?.id);
      }
    });
  }, [isAutoScroll, isInViewPort, listNavigation, setActiveNav]);

  useEffect(() => {
    window.addEventListener("scroll", findElement);

    return () => window.removeEventListener("scroll", findElement);
  }, [findElement]);

  useEffect(() => {
    if (activeNav && !isAutoScroll) {
      document
        ?.getElementById(activeNav)
        ?.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        setIsAutoScroll(true);
      }, 1000);
    }
  }, [activeNav, isAutoScroll, setIsAutoScroll]);

  const _renderSection = useCallback(() => {
    return listSection
      ?.sort((a, b) => a.displayOrder - b.displayOrder)
      ?.map((item: ISections) => {
        if (item?.items.length) {
          return (
            <div key={item?.id}>
              <Section
                title={item?.label}
                description={item?.description}
                listItems={item?.items}
                isDisabled={item?.disabled}
                disabledReason={item?.disabledReason}
                sectionId={item?.id?.toString()}
              />
            </div>
          );
        }
        return item?.subSections?.map((subItem) => {
          return (
            <div key={subItem?.id}>
              <Section
                title={subItem?.label}
                description={subItem?.description}
                listItems={subItem?.items}
                isDisabled={subItem?.disabled}
                disabledReason={subItem?.disabledReason}
                sectionId={`${subItem?.id?.toString()}-sub`}
              />
            </div>
          );
        });
      });
  }, [listSection]);

  return <Layout>{_renderSection()}</Layout>;
};

export default Home;
