'use client' 

import { FormLogin } from "./components/FormLogin";
import { AuthLayout } from "./components/AuthLayout";
import AuthAside from "./components/AuthAside";




export default function LoginPage() {


  return (
    <AuthLayout>
      <AuthAside />
      <FormLogin />
    </AuthLayout>
  );
}
