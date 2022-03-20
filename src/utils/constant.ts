export interface IProducts {
  currency: string;
  description: string;
  displayOrder: number;
  id: number;
  imageUrl: string;
  itemStock: { quantityLeft: string };
  label: string;
  unitPriceFractional: string;
}

export interface ICommonSection {
  description: string;
  disabled: boolean;
  disabledReason: string;
  displayOrder: 0;
  id: 6;
  items: IProducts[];
  label: string;
}

export interface ISections extends ICommonSection {
  subSections: ICommonSection[];
}
