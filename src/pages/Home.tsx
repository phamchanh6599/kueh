import { useCallback, useContext, useEffect } from "react";

import Section from "../common-components/Section/Section";
import Layout from "../components/Layout/Layout";

import { ISections } from "../utils/constant";
import { HomeContext } from "../context/HomeContext";

const Home = () => {
  const homeContext = useContext(HomeContext);

  const { listSection } = homeContext;
  const [activeNav] = homeContext.activeItem;

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
