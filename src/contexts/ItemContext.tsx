import { createContext, useContext, useState } from "react";
import { Item } from "../types";
import { generateItems } from "../utils";
import { useCallback, useMemo } from "../@lib";

export interface ItemContextType {
  items: Item[];
  addItems: () => void;
}

const ItemContext = createContext<ItemContextType | undefined>(undefined);

export const ItemProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState(generateItems(1000));

  const addItems = useCallback(() => {
    setItems((prev) => [...prev, ...generateItems(1000, prev.length)]);
  }, []);

  const itemsValue = useMemo(() => ({ items, addItems }), [items, addItems]);

  return (
    <ItemContext.Provider value={itemsValue}>{children}</ItemContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useItemContext = () => {
  const context = useContext(ItemContext);
  if (context === undefined) {
    throw new Error("useItemContext must be used within an ItemProvider");
  }
  return context;
};
