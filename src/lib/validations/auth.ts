import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/,
      "Password must be at least 8 characters long and include uppercase, lowercase, and a number"
    ),
});

export type LoginFormData = z.infer<typeof loginSchema>;
