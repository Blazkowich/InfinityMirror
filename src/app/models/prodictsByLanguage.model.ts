import { Product } from "./product.model";

export interface ProductsByLanguage {
  [key: string]: Product[];
}
