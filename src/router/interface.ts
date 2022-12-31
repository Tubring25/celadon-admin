export interface MetaProps {
  keepAlive?: boolean;
  requiresAuth?: boolean;
  label: string;
  key?: string;
  icon?: string;
}

export interface RouteObject {
  caseSensitive?: boolean;
  children?: RouteObject[];
  element?: React.ReactNode;
  path?: string;
  meta?: MetaProps;
  isLink?: string;
}
