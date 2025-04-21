'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const updateProfileSchema = z.object({
    name: z.string().min(2, 'No mínimo 2 caracteres'),
    email: z.string().email('Digite um e-mail valído')
})

type UpdateProfileSchema = z.infer<typeof updateProfileSchema>

interface UpdateProfileFormProps {
    onUpdateProfile: (data: UpdateProfileSchema) => Promise<void>
}

export function UpdateProfileForm({onUpdateProfile}: UpdateProfileFormProps) {

    const { handleSubmit, register, reset } = useForm<UpdateProfileSchema>({
        resolver: zodResolver(updateProfileSchema)
    })

    async function handleUpdateProfile({ name, email }: UpdateProfileSchema) {
        await onUpdateProfile({name, email})
        console.log('mudança', {name, email})
        reset()
    }
    
    return (
        <form onSubmit={handleSubmit(handleUpdateProfile)}>
            <input 
                {...register('name')}
                placeholder="Digite seu nome"
            />

            <input  
                {...register('email')}
                placeholder="Digite seu e-mail"
            />

            <button type="submit">Salvar perfil</button>
        </form>
    )
}