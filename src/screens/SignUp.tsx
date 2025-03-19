import {
  VStack,
  Image,
  Center,
  Text,
  Heading,
  ScrollView,
} from "@gluestack-ui/themed";

import { useNavigation } from "@react-navigation/native";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import BackgroundImg from "@assets/background.png";
import Logo from "@assets/logo.svg";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

export function SignUp() {
  const navigator = useNavigation<AuthNavigatorRoutesProps>();

  function handleSignIn() {
    navigator.goBack();
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Image
          w={"$full"}
          h={624}
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          position="absolute"
        />

        <VStack flex={1} px={"$10"} pb={"$16"}>
          <Center my={"$24"}>
            <Logo />

            <Text color="$gray100" fontSize={"$sm"}>
              Treine sua mente e seu corpo.
            </Text>
          </Center>

          <Center gap={"$2"}>
            <Heading color="$gray100">Crie sua conta</Heading>

            <Input placeholder="Nome" />
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Input placeholder="Senha" secureTextEntry />

            <Button title="Criar e acessar" />
          </Center>

          <Center flex={1} justifyContent="flex-end" mb={"$4"}>
            <Text
              color="$gray100"
              fontSize={"$sm"}
              mb={"$3"}
              fontFamily="$body"
            >
              Já tem uma conta?
            </Text>

            <Button title="Acessar" variant="outline" onPress={handleSignIn} />
          </Center>
        </VStack>
      </VStack>
    </ScrollView>
  );
}
