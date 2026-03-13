"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { LogoIcon } from "@/components/icons";
import styles from "./page.module.scss";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, router]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true);
      await login(data.email, data.password);
    } catch (error) {
      setError("root", {
        message: error instanceof Error ? error.message : "Login failed",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || isAuthenticated) {
    return null;
  }

  return (
    <main className={styles.page}>
      <div className={styles.leftPanel}>
        <div className={styles.logo}>
          <LogoIcon size={173.76} />
        </div>
        <div className={styles.illustrationWrapper}>
          <Image
            src="/login-illustration.svg"
            alt="Welcome illustration"
            width={600}
            height={337}
            className={styles.illustration}
            priority
          />
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.formContainer}>
          <h1 className={styles.title}>Welcome!</h1>
          <p className={styles.subtitle}>Enter details to login.</p>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <Input
              {...register("email")}
              type="email"
              placeholder="Email"
              error={errors.email?.message}
              autoComplete="email"
              data-cy="login-email"
            />

            <div className={styles.passwordWrapper}>
              <Input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                error={errors.password?.message}
                autoComplete="current-password"
                data-cy="login-password"
              />
              <button
                type="button"
                className={styles.showPasswordBtn}
                onClick={() => setShowPassword(!showPassword)}
                aria-pressed={showPassword}
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>

            {errors.root && <p className={styles.rootError}>{errors.root.message}</p>}

            <Link href="/forgot-password" className={styles.forgotPassword}>
              FORGOT PASSWORD?
            </Link>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isSubmitting}
              data-cy="login-submit"
            >
              LOG IN
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
