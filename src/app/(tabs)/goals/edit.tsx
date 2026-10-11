import EditGoals from "@/components/goals/EditGoals";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

//This is the page to edit goals.
export default function Edit() {
  const { goalId } = useLocalSearchParams<{
    goalId: string;
  }>();
  return (
    <View>
      <EditGoals goalId={goalId}></EditGoals>
    </View>
  );
}
