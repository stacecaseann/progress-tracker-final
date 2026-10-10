import AppTabs from "@/components/AppTabs";
import { AuthContextProvider } from "@/context/AuthContext";
import { GoalProvider } from "@/context/GoalProvider";

//This is the layout of the app.
//It splits the app into 3 separate tabs
export default function RootLayout() {
  return (
    <AuthContextProvider>
      <GoalProvider>
        <AppTabs></AppTabs>
      </GoalProvider>
    </AuthContextProvider>
  );
}
