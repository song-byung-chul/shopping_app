// c:/Dev/shopping_app/client/src/hooks/useCart.ts
import { useEffect, useState } from "react";
import { useMemo } from "react";
import { useCookies } from "react-cookie";
import { ProductType } from "../types";
//import { getProduct } from "../utils/api";

const COOKIE_KEY = "cart";

const useCart = () => {
  const [cookies, setCookies] = useCookies([COOKIE_KEY]);
  // TODO: 각 ID를 서버로부터 가져오는 방식으로 변경
  const [carts, setCarts] = useState<ProductType[]>([]);
  //const cart = (cookies.cart as ProductType[]) ?? [];

  // TODO: 상품정보 자체를 받는 것이 아니라 ID를 넘겨받아서 저장해야 한다.
  /*
  const addCart = (newCart: ProductType | ProductType[]) => {
    const nextCarts =
      newCart instanceof Array ? [...cart, ...newCart] : [...cart, newCart];

    setCookies(COOKIE_KEY, nextCarts);
  };*/

  const productIds = useMemo(
    () => (cookies[COOKIE_KEY] as string[]) ?? [],
    [cookies]
  );

  const addCarts = (id: string) => {
    const nextCartIds = [...productIds, id];
    setCookies(COOKIE_KEY, nextCartIds, {
      path: "/",
    });
  };

  const changeCount = (productId: string, mode: "increase" | "decrease") => {
    const index = productIds.indexOf(productId);
    if (index === -1) {
      return;
    }

    if (mode === "decrease") {
      const tempArr = [...productIds];
      tempArr.splice(index, 1);

      if (!tempArr.includes(productId)) {
        return;
      }

      setCookies(COOKIE_KEY, tempArr, {
        path: "/",
      });
    }

    if (mode === "increase") {
      setCookies(COOKIE_KEY, [...productIds, productId], {
        path: "/",
      });
    }
  };

  const getProductById = (id: string) => {
    return fetch(`/product/${id}`).then((response) => response.json());
  };

  useEffect(() => {
    if (productIds && productIds.length) {
      const requestList: Array<Promise<any>> = [];
      productIds.forEach((id) => {
        requestList.push(getProductById(id));
      });

      Promise.all(requestList).then((response) => {
        const cartList: ProductType[] = response.map((item) => item.product);
        setCarts(cartList);
      });
    }
  }, [productIds]);

  /*
  useEffect(() => {
    if (productIds && productIds.length) {
      const requestList: Array<Promise<any>> = [];
      const requestIds = productIds.reduce(
        (acc, cur) => acc.set(cur, (acc.get(cur) || 0) + 1),
        new Map<string, number>()
      );

      Array.from(requestIds.keys()).forEach((id) => {
        requestList.push(getProduct(id));
      });
      Promise.all(requestList).then((responseList) => {
        const cartsData: CartType[] = responseList.map((response) => ({
          ...response.data.product,
          count: requestIds.get(response.data.product.id),
        }));
        setCarts(cartsData);
      });
    }
  }, [productIds]);
  */

  return {
    carts,
    addCarts,
    //carts,
    //addCarts,
    //changeCount,
  };
};
export default useCart;
