import { useState } from "react";
import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  Box,
  useToast,
} from "native-base";

import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@hooks/useAuth";

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { AppError } from "@utils/AppError";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<AuthNavigatorRoutesProps>();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

  async function handleSignIn() {
    try {
      setIsLoading(true);
      await signIn(email, password);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError? error.message : "Erro ao fazer login";
      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500',
      })

      setIsLoading(false);
    }
  }

  function handleNewAccount() {
    navigation.navigate("signUp");
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Image
          source={BackgroundImg}
          resizeMode="cover"
          position={"absolute"}
          alt="Pessoas treinando"
        />

        <Box px={10}>
          <Center my={24}>
            <LogoSvg />

            <Text color={"gray.100"} fontSize={"sm"}>
              Treine sua mente e o seu corpo
            </Text>
          </Center>

          <Center>
            <Heading
              color={"gray.100"}
              fontSize={"xl"}
              mb={6}
              fontFamily={"heading"}
            >
              Acesse sua conta
            </Heading>

            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <Input
              placeholder="Senha"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
              value={password}
            />

            <Button title="Acessar" onPress={handleSignIn} isLoading={isLoading}/>
          </Center>

          <Center mt={24}>
            <Text color={"gray.100"} fontSize={"sm"} mb={3} fontFamily={"body"}>
              Ainda não tem acesso?
            </Text>

            <Button
              title="Criar conta"
              variant={"outline"}
              onPress={handleNewAccount}
            />
          </Center>
        </Box>
      </VStack>
    </ScrollView>
  );
}
