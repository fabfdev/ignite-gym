import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { Center, Heading, Text, useToast, VStack } from "@gluestack-ui/themed";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as yup from "yup";

import { api } from "@services/api";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ToastMessage } from "@components/ToastMessage";

import { useAuth } from "@hooks/useAuth";

import defaultUserPhotoImg from "@assets/userPhotoDefault.png";
import { Loading } from "@components/Loading";

type FormDataProps = {
  name: string;
  email: string;
  old_password: string;
  new_password: string;
  confirm_password: string;
};

const profileSchema = yup.object({
  name: yup.string().required("Informe o nome"),
  old_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null)),
  new_password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 dígitos")
    .nullable()
    .transform((value) => (!!value ? value : null)),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => (!!value ? value : null))
    .oneOf([yup.ref("new_password")], "As senhas não conferem")
    .when("new_password", ([newPassword], schema) => {
      return newPassword
        ? yup
            .string()
            .nullable()
            .required("Informe a confirmação de senha")
            .transform((value) => (!!value ? value : null))
            .oneOf([yup.ref("new_password")], "As senhas não conferem")
        : schema;
    }),
});

export function Profile() {
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const { user, updateUserProfile } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(profileSchema),
  });

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        quality: 1,
        aspect: [4, 4],
      });

      if (photoSelected.canceled) {
        return;
      }

      const photoUri = photoSelected.assets[0].uri;

      if (photoUri) {
        const photoInfo = (await FileSystem.getInfoAsync(photoUri)) as {
          size: number;
        };

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            placement: "top",
            render: ({ id }) => (
              <ToastMessage
                id={id}
                action="error"
                title="Imagem inválida"
                description="Essa imagem é muito grande. Escolha uma de até 5MB"
                onClose={() => toast.close(id)}
              />
            ),
          });
        }

        const fileExt = photoUri.split(".").pop();

        const photoFile = {
          name: `${user.name}.${fileExt}`.toLowerCase(),
          uri: photoUri,
          type: `${photoSelected.assets[0].type}/${fileExt}`,
        } as any;

        const userPhotoUploadForm = new FormData();
        userPhotoUploadForm.append("avatar", photoFile);

        const avatarUpdatedResponsed = await api.patch(
          "/users/avatar",
          userPhotoUploadForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const userUpdated = user;
        userUpdated.name = "asd asd";
        userUpdated.avatar = avatarUpdatedResponsed.data.avatar;

        await updateUserProfile(userUpdated);

        toast.show({
          placement: "top",
          render: ({ id }) => (
            <ToastMessage
              id={id}
              action="success"
              title={"Foto atualizada"}
              onClose={() => toast.close(id)}
            />
          ),
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleProfileUpdate(data: FormDataProps) {
    try {
      setIsLoading(true);
      const userUpdated = user;
      userUpdated.name = data.name;
      await api.put("/users", {
        name: data.name,
        password: data.new_password,
        old_password: data.old_password,
      });
      await updateUserProfile(userUpdated);

      toast.show({
        placement: "top",
        render: ({ id }) => (
          <ToastMessage
            id={id}
            action="success"
            title={"Perfil atualizado com sucesso"}
            onClose={() => toast.close(id)}
          />
        ),
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <Center mt={"$6"} px={"$10"}>
          <UserPhoto
            source={
              user.avatar
                ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                : defaultUserPhotoImg
            }
            alt="Foto"
            size="xl"
          />

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text
              color="$green500"
              fontFamily="$heading"
              fontSize={"$md"}
              mt={"$2"}
              mb={"$8"}
            >
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Center w={"$full"} gap={"$4"}>
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Nome"
                  bg="$gray600"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value}
                  bg="$gray600"
                  isReadOnly
                  onChangeText={onChange}
                />
              )}
            />
          </Center>

          <Heading
            alignSelf="flex-start"
            fontFamily="$heading"
            color="$gray200"
            fontSize={"$md"}
            mt={"$12"}
            mb={"$2"}
          >
            Alterar senha
          </Heading>

          <Center w={"$full"} gap={"$4"}>
            <Controller
              control={control}
              name="old_password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Senha antiga"
                  bg="$gray600"
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessage={errors.old_password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="new_password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Nova senha"
                  bg="$gray600"
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessage={errors.new_password?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="confirm_password"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Confirme a nova senha"
                  bg="$gray600"
                  secureTextEntry
                  onChangeText={onChange}
                  errorMessage={errors.confirm_password?.message}
                />
              )}
            />

            <Button
              title="Atualizar"
              onPress={handleSubmit(handleProfileUpdate)}
              isLoading={isLoading}
            />
          </Center>
        </Center>
      </ScrollView>
    </VStack>
  );
}
