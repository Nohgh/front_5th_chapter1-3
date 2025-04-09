import { AppContent } from "./AppContent";
import { AuthProvider, NotificationProvider, ThemeProvider } from "./contexts";
import { ItemProvider } from "./contexts/ItemContext";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <ItemProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </ItemProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};
export default App;
