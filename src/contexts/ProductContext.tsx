// ProductContext.tsx
import { createContext, useContext } from "react";

interface ProductType {
  id: number;
  name: string;
  explanation: string;
  price: number;
}

// Context 선언
const ProductContext = createContext<ProductType[]>([]);

const initialValue: ProductType[] = [
  {
    id: 0,
    name: "Iphone 13 Max",
    explanation: "디스플레이는 6.1인치...",
    price: 123000,
  },
];

// Provider 선언
export function ProductProvider({ children }: { children: React.ReactNode }) {
  return (
    <ProductContext.Provider value={initialValue}>
      {children}
    </ProductContext.Provider>
  );
}

// Consumer 선언
export function useProductContext(): ProductType[] {
  return useContext(ProductContext);
}
