import {
  VStack,
  Image,
  Text,
  Center,
  Heading,
  ScrollView,
  Box,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import LogoSvg from "@assets/logo.svg";
import BackgroundImg from "@assets/background.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required('Informe seu nome'),
  email: yup.string().required('Informe seu email').email('Email inválido'),
  password: yup.string().required('Informe uma senha').min(6, 'A senha precisa ter no mínimo 6 caracteres'),
  password_confirm: yup.string().required('Confirme sua senha').oneOf([yup.ref('password')], 'As senhas não coincidem'),
})

export function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirm: "",
    },
    resolver: yupResolver(signUpSchema),
  });

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  function handleSignUp({ name }: FormDataProps) {
    console.log({ name });
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1}>
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          alt="Pessoas treinando"
          resizeMode="contain"
          position="absolute"
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
              Crie sua conta
            </Heading>

            <Controller
              control={control}
              name="name"
              // rules={{
              //   required: "Informe seu nome",
              // }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Nome"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              // rules={{
              //   required: "Informe um e-mail válido",
              //   pattern: {
              //     value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              //     message: 'E-mail inválido'
              //   }
              // }}
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors?.password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password_confirm"
              render={({ field: { onChange, value } }) => (
                <Input
                  placeholder="Confirmar senha"
                  secureTextEntry
                  onChangeText={onChange}
                  value={value}
                  onSubmitEditing={handleSubmit(handleSignUp)}
                  returnKeyType="send"
                  errorMessage={errors?.password_confirm?.message}
                />
              )}
            />

            <Button
              title="Criar e acessar"
              onPress={handleSubmit(handleSignUp)}
            />
          </Center>

          <Button
            title="Voltar para o login"
            variant={"outline"}
            mt={24}
            onPress={handleGoBack}
          />
        </Box>
      </VStack>
    </ScrollView>
  );
}
