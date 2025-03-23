import { useState } from "react";
import { Heading, Text, VStack } from "@gluestack-ui/themed";

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";
import { SectionList } from "react-native";

export function History() {
  const [exercies, setExercices] = useState([
    {
      title: "22.12.12",
      data: ["Puxada frontal", "Flexão de braço"],
    },
    {
      title: "23.12.23",
      data: ["Puxada frontal", "Flexão de braço", "Puxada lateral"],
    },
  ]);

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />
      <SectionList
        sections={exercies}
        keyExtractor={(item) => item}
        renderItem={() => <HistoryCard />}
        renderSectionHeader={({ section }) => (
          <Heading
            color="$gray200"
            fontSize={"$md"}
            mt={"$10"}
            mb={"$3"}
            fontFamily="$heading"
          >
            {section.title}
          </Heading>
        )}
        style={{ paddingHorizontal: 32 }}
        contentContainerStyle={
          exercies.length === 0 && { flex: 1, justifyContent: "center" }
        }
        ListEmptyComponent={() => (
          <Text color="$gray100" textAlign="center">
            Não há exercícios registrados ainda. {"\n"}Vamos fazer exercícios
            hoje?
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </VStack>
  );
}
