import { UpdateAvatarForm } from "@/components/update-avatar-form";
import { UpdateProfileForm } from "@/components/update-profile-form";
import { revalidateTag } from "next/cache";

async function updateProfile({name, email}: {name: string, email: string,}) {
        "use server"

        await fetch('http://localhost:3333/profile', {
            method: 'PUT',
            body: JSON.stringify({
               name, 
               email
            })
        })
        revalidateTag('update-profile')
    }

export default function Home() {
  return (
    <main className="flex flex-col gap-12">
      <UpdateAvatarForm />
      <UpdateProfileForm onUpdateProfile={updateProfile} />
    </main>
  )
}