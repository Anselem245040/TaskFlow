
import MemberTaskDetailClient from "./client"

type PageProps = {
    params: Promise<{ id: string }>;
}

export default async function MemberTaskDetailPage({ params }: PageProps) {
    const { id } = await params

    return <MemberTaskDetailClient id={id} />
}
