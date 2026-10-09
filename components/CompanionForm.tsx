'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Controller } from "react-hook-form"
import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldError,
} from "@/components/ui/field"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "./ui/textarea"
import { subjects } from "@/constants"

const formSchema = z.object({
    name: z.string().min(1, { message: 'Companion is required' }),
    subject: z.string().min(1, { message: 'Subject is required' }),
    topic: z.string().min(1, { message: 'Topic is required' }),
    voice: z.string().min(1, { message: 'Voice is required' }),
    style: z.string().min(1, { message: 'Style is required' }),
    duration: z.coerce.number().min(1, { message: 'Number is required' }),
})

const CompanionForm = () => {
    type FormInput = z.input<typeof formSchema>
    type FormOutput = z.output<typeof formSchema>

    // 1. Define Form
    const form = useForm<FormInput, unknown, FormOutput>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            subject: "",
            topic: "",
            voice: "",
            style: "",
            duration: 15,
        },
    })

    // 2. Define a submit handler
    const onSubmit = (values: FormOutput) => {
        console.log(values)
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Controller
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            Companion name
                        </FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            placeholder="Enter the companion name"
                            aria-invalid={fieldState.invalid}
                            className="input"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <Controller
                control={form.control}
                name="subject"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            Subject
                        </FieldLabel>
                        <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                        >
                            <SelectTrigger className="input capitalize">
                                <SelectValue placeholder="Select the subject" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {subjects.map((subject) => (
                                        <SelectItem
                                            key={subject}
                                            value={subject}
                                            className='capitalize'
                                        >
                                            {subject}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <Controller
                control={form.control}
                name="topic"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            What should the companion help with?
                        </FieldLabel>
                        <Textarea
                            {...field}
                            id={field.name}
                            placeholder="Ex. Derivatives & Integrals"
                            aria-invalid={fieldState.invalid}
                            className="input"
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <Controller
                control={form.control}
                name="voice"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            Voice
                        </FieldLabel>
                        <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                        >
                            <SelectTrigger className="input">
                                <SelectValue placeholder="Select the voice" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem
                                        key="male"
                                        value="male"
                                    >
                                        Male
                                    </SelectItem>
                                    <SelectItem
                                        key="female"
                                        value="female"
                                    >
                                        Female
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <Controller
                control={form.control}
                name="style"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            Style
                        </FieldLabel>
                        <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                        >
                            <SelectTrigger className="input">
                                <SelectValue placeholder="Select the style" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem
                                        key="formal"
                                        value="formal"
                                    >
                                        Formal
                                    </SelectItem>
                                    <SelectItem
                                        key="casual"
                                        value="casual"
                                    >
                                        Casual
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <Controller
                control={form.control}
                name="duration"
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>
                            Estimated session duration in
                        </FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            type="number"
                            placeholder="15"
                            aria-invalid={fieldState.invalid}
                            className="input"
                            value={field.value as string | number}
                        />
                        {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                        )}
                    </Field>
                )}
            />
            <Button type="submit" className="w-full cursor-pointer">Build Your Companion</Button>
        </form>
    )
}

export default CompanionForm