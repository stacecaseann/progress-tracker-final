import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { db } from "../../firebase";

type Goal = {
  name: string;
  //createdAt: Timestamp
};
export default function Index() {
  const [name, setName] = useState("");
  //const [id, setId] = useState("");
  const testCollection = collection(db, "goals");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    
    const q = query(testCollection, orderBy("name"));
    const unsubscribe = onSnapshot(
      //Run this query once and keep listening. When the results change, run callback again
      //Stays connected as a real time listener
      q,
      (snapshot) => {
        //In the futures we could listen for docChanges() . That tells you the state of each
        const todosData = snapshot.docs.map((doc: any) => ({
          ///give me all the docs that match this query
          id: doc.id,
          ...doc.data(),
        })) as Goal[];
        console.log(todosData);
      },
      (error) => {
        console.error("Error fetching goals:", error);
        setLoading(false);
      }
    );
    return () => unsubscribe(); //unmount when done to remove listener
    //a function returned from useEffect is its cleanup function
  }, []);

    async function addGoal(): Promise<void> {
      await addDoc(testCollection, {
        name: name,
        //createdAt: new Date(),
      });
    }

  async function deleteGoal(): Promise<void> {
    Alert.alert("Delete Goal", "Are you sure you want to delete this goal?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const id = "EJJLTJzOldnxpP8ZYqgD";
            const goal = doc(db, "goals", id);
            await deleteDoc(goal);
          } catch (error) {
            console.error("Error deleting goal", error);
          }
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="20"
        style={{
          borderWidth: 1,
          borderColor: "#999",
          borderRadius: 8,
          padding: 10,
        }}
        onChangeText={(inputValue) => setName(inputValue)}
      ></TextInput>
      {loading ? (
        <View>
          <Text>Loading</Text>
        </View>
      ) : (
        <View>
          <Text>Show all goals</Text>
        </View>
      )}
      {/* <TextInput
        placeholder="set id"
        style={{
          borderWidth: 1,
          borderColor: "#999",
          borderRadius: 8,
          padding: 10,
        }}
        onChangeText={(inputValue) => setId(inputValue)}
      ></TextInput> */}
      <Pressable onPress={addGoal}>
        <Text>Add</Text>
      </Pressable>
      <Pressable onPress={() => deleteGoal()}>
        <Text>Delete</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
