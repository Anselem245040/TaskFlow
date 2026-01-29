
import MemberRoomDetailClient from "./client"

type PageProps = {
    params: Promise<{ id: string }>;
}

export default async function MemberRoomDetailPage({ params }: PageProps) {
    const { id } = await params

    return <MemberRoomDetailClient id={id} />
}
