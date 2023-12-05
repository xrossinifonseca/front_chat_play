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

type DataProps = z.infer<typeof schema>;

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuthContext();

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
    try {
      setLoading(true);

      await login(data);

      setLoading(false);
    } catch (error: unknown) {
      setLoading(false);

      if (error instanceof AxiosError) {
        const { response } = error;
        if (response?.data) {
          const { error } = response.data;
          notifcation.error(error);
          setError("password", { type: "custom", message: error });
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
