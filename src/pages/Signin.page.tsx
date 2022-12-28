import React from 'react'
import AuthLayout from "../features/auth/components/AuthLayout";
import SignInFormComponent from "../features/auth/components/SignInForm.component";

const SigninPage = () => {
  return (
    <AuthLayout>
      <SignInFormComponent/>
    </AuthLayout>
  )
}

export default SigninPage