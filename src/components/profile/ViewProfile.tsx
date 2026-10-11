import { useGoals } from "@/context/GoalProvider";
//This page lets you view all goals and delete or add a new goal
export default function ViewProfile() {
  const { goals, deleteGoal } = useGoals();
  //   function handleAdd() {
  //     router.push({
  //       pathname: "/goals/add",
  //     });
  //   }

  //   function handleEdit(goalId: string) {
  //     router.push({
  //       pathname: "/goals/edit",
  //       params: { goalId: goalId },//pass all the values or just some?
  //     });
  //   }

  //   async function handleDelete(goalId: string) {
  //     Alert.alert("Delete Goal", "Are you sure you want to delete this goal?", [
  //       { text: "Cancel", style: "cancel" },
  //       {
  //         text: "Delete",
  //         style: "destructive",
  //         onPress: async () => {
  //           try {
  //             console.log("Delete goal " + { goalId });
  //             await deleteGoal(goalId);
  //           } catch (error) {
  //             console.error("Error deleting goal", error);
  //           }
  //         },
  //       },
  //     ]);
  //   }

  return <></>;
  // <ScrollView
  //   contentContainerStyle={{
  //     gap: 16,
  //     padding: 16,
  //   }}
  // >
  //   <Text>{goal.description}</Text>
  //   <View
  //     style={{
  //       flexDirection: "row",
  //       gap: 8,
  //     }}
  //   >
  //     <Pressable
  //       onPress={() => handleEdit(goal.id)}
  //       style={{
  //         backgroundColor: "#397F76",
  //         paddingVertical: 14,
  //         paddingHorizontal: 20,
  //         borderRadius: 10,
  //         alignItems: "center",
  //       }}
  //     >
  //       <Text
  //         style={{
  //           color: "white",
  //           fontSize: 16,
  //           fontWeight: "600",
  //         }}
  //       >
  //         Edit
  //       </Text>
  //     </Pressable>
  //     <Pressable
  //       onPress={() => handleDelete(goal.id)}
  //       style={{
  //         backgroundColor: "#397F76",
  //         paddingVertical: 14,
  //         paddingHorizontal: 20,
  //         borderRadius: 10,
  //         alignItems: "center",
  //       }}
  //     >
  //       <Text
  //         style={{
  //           color: "white",
  //           fontSize: 16,
  //           fontWeight: "600",
  //         }}
  //       >
  //         Delete
  //       </Text>
  //     </Pressable>
  //   </View>
  //   );
  // </ScrollView>
  //   );
}
