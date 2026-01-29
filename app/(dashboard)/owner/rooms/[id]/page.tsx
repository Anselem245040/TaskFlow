
import RoomDetailClient from "./client"

type PageProps = {
    params: Promise<{ id: string }>;
}

export default async function RoomDetailPage({ params }: PageProps) {
    const { id } = await params

    return <RoomDetailClient id={id} />
}
