import { TouchableOpacity, ScrollView } from "react-native";
import {
  VStack,
  Icon,
  HStack,
  Text,
  Heading,
  Image,
  Box,
} from "@gluestack-ui/themed";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Button } from "@components/Button";

import BodySvg from "@assets/body.svg";
import SeriesSvg from "@assets/series.svg";
import RepetitionsSvg from "@assets/repetitions.svg";

export function Exercise() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <VStack flex={1}>
      <VStack px={"$8"} bg="$gray600" pt={"$12"}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon size={"xl"} color="$green500" as={ArrowLeft} />
        </TouchableOpacity>

        <HStack
          justifyContent="space-between"
          alignItems="center"
          mt={"$4"}
          mb={"$8"}
        >
          <Heading
            color="$gray100"
            fontFamily="$heading"
            fontSize={"$lg"}
            flexShrink={1}
          >
            Puxada frontal
          </Heading>

          <HStack alignItems="center">
            <BodySvg />
            <Text color="$gray200" ml={"$1"} textTransform="capitalize">
              Costas
            </Text>
          </HStack>
        </HStack>
      </VStack>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        <VStack p={"$8"}>
          <Image
            source={{
              uri: "https://oestesom.vteximg.com.br/arquivos/ids/178208-425-425/barra-fixa-de-parede-crossfit-pull-up-treino-musculaco-D_NQ_NP_677572-MLB41374140786_042020-F.jpg?v=637273144409830000",
            }}
            alt="Imagem"
            mb={"$3"}
            resizeMode="cover"
            rounded={"$lg"}
            w={"$full"}
            h={"$80"}
          />

          <Box bg="$gray600" rounded={"$md"} pb={"$4"} px={"$4"}>
            <HStack
              alignItems="center"
              justifyContent="space-around"
              mb={"$6"}
              mt={"$5"}
            >
              <HStack alignItems="center">
                <SeriesSvg />
                <Text color="$gray200" ml={"$2"}>
                  3 séries
                </Text>
              </HStack>

              <HStack alignItems="center">
                <RepetitionsSvg />
                <Text color="$gray200" ml={"$2"}>
                  12 repetições
                </Text>
              </HStack>
            </HStack>

            <Button title="Marcar como realizado" />
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
