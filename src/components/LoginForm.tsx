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
  const [messageTimeout,setMessageTimeout] = useState("")
  const [visible,setVisible] = useState(true)
  
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

    let fetchTimeout; 

    try {
        setLoading(true);
        
        fetchTimeout = setTimeout(()=>{
          setMessageTimeout("Estamos usando serviços de hospedagem gratuita, o que pode resultar em tempos de resposta mais longos")
          
          setTimeout(()=>{
            setVisible(false)
          },5000)
          
        },10000)

        await login(data)
        
        
        clearTimeout(fetchTimeout)
        setLoading(false);



    } catch (error: unknown) {
      setLoading(false);
      setMessageTimeout('')
      clearTimeout(fetchTimeout)

      if (error instanceof AxiosError) {
        const { response } = error;
        if (response?.data.error === 'Email ou senha inválida') {
          
          let errorMessage = response?.data.error
          notifcation.error(errorMessage);
         return setError("password", { type: "custom", message:errorMessage });
        }

          notifcation.error(
            "Falha ao se comunicar com o servidor. Tente novamente mais tarde."
          );
      }else{
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
      {messageTimeout && <h1 className={`transitions-opacity ease-in-out duration-500 ${!visible && "opacity-0"} text-center text-slate-100 text-sm`}>{messageTimeout}</h1>}
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
