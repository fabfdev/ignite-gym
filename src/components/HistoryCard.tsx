import { HStack, Heading, Text, VStack } from "native-base";

export function HistoryCard() {
  return (
    <HStack
      w={"full"}
      px={5}
      py={4}
      mb={3}
      bg={"gray.600"}
      rounded={"md"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <VStack flex={1}>
        <Heading color={"white"} fontSize={"md"} textTransform={"capitalize"} fontFamily={"heading"}>
          Costas
        </Heading>
        <Text color={"gray.100"} fontSize={"lg"} numberOfLines={1}>
          Puxada frontal
        </Text>
      </VStack>
      <Text color={"gray.300"} fontSize={"md"}>
        20 minutos
      </Text>
    </HStack>
  );
}
