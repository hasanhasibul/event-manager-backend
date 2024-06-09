import z from "zod";

export const useLoginZodSchema = z.object({
  body: z.object({
    phone: z.string({
      required_error: "Phone  is required",
    }),
    password: z.string({
      required_error: "password is required",
    }),
  }),
});

export const authTokeZodSchema = z.object({
  headers: z.object({
    authorization: z.string({
      required_error: "Access token is missing",
    }),
  }),
});
