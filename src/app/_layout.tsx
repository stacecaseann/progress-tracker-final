import RootNavigation from "@/components/navigation/RootNavigation";
import { AuthContextProvider } from "@/context/AuthContext";
import { GoalProvider } from "@/context/GoalProvider";

//This is the main page that wraps the app in authentication and gives access to all the data

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <GoalProvider>
        <RootNavigation></RootNavigation>
      </GoalProvider>
    </AuthContextProvider>
  );
}
