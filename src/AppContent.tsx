import { useState } from "./@lib/hooks/useState";
import { Header, ItemList, ComplexForm } from "./components";
import { NotificationSystem } from "./components/NotificationSystem";
import { useThemeContext, useItemContext } from "./contexts";

export const AppContent = () => {
  const { theme } = useThemeContext();
  const { items, addItems } = useItemContext();
  const [age, setAge] = useState(25);
  return (
    <div
      className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}`}
    >
      <Header />
      <div>{age}</div>
      <button onClick={() => setAge((a) => a + 1)}>button</button>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-4">
            <ItemList items={items} onAddItemsClick={addItems} />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <ComplexForm />
          </div>
        </div>
      </div>
      <NotificationSystem />
    </div>
  );
};
