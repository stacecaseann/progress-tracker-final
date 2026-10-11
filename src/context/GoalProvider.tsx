import { Goal } from "@/goals/Goal";
// import {
//   loadCheckIns,
//   loadGoals,
//   saveCheckIns,
//   saveGoals,
// } from "@/goals/goals";
import { CheckIn } from "@/checkIns/CheckIn";
import {
  addCheckIn,
  addGoal,
  deleteCheckIn,
  deleteGoal,
  loadCheckIns,
  loadGoals,
  // loadProfile,
  updateGoal,
} from "@/firestore/firestoreUtil";
import { ReactNode, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { GoalContext } from "./GoalContext";

//The Goal Provider passes the goals, checkins, and ability to set those values
//through the entire app
export function GoalProvider({ children }: { children: ReactNode }) {
  const { currentUser } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  async function resetAllValues() {
    // setGoals(initialGoals);
    // setCheckIns(initialCheckIns);
    // await saveGoals(goals);
    // await saveCheckIns(checkIns);
  }

  //onSnapshot listens for database changes, and your callback functions update React state so the UI refreshes automatically.
  //useeffect subscribes to firestore data for the logged in user
  useEffect(() => {
    console.log("Mounting");
    function handleGoalsChanged(goals: Goal[]) {
      //console.log(goals);
      setGoals(goals);
    }
    function handleCheckInsChanged(checkIns: CheckIn[]) {
      //console.log(checkIns);
      setCheckIns(checkIns);
    }
    // function handleProfileChanged(profile: Profile) {
    //   //console.log(checkIns);
    //   setProfile(profile);
    // }
    function handleError(error: Error) {
      console.log(error);
    }
    //subscribes to real-time changes in the current user's goals
    const unsubscribedGoals = loadGoals(
      currentUser?.uid,
      handleGoalsChanged,
      handleError
    );
    const unsubscribedCheckIns = loadCheckIns(
      currentUser?.uid,
      handleCheckInsChanged,
      handleError
    );
    // const unsubscribedProfile = loadProfile(
    //   currentUser?.uid,
    //   handleProfileChanged,
    //   handleError
    // );
    return () => {
      unsubscribedGoals();
      unsubscribedCheckIns();
      //unsubscribedProfile();
    };
  }, [currentUser?.uid]); //this user changes, react cleans up the old listeners and creates new ones

  //TODO In the future, use a useRef hook so that it doesn't save as soon as it loads
  // useEffect(() => {
  //   if (!isLoaded) return;

  //   async function saveChangedGoals() {
  //     console.log("Saving goals");
  //     await saveGoals(goals);
  //   }
  //   saveChangedGoals();
  // }, [goals]);

  // useEffect(() => {
  //   if (!isLoaded) return;

  //   async function saveChangedCheckIns() {
  //     console.log("Saving checkIns");
  //     await saveCheckIns(checkIns);
  //   }
  //   saveChangedCheckIns();
  // }, [checkIns]);
  console.log("Project:", process.env.EXPO_PUBLIC_PROJECT_DOMAIN);
  //allows all components access to these functions
  return (
    <GoalContext.Provider
      value={{
        goals,
        //setGoals,
        checkIns,
        addGoal,
        deleteGoal,
        updateGoal,
        addCheckIn,
        deleteCheckIn,
        resetAllValues,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
}

//This is a custom hook that catches the error every time I use it in the wrong place without being wrapped in goalprovider
export function useGoals() {
  const context = useContext(GoalContext);

  if (!context) {
    throw new Error("useGoals must be used within GoalProvider");
  }

  return context;
}
