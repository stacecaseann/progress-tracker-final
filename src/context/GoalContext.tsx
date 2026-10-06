import { CheckIn } from "@/checkIns/CheckIn";
import { Goal } from "@/goals/Goal";
import { createContext } from "react";

//This is the context that is passed through the entire app by the goal provider,
//allowing access to the goals and checkins over all pages
interface GoalContextType {
  goals: Goal[];
  //setGoals: React.Dispatch<React.SetStateAction<Goal[]>>;
  checkIns: CheckIn[];
  addGoal: (goal: Goal) => Promise<void>;
  deleteGoal: (goalId: string) => Promise<void>;
  updateGoal: (goal: Goal) => Promise<void>;
  addCheckIn: (checkIn: CheckIn) => Promise<void>;
  deleteCheckIn: (checkInId: string) => Promise<void>;
  resetAllValues: () => Promise<void>;
}
export const GoalContext = createContext<GoalContextType | undefined>(
  undefined
);
