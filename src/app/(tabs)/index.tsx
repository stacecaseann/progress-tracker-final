import { GoalProgressDisplay } from "@/components/progress/GoalProgressDisplay";
import { useAuth } from "@/context/AuthContext";
import { useGoals } from "@/context/GoalProvider";
import { goalColors } from "@/goals/goalColors";
import { ScrollView, StyleSheet, Text, View } from "react-native";

//This is the default page for the entire app, after being logged in
export default function Index() {
  const { currentUser } = useAuth();
  const { goals, checkIns, resetAllValues } = useGoals();
  //add reset to load initially from file again
  function handleReset(): void {
    resetAllValues();
  }
  console.log("Current User" + currentUser);
  if (goals.length === 0) {
    return (
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          //justifyContent: "center",
          alignItems: "center",
          gap: 16,
          padding: 16,
        }}
      >
        <View style={{ height: 30 }} />
        <Text
          style={{
            fontSize: 32,
          }}
        >
          Welcome!
        </Text>
        <Text
          style={{
            fontSize: 20,
          }}
        >
          Go to the Goals Tab to Add new Goals
        </Text>
      </ScrollView>
    );
  }
  return (
    <ScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
      }}
    >
      {goals.map((goal) => {
        const progress = goal.calculateProgress(checkIns, new Date());
        return (
          <View
            key={goal.id}
            style={{
              backgroundColor: goalColors[goal.type] + "50",
              padding: 20,
              borderRadius: 20,
              alignItems: "center",
            }}
          >
            <Text>{goal.description}</Text>
            <GoalProgressDisplay
              goalType={goal.type}
              goalProgress={progress}
            ></GoalProgressDisplay>
          </View>
        );
      })}
      {/* <View>
        <Pressable onPress={handleReset}>
          <Text>Reset</Text>
        </Pressable>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
