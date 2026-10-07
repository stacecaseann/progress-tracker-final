import { useGoals } from "@/context/GoalProvider";
import { CountGoal } from "@/goals/CountGoal";
import { CountGoalData } from "@/goals/CountGoalData";
import { ValueUnit } from "@/goals/ValueUnit";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import GoalDescription from "../fields/GoalDescription";
import StartDate from "../fields/StartDate";
import SubmitAddGoal from "../fields/SubmitAddGoal";
import ValueUnitPicker from "../fields/ValueUnitPicker";

type CountGoalProps = {
  goal: CountGoal | undefined;
};
//This is the form for entering or editing a count goal
export default function AddCountGoal({ goal }: CountGoalProps) {
  const { addGoal, updateGoal } = useGoals();
  const [startDate, setStartDate] = useState<Date>(
    goal?.startDate ?? new Date(2026, 0, 1)
  );
  const [name, setName] = useState<string>(goal?.name ?? "");
  const [valueUnit, setValueUnit] = useState<ValueUnit>(
    goal?.valueUnit ?? "min"
  );

  //This is the form for entering a count goal
  async function handleSubmit(): Promise<void> {
    if (goal?.id) {
      goal.name = name;
      goal.startDate = startDate;
      goal.valueUnit = valueUnit;
      try {
        await updateGoal(goal);
        router.back();
      } catch (error) {
        console.log("Error updating goal");
      }
    } else {
      const goalData: CountGoalData = {
        name: name,
        type: "count",
        valueUnit: valueUnit,
        startDate: startDate,
      };
      const newgoal = new CountGoal(goalData);
      try {
        await addGoal(newgoal);
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
    <View
      style={{
        gap: 16,
      }}
    >
      <GoalDescription name={name} setName={setName}></GoalDescription>
      <ValueUnitPicker
        valueUnit={valueUnit}
        setValueUnit={setValueUnit}
      ></ValueUnitPicker>
      {/* <StartDate startDate={startDate} setStartDate={setStartDate}></StartDate> */}
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
