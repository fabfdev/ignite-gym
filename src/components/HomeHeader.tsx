import { TouchableOpacity } from "react-native";
import { HStack, Heading, Text, VStack, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

import { UserPhoto } from "./UserPhoto";

export function HomeHeader() {
  return (
    <HStack bg={"gray.600"} pt={16} pb={5} px={8} alignItems={"center"}>
      <UserPhoto
        source={{ uri: "https://picsum.photos/200" }}
        alt="Imagem do usuário"
        size={16}
        mr={4}
      />
      <VStack flex={1}>
        <Text color={"gray.100"} fontSize={"md"}>
          Olá,
        </Text>

        <Heading color={"gray.100"} fontSize={"md"}>
          Felipe
        </Heading>
      </VStack>

      <TouchableOpacity>
        <Icon as={MaterialIcons} name="logout" color={"gray.200"} size={7} />
      </TouchableOpacity>
    </HStack>
  );
}
