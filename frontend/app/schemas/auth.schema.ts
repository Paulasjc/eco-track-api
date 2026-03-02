import {z } from "zod"

export const loginSchema = z.object({
    email: z
    .string()
    .min(1, "El email es obligatorio")
    .email("El formato de email es inválido"),

    password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
})

export type LoginFormValues = z.infer<typeof loginSchema>