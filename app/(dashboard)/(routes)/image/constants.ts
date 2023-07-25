import * as z from "zod";

// form validation for image prompt
// user will have to prompt options - amount of images and resolution
export const formSchema = z.object({
    prompt: z.string().min(1, {
        message: "Image Prompt is required",
    }),
    amount: z.string().min(1),
    resolution: z.string().min(1)
});

// amount options
export const amountOptions = [
    {
        value: "1",
        label: "1 Photo",
    },
    {
        value: "2",
        label: "2 Photos",
    },
    {
        value: "3",
        label: "3 Photos",
    },
    {
        value: "4",
        label: "4 Photos",
    },
    {
        value: "5",
        label: "5 Photos",
    },
];

// resolution options
export const resolutionOptions = [
    {
        value: "256x256",
        label: "256x256",
    },
    {
        value: "512x512",
        label: "512x512",
    },
    {
        value: "1024x1024",
        label: "1024x1024",
    },
];