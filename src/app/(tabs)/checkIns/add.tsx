import { CheckInForm } from "@/components/checkIns/CheckInForm";
import { useLocalSearchParams } from "expo-router";
//This will add checkins for a specific goal
//handleAdd in ViewCheckIns pass these params to the router
export default function CheckIns() {
  const { goalId, valueUnit, goalName } = useLocalSearchParams<{
    goalId: string;
    valueUnit: string;
    goalName: string;
  }>();
  console.log("in CheckIns");
  return (
    <CheckInForm
      goalId={goalId}
      valueUnit={valueUnit}
      goalName={goalName}
    ></CheckInForm>
  );
}
