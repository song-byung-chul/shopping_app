// ProductContext.tsx
import { createContext, useContext, useState } from "react";

interface ProductType {
  id: number;
  name: string;
  explanation: string;
  price: number;
}

type ProductContextType = [
  ProductType[],
  React.Dispatch<React.SetStateAction<ProductType[]>>
];

// Context 선언
//const ProductContext = createContext<ProductType[]>([]);
const ProductContext = createContext<ProductContextType | null>(null);

const initialValue: ProductType[] = [
  {
    id: 0,
    name: "Iphone 13 Max",
    explanation: "디스플레이는 6.1인치 19.5:9 비율의...",
    price: 123000,
  },
];

// Provider 선언
export function ProductProvider({ children }: { children: React.ReactNode }) {
  const productState = useState<ProductType[]>(initialValue);

  return (
    <ProductContext.Provider value={productState}>
      {children}
    </ProductContext.Provider>
  );
}

// Consumer 선언
/*
export function useProductContext(): ProductType[] {
  return useContext(ProductContext);
}*/
export function useProductContext() {
  return useContext(ProductContext) as ProductContextType;
}
