import { ISections } from "../utils/constant";

export const useNavigation = (list: ISections[]) => {
  let listItem: {
    id: string;
    label: string;
  }[] = [];

  list.forEach((item: ISections) => {
    if (item?.items.length) {
      listItem.push({
        id: item.id.toString(),
        label: item?.label,
      });
    }
    if (item?.subSections?.length) {
      item?.subSections?.forEach((product) => {
        listItem.push({
          id: `${product?.id.toString()}-sub`,
          label: product?.label,
        });
      });
    }
  });

  return listItem;
};
