import { useGoals } from "@/context/GoalProvider";
import { createGoalId } from "@/goals/dataUtil";
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

//This is the form for entering a streak goal
export default function AddStreakGoal() {
  const { addGoal } = useGoals();
  const [startDate, setStartDate] = useState<Date>(new Date(2026, 0, 1));
  const [name, setName] = useState<string>("");
  const [valueUnit, setValueUnit] = useState<ValueUnit>("min");
  const [value, setValue] = useState<string>("");

  async function handleSubmit(): Promise<void> {
    const goalData: StreakGoalData = {
      id: createGoalId(),
      name: name,
      type: "streak",
      valueUnit: valueUnit,
      startDate: startDate,
      value: Number(value),
      dateBy: undefined,
    };
    const goal = new StreakGoal(goalData);
    try {
      addGoal(goal);
      console.log(
        "goal" + name + " startDate " + startDate + " valueUnit " + valueUnit
      );
      //reset values
      setName("");
      router.back();
    } catch (error) {
      console.log("Error adding goal", error);
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
      <SubmitAddGoal handleSubmit={handleSubmit}></SubmitAddGoal>
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
