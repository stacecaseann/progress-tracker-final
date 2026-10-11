import { useAuth } from "@/context/AuthContext";
import { useGoals } from "@/context/GoalProvider";
import { updateGoal } from "@/firestore/firestoreUtil";
import { StreakGoal } from "@/goals/StreakGoal";
import { StreakGoalData } from "@/goals/StreakGoalData";
import { ValueUnit } from "@/goals/ValueUnit";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import GoalDescription from "../fields/GoalDescription";
import StartDate from "../fields/StartDate";
import SubmitAddGoal from "../fields/SubmitAddGoal";
import Value from "../fields/Value";
import ValueUnitPicker from "../fields/ValueUnitPicker";

type StreakGoalProps = {
  goal: StreakGoal | undefined;
};

//This is the form for entering a streak goal
export default function AddStreakGoal({ goal }: StreakGoalProps) {
  const { currentUser } = useAuth();
  const { addGoal } = useGoals();
  const [startDate, setStartDate] = useState<Date>(
    goal?.startDate ?? new Date(2026, 0, 1)
  );
  const [name, setName] = useState<string>(goal?.name ?? "");
  const [valueUnit, setValueUnit] = useState<ValueUnit>(
    goal?.valueUnit ?? "min"
  );
  const [value, setValue] = useState<string>(goal?.value?.toString() ?? "");

  async function handleSubmit(): Promise<void> {
    if (!currentUser) return;
    if (goal?.id) {
      goal.name = name;
      goal.valueUnit = valueUnit;
      goal.startDate = startDate;
      goal.value = Number(value);

      try {
        await updateGoal(goal);
        router.back();
      } catch (error) {
        console.log("Error updating goals");
      }
    } else {
      const goalData: StreakGoalData = {
        name: name,
        userId: currentUser.uid,
        type: "streak",
        valueUnit: valueUnit,
        startDate: startDate,
        value: Number(value),
        dateBy: undefined,
      };
      const newGoal = new StreakGoal(goalData);
      try {
        addGoal(newGoal);
        console.log(
          "goal" + name + " startDate " + startDate + " valueUnit " + valueUnit
        );
        //reset values
        //setName("");
        router.back();
      } catch (error) {
        console.log("Error adding goal", error);
      }
    }
  }

  return (
    <View style={styles.inputWithLabel}>
      <GoalDescription name={name} setName={setName}></GoalDescription>
      <Value value={value} setValue={setValue}></Value>
      <ValueUnitPicker
        valueUnit={valueUnit}
        setValueUnit={setValueUnit}
      ></ValueUnitPicker>
      <StartDate startDate={startDate} setStartDate={setStartDate}></StartDate>
      <SubmitAddGoal
        handleSubmit={handleSubmit}
        addEdit={goal?.id ? "edit" : "add"}
      ></SubmitAddGoal>
    </View>
  );
}
const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    borderColor: "#000",
    borderWidth: 1,
    margin: 12,
  },
  inputWithLabel: {
    gap: 8,
  },
  label: {
    fontSize: 8,
  },
});
