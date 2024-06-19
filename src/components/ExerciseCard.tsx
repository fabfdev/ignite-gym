import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { HStack, Heading, Image, Text, VStack, Icon } from "native-base";
import { Entypo } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {};

export function ExerciseCard({ ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <HStack
        bg={"gray.500"}
        alignItems={"center"}
        p={2}
        pr={4}
        rounded={"md"}
        mb={3}
      >
        <Image
          source={{
            uri: "https://media.istockphoto.com/id/1370782467/pt/foto/shot-of-a-muscular-young-man-exercising-with-a-kettlebell-in-a-gym.jpg?s=612x612&w=0&k=20&c=5IL5FWgkg9PqDoip_qhBJmqimvtJBi_vQefOz75q4w4=",
          }}
          alt="Imagem musculação"
          w={16}
          h={16}
          rounded={"md"}
          mr={4}
          resizeMode="cover"
        />
        <VStack flex={1}>
          <Heading fontSize={"lg"} color={"white"}>
            Remada com barra
          </Heading>
          <Text fontSize={"sm"} color={"gray.200"} mt={1} numberOfLines={2}>
            3 sériex x 12 repetições
          </Text>
        </VStack>
        <Icon as={Entypo} name="chevron-thin-right" color={"gray.300"} />
      </HStack>
    </TouchableOpacity>
  );
}
