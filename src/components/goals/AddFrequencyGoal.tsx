import { useAuth } from "@/context/AuthContext";
import { useGoals } from "@/context/GoalProvider";
import { FrequencyGoal } from "@/goals/FrequencyGoal";
import { FrequencyGoalData } from "@/goals/FrequencyGoalData";
import { FrequencyUnit } from "@/goals/FrequencyUnit";
import { ValueUnit } from "@/goals/ValueUnit";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Frequency from "../fields/Frequency";
import FrequencyUnitPicker from "../fields/FrequencyUnitPicker";
import GoalDescription from "../fields/GoalDescription";
import StartDate from "../fields/StartDate";
import SubmitAddGoal from "../fields/SubmitAddGoal";
import Value from "../fields/Value";
import ValueUnitPicker from "../fields/ValueUnitPicker";

type FrequencyGoalProps = {
  goal: FrequencyGoal | undefined;
};
//This is the form for entering or editing a frequency goal
export default function AddFrequencyGoal({ goal }: FrequencyGoalProps) {
  const { currentUser } = useAuth();
  const { addGoal, updateGoal } = useGoals();
  const [startDate, setStartDate] = useState<Date>(
    goal?.startDate ?? new Date(2026, 0, 1)
  );
  const [name, setName] = useState<string>(goal?.name ?? "");
  const [valueUnit, setValueUnit] = useState<ValueUnit>(
    goal?.valueUnit ?? "min"
  );
  const [value, setValue] = useState<string>(goal?.value?.toString() ?? "");
  const [frequency, setFrequency] = useState<string>(
    goal?.frequency?.toString() ?? ""
  );
  const [frequencyUnit, setFrequencyUnit] = useState<FrequencyUnit>(
    goal?.frequencyUnit ?? "week"
  );
  async function handleSubmit(): Promise<void> {
    if (!currentUser) return;
    if (goal?.id) {
      goal.name = name;
      goal.startDate = startDate;
      goal.value = Number(value);
      goal.frequency = Number(frequency);
      goal.frequencyUnit = frequencyUnit;
      try {
        await updateGoal(goal);
        router.back();
      } catch (error) {
        console.log("Error updating goal");
      }
    } else {
      const goalData: FrequencyGoalData = {
        name: name,
        userId: currentUser.uid,
        type: "frequency",
        valueUnit: valueUnit,
        startDate: startDate,
        value: Number(value),
        frequency: Number(frequency),
        frequencyUnit: frequencyUnit,
        dateBy: undefined,
      };
      const newGoal = new FrequencyGoal(goalData);
      try {
        await addGoal(newGoal);
        console.log(
          "goal" + name + " startDate " + startDate + " valueUnit " + valueUnit
        );
        //reset values
        //setName("");
        router.back();
      } catch (error) {
        console.log("Error adding goal ", error);
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
      <Frequency frequency={frequency} setFrequency={setFrequency}></Frequency>
      <FrequencyUnitPicker
        frequencyUnit={frequencyUnit}
        setFrequencyUnit={setFrequencyUnit}
      ></FrequencyUnitPicker>
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
