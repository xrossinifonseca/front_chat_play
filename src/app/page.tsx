import Link from "next/link";
import { LoginForm } from "../components/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen grid place-items-center p-2">
      <div className="max-w-[600px]  w-full rounded-xl shadow-lg bg-light-pink p-5 flex flex-col items-center justify-center gap-5">
        <h1 className="text-center text-white font-semibold text-3xl lg:text-4xl">
          ENTRAR
        </h1>

        <LoginForm />

        <div>
          <p className="text-sm text-center">
            Não possui conta ainda?{" "}
            <span className="text-purple-primary font-semibold">
              <Link href="signup">Cadastre-se</Link>{" "}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
