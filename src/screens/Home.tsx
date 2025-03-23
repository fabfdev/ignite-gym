import { useState } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Heading, HStack, Text, VStack } from "@gluestack-ui/themed";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { HomeHeader } from "@components/HomeHeader";
import { Group } from "@components/Group";
import { ExerciseCard } from "@components/ExercideCard";

export function Home() {
  const [groups, setGroups] = useState([
    "Costas",
    "Ombro",
    "Bíceps",
    "Tríceps",
  ]);
  const [exercises, setExercises] = useState([
    "Puxada frontal",
    "Puxada lateral",
    "Pull-up",
    "Remada 1",
    "Remada 2",
    "Remada 3",
    "Remada 4",
  ]);
  const [groupSelected, setGroupSelected] = useState(groups[0]);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails() {
    navigation.navigate("exercise");
  }

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toLowerCase() === item.toLowerCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 32 }}
        style={{ marginVertical: 40, maxHeight: 44, minHeight: 44 }}
      />

      <VStack px={"$8"} flex={1}>
        <HStack justifyContent="space-between" mb={"$5"} alignItems="center">
          <Heading color="$gray200" fontSize={"$md"} fontFamily="$heading">
            Exercícios
          </Heading>

          <Text color="$gray200" fontSize={"$sm"} fontFamily="$body">
            {exercises.length}
          </Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <ExerciseCard onPress={handleOpenExerciseDetails} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  );
}
