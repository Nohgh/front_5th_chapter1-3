import { AppContent } from "./AppContent";
import { AuthProvider, NotificationProvider, ThemeProvider } from "./contexts";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};
export default App;
