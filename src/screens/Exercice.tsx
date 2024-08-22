import { TouchableOpacity } from "react-native";
import {
  VStack,
  Text,
  Icon,
  HStack,
  Heading,
  Image,
  Box,
  ScrollView,
} from "native-base";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { Button } from "@components/Button";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";

type RouteParamsProps = {
  exerciseId: string;
}

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute();
  const { exerciseId } = route.params as RouteParamsProps;

  function handleGoBack() {
    navigation.goBack();
  }

  async function fetchExerciseDetails() {
    try {
      
    } catch (error) {
      
    }
  }

  return (
    <VStack flex={1}>
      <VStack px={8} bg={"gray.600"} pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon as={Feather} name="arrow-left" size={6} color={"green.500"} />
        </TouchableOpacity>

        <HStack
          justifyContent={"space-between"}
          mt={4}
          mb={8}
          alignItems={"center"}
        >
          <Heading color={"gray.100"} fontSize={"lg"} flexShrink={1} fontFamily={"heading"}>
            Puxada frontal
          </Heading>

          <HStack alignItems={"center"}>
            <BodySvg />
            <Text color={"gray.200"} ml={1} textTransform={"capitalize"}>
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView>
        <VStack p={8}>
          <Image
            w={"full"}
            height={80}
            source={{
              uri: "https://media.istockphoto.com/id/1370782467/pt/foto/shot-of-a-muscular-young-man-exercising-with-a-kettlebell-in-a-gym.jpg?s=612x612&w=0&k=20&c=5IL5FWgkg9PqDoip_qhBJmqimvtJBi_vQefOz75q4w4=",
            }}
            alt="Nome do exercício"
            mb={3}
            resizeMode="cover"
            rounded={"lg"}
          />

          <Box bg={"gray.600"} rounded={"md"} pb={4} px={4}>
            <HStack
              alignItems={"center"}
              justifyContent={"space-around"}
              mb={6}
              mt={5}
            >
              <HStack>
                <SeriesSvg />
                <Text color={"gray.200"} ml={2}>
                  3 séries
                </Text>
              </HStack>

              <HStack>
                <RepetitionsSvg />
                <Text color={"gray.200"} ml={2}>
                  12 repetições
                </Text>
              </HStack>
            </HStack>

            <Button title="Marcar como finalizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
