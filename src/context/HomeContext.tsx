import React, { createContext, useState, useEffect } from "react";
import { ISections } from "../utils/constant";

import * as menu from "../api/menu/menu";

const URL = "https://atlas-fe-menu.atlas-kitchen.workers.dev/menu";

interface IHomeContext {
  listSection: ISections[];
  activeItem: any[];
}

export const HomeContext = createContext<IHomeContext>({
  listSection: [],
  activeItem: [],
});

export const HomeProvider = (props: any) => {
  const [activeNav, setActiveNav] = useState("");
  const [data, setData] = useState<ISections[]>();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await menu.fetchList(URL);
        setData(res?.sections);
      } catch (err) {
        console.error("ERR", err);
      }
    };

    fetch();
  }, []);

  return (
    <HomeContext.Provider
      value={{
        listSection: data || [],
        activeItem: [activeNav, setActiveNav],
      }}
    >
      {props.children}
    </HomeContext.Provider>
  );
};
