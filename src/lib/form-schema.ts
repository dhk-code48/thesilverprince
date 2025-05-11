import * as z from "zod";

export interface ActionResponse<T = any> {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof T]?: string[];
  };
  inputs?: T;
}

export const SlideFormSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters long",
    })
    .max(200, {
      message: "Title cannot exceed 200 characters",
    }),
  banner: z.string().url({
    message: "Please provide a valid image URL",
  }),
  description: z
    .string()
    .min(5, {
      message: "Description must be at least 5 characters long",
    })
    .max(500, {
      message: "Description cannot exceed 500 characters",
    }),
  link: z.string().url({
    message: "Please provide a valid URL (include https://)",
  }),
  order: z
    .number()
    .min(0, {
      message: "Order must be a positive number",
    })
    .int({
      message: "Order must be a whole number",
    }),
});

export type SlideFormType = z.infer<typeof SlideFormSchema>;

// Generic form state type for reusability
export interface FormState<T> {
  isSubmitting: boolean;
  isSuccess: boolean;
  error: string | null;
  data: T | null;
}

// Generic form state initializer
export const createInitialFormState = <T>(): FormState<T> => ({
  isSubmitting: false,
  isSuccess: false,
  error: null,
  data: null,
});
