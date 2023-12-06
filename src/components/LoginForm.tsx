"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./Input";
import { useState } from "react";
import { AxiosError } from "axios";
import { useAuthContext } from "@/context/AuthContext";
import Button from "./Button";
import { notifcation } from "@/functions/notifcations";
const schema = z.object({
  email: z.string().email("Informe um email válido"),
  password: z.string().min(1, "Necessário informar senha"),
});

import { useFetchTimeout } from "@/hooks/useFetchTimeout";

type DataProps = z.infer<typeof schema>;

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();
  const { handleTimeout } = useFetchTimeout();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<DataProps>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (data: DataProps) => {
    let fetchTimeout;

    try {
      setLoading(true);

      fetchTimeout = handleTimeout({
        message:
          "Estamos usando serviços de hospedagem gratuita, o que pode resultar em tempos de resposta mais longos",
        time: 10000,
      });

      fetchTimeout = handleTimeout({
        message:
          "A conexão esta demorando mais do que o esperado, por favor, atualize a pagina para tentar se reconectar com o servidor",
        time: 25000,
      });

      await login(data);

      setLoading(false);
      clearTimeout(fetchTimeout);
    } catch (error: unknown) {
      setLoading(false);
      clearTimeout(fetchTimeout);

      if (error instanceof AxiosError) {
        const { response } = error;
        if (response?.data.error === "Email ou senha inválida") {
          let errorMessage = response?.data.error;
          notifcation.error(errorMessage);
          return setError("password", {
            type: "custom",
            message: errorMessage,
          });
        }

        notifcation.error(
          "Falha ao se comunicar com o servidor. Tente novamente mais tarde."
        );
      } else {
        notifcation.error(
          "Falha ao se comunicar com o servidor. Tente novamente mais tarde."
        );
      }
    }
  };

  return (
    <form
      className="flex flex-col items-center gap-10  w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        {...register("email")}
        errorText={errors.email?.message}
        type="text"
        placeholder="Email"
      />
      <Input
        {...register("password")}
        type="password"
        errorText={errors.password?.message}
        placeholder="senha"
      />

      <Button text="CONTINUAR" loading={loading} type="submit" />
    </form>
  );
};
