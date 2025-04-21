import Image from "next/image"
import type { Profile } from "./types"

export async function Header() {
  const response = await fetch("http://localhost:3333/profile", {
    cache: 'force-cache',
    next: {
        tags: ['update-avatar', 'update-profile']
    }
  });
  const profile: Profile = await response.json();
  console.log('avatar', profile.avatarUrl)

  return (
    <div className="mb-12">
      <Image
        src={profile.avatarUrl}
        alt={`Avatar de ${profile.name}`}
        decoding="async"
        width={144}
        height={144}
        className="rounded-full"
      />
      <h1>{profile.name}</h1>
    </div>
  );
}
