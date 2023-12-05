"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./Input";
import { AxiosError } from "axios";
import { useState } from "react";
import Button from "./Button";
import "../axios/api";
import { useAuthContext } from "@/context/AuthContext";
import { notifcation } from "@/functions/notifcations";
const schema = z.object({
  name: z.string().min(3, "Insira um nome válido"),
  email: z.string().email("Informe um email válido"),
  password: z.string().min(6, "senha deve ter mais de 6 dígitos"),
  confirmPassword: z.string().min(6, "senha deve ter mais de 6 dígitos"),
});

type DataProps = z.infer<typeof schema>;

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);

  const { signup } = useAuthContext();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<DataProps>({
    resolver: zodResolver(schema),

    mode: "onBlur",
  });

  const onSubmit = async (data: DataProps) => {
    if (data.password != data.confirmPassword) {
      return setError("confirmPassword", {
        message: "As senhas fornecidas não são iguais",
      });
    }
    try {
      setLoading(true);

      await signup(data);

      setLoading(false);
    } catch (error: unknown) {
      setLoading(false);

      if (error instanceof AxiosError) {
        const { response } = error;
        if (response?.data) {
          const { error } = response.data;
          notifcation.error(error);
        }

        if (response?.status === 500) {
          notifcation.error(
            "Falha ao se comunicar com o servidor. Tente novamente mais tarde."
          );
        }
      }
    }
  };

  return (
    <form
      className="flex flex-col items-center gap-10  w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        {...register("name")}
        errorText={errors?.name?.message}
        type="text"
        placeholder="Nome"
        name="name"
      />
      <Input
        {...register("email")}
        errorText={errors?.email?.message}
        type="text"
        name="email"
        placeholder="Email"
      />
      <Input
        {...register("password")}
        errorText={errors?.password?.message}
        type="password"
        placeholder="senha"
        name="password"
      />
      <Input
        {...register("confirmPassword")}
        errorText={errors?.confirmPassword?.message}
        type="password"
        placeholder="confirme sua senha"
        name="confirmPassword"
      />

      <Button text="CADASTRAR" type="submit" loading={loading} />
    </form>
  );
};

export default SignUpForm;
