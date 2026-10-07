import { useGoals } from "@/context/GoalProvider";
import { ProgressGoal } from "@/goals/ProgressGoal";
import { ProgressGoalData } from "@/goals/ProgressGoalData";
import { ValueUnit } from "@/goals/ValueUnit";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import GoalDescription from "../fields/GoalDescription";
import StartDate from "../fields/StartDate";
import SubmitAddGoal from "../fields/SubmitAddGoal";
import Value from "../fields/Value";
import ValueUnitPicker from "../fields/ValueUnitPicker";

type ProgressGoalProps = {
  goal: ProgressGoal | undefined;
};
//This is the form for entering a progress goal
export default function AddProgressGoal({ goal }: ProgressGoalProps) {
  const { addGoal, updateGoal } = useGoals();
  const [startDate, setStartDate] = useState<Date>(
    goal?.startDate ?? new Date(2026, 0, 1)
  );
  const [name, setName] = useState<string>(goal?.name ?? "");
  const [valueUnit, setValueUnit] = useState<ValueUnit>(
    goal?.valueUnit ?? "min"
  );
  const [value, setValue] = useState<string>(goal?.value?.toString() ?? "");
  async function handleSubmit(): Promise<void> {
    if (goal?.id) {
      goal.startDate = startDate;
      goal.name = name;
      goal.valueUnit = valueUnit;
      goal.value = Number(value);

      try {
        await updateGoal(goal);
        router.back();
      } catch (error) {
        console.log("Error updating goal");
      }
    } else {
      const goalData: ProgressGoalData = {
        name: name,
        type: "progress",
        valueUnit: valueUnit,
        startDate: startDate,
        value: Number(value),
        dateBy: undefined,
      };
      const newGoal = new ProgressGoal(goalData);
      try {
        await addGoal(newGoal);
        console.log(
          "goal" + name + " startDate " + startDate + " valueUnit " + valueUnit
        );
        //reset values
        //setName("");
        router.back();
      } catch (error) {
        console.log("Error adding goal");
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
