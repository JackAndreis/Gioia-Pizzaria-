export type PizzaSize = 'pequena' | 'media' | 'grande' | 'gigante';

export type CrustOptionId =
  | 'tradicional'
  | 'catupiry'
  | 'cheddar'
  | 'calabresa'
  | 'chocolate-preto'
  | 'chocolate-branco';

export type MenuCategory =
  | 'lancamentos'
  | 'novidades'
  | 'tradicionais'
  | 'nobres'
  | 'especialissimas'
  | 'vegetarianas'
  | 'agridoces'
  | 'tropicais'
  | 'doces'
  | 'carnes'
  | 'massas'
  | 'bebidas'
  | 'condimentos';

export interface MenuItem {
  id: string;
  code?: string;
  name: string;
  category: MenuCategory;
  categoryLabel: string;
  isPizza: boolean;
  description: string;
  priceSmall?: number;
  priceMedium: number;
  priceLarge?: number;
  priceGiant?: number;
  image?: string;
}

export interface CustomOrder {
  items: MenuItem[];
  size: PizzaSize;
  crust: CrustOptionId;
  notes: string;
  quantity: number;
}
