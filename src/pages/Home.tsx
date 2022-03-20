import React, { useEffect, useState, useCallback, useMemo } from "react";

import Section from "../common-components/Section/Section";
import Layout from "../components/Layout/Layout";

import { ISections } from "../utils/constant";

import * as menu from "./../api/menu/menu";

const URL = "https://atlas-fe-menu.atlas-kitchen.workers.dev/menu";

const Home = () => {
  const [data, setData] = useState<ISections[]>();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await menu.fetchList(URL);
        setData(res?.sections);
        console.log("data", res);
      } catch (err) {
        console.error("ERR", err);
      } finally {
      }
    };

    fetch();
  }, []);

  const listNav = useMemo(
    () => (data || []).map((item: any) => item?.label),
    [data]
  );

  const _renderSection = useCallback(() => {
    return data
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
              />
            </div>
          );
        });
      });
  }, [data]);

  return <Layout list={listNav}>{_renderSection()}</Layout>;
};

export default Home;
