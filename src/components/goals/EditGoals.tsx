import { useGoals } from "@/context/GoalProvider";
import { CountGoal } from "@/goals/CountGoal";
import { FrequencyGoal } from "@/goals/FrequencyGoal";
import { ProgressGoal } from "@/goals/ProgressGoal";
import { StreakGoal } from "@/goals/StreakGoal";
import { Text, View } from "react-native";
import AddCountGoal from "./AddCountGoal";
import AddFrequencyGoal from "./AddFrequencyGoal";
import AddProgressGoal from "./AddProgressGoal";
import AddStreakGoal from "./AddStreakGoal";

type EditGoalsProps = {
  goalId: string;
};
//This is the main page for entering a goal.
//Once you pick a goal type, the corresponding add goal form displays
export default function EditGoals({ goalId }: EditGoalsProps) {
  const { goals } = useGoals();
  const goal = goals.find((goal) => goal.id === goalId);
  if (!goal) {
    return (
      <View>
        <Text>No goal found</Text>
      </View>
    );
  }
  return (
    <View style={{ zIndex: 1000, gap: 16, padding: 16 }}>
      <View style={{ zIndex: 1 }}>
        {goal instanceof CountGoal && <AddCountGoal goal={goal}></AddCountGoal>}
        {goal instanceof FrequencyGoal && (
          <AddFrequencyGoal goal={goal}></AddFrequencyGoal>
        )}
        {goal instanceof ProgressGoal && (
          <AddProgressGoal goal={goal}></AddProgressGoal>
        )}
        {goal instanceof StreakGoal && (
          <AddStreakGoal goal={goal}></AddStreakGoal>
        )}
      </View>
    </View>
  );
}
