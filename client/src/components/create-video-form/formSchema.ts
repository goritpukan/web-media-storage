import { z } from 'zod';
import {
  acceptedImageTypes,
  acceptedVideoTypes,
} from '@/lib/constants/acceptedFilesTypes';

export const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  video: z
    .custom<FileList | undefined>((files) => {
      if (typeof window === 'undefined') return true;
      return files instanceof FileList;
    }, 'Invalid file type')
    .refine((files) => files?.length, 'Video is required')
    .refine(
      (files) => !files?.length || files.length < 2,
      'You can download only 1 video',
    )
    .refine(
      (files) => !files?.length || acceptedVideoTypes.includes(files[0]?.type),
      'Only videos allowed',
    ),
  preview: z
    .custom<FileList | undefined>((files) => {
      if (typeof window === 'undefined') return true;
      return files instanceof FileList;
    }, 'Invalid file type')
    .refine((files) => files?.length, 'Preview is required')
    .refine(
      (files) => !files?.length || files.length < 2,
      'You can download only 1 preview',
    )
    .refine(
      (files) => !files?.length || acceptedImageTypes.includes(files[0]?.type),
      'Only images allowed',
    ),
});

export type FormData = z.infer<typeof formSchema>;
