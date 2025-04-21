import { revalidateTag } from "next/cache"

export function UpdateAvatarForm() {

    async function updateAvatar(data: FormData) {
        "use server"

        const avatarUrl = data.get('avatarUrl')?.toString()

        if(!avatarUrl){
            return
        }

        await fetch('http://localhost:3333/profile/avatar', {
            method: 'PATCH',
            body: JSON.stringify({
                avatarUrl
            })
        })
        revalidateTag('update-avatar')
    }
    return (
        <form action={updateAvatar}>
            <input 
                type="text"
                name="avatarUrl"
                placeholder="Digita a URL do seu avatar" 
            />

            <button type="submit">Salvar avatar</button>
        </form>
    )
}