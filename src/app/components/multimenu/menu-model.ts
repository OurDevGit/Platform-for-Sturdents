/**
 * Model for side menu
 */
export interface MenuModel {
  title: string;
  routerUrl?: string;
  externalUrl?: string;
  iconClass?: string;
  iconCode?: string;
  count?: number;
  children?: MenuModel[];
  opened?: boolean;
  selected?: boolean;
}
