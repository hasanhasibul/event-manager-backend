import z from "zod";

export const eventZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    description: z
      .string({
        required_error: "Description is required",
      })
      .trim(),

    location: z.string({
      required_error: "Location is required",
    }),
    start_time: z.string({
      required_error: "Start time is required",
    }),
    end_time: z.string({
      required_error: "End time is required",
    }),
  }),
});
