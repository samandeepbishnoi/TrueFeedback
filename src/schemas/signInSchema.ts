import { z } from 'zod'

export const signInSchema = z.object({
  identifier: z.string(),//email can also be written in place of identifier
  password: z.string(),
});