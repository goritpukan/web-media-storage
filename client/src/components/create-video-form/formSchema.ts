import { z } from 'zod';
import { acceptedImageTypes, acceptedVideoTypes } from '@/lib/constants/acceptedFilesTypes';
import { VideoAccessibility } from '@/components/create-video-form/types';

export const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  video: z.custom<FileList | undefined>((files) => {
    if (typeof window === 'undefined') return true;
    return files instanceof FileList;
  }, 'Invalid file type')
    .refine(files => files?.length, 'Video is required')
    .refine(files => !files?.length || files.length < 2, 'You can download only 1 video')
    .refine(files => !files?.length || acceptedVideoTypes.includes(files[0]?.type), 'Only videos allowed'),
  preview: z.custom<FileList | undefined>((files) => {
    if (typeof window === 'undefined') return true;
    return files instanceof FileList;
  }, 'Invalid file type')
    .optional()
    .refine(files => !files?.length || files.length < 2, 'You can download only 1 image')
    .refine(files => !files?.length || acceptedImageTypes.includes(files[0]?.type), 'Only images allowed'),
  accessibility: z.nativeEnum(VideoAccessibility),
})

export type FormData = z.infer<typeof formSchema>;