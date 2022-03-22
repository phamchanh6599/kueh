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

  // const isInViewport = useCallback((id) => {
  //   const title = document.getElementById(id);
  //   const rect = title?.getBoundingClientRect();
  //   const isVisible = !!(
  //     rect &&
  //     rect?.top >= 0 &&
  //     rect?.left >= 0 &&
  //     rect?.bottom <=
  //       (window.innerHeight || document.documentElement.clientHeight) &&
  //     rect?.right <= (window.innerWidth || document.documentElement.clientWidth)
  //   );

  //   console.log("rect?.bottom", rect?.bottom);
  //   console.log(
  //     "window.innerHeight",
  //     window.innerHeight,
  //     document.documentElement.clientHeight
  //   );

  //   console.log("bottom", rect && rect?.bottom <= window.innerHeight);

  //   return isVisible;
  // }, []);

  // const findElement = useCallback(() => {
  //   listNavigation.forEach((item) => {
  //     const isVisible = isInViewport(item?.id);
  //     if (isVisible) {
  //       console.log("findElement", item?.id);
  //       setActiveNav(item.id);
  //     }
  //   });
  // }, [isInViewport, listNavigation, setActiveNav]);

  // useEffect(() => {
  //   window.addEventListener("scroll", findElement);

  //   return () => window.removeEventListener("scroll", findElement);
  // }, [findElement]);

  useEffect(() => {
    if (activeNav) {
      document
        ?.getElementById(activeNav)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeNav]);

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
