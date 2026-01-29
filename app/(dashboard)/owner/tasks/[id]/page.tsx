
import TaskDetailClient from "./client"

type PageProps = {
    params: Promise<{ id: string }>;
}

export default async function TaskDetailPage({ params }: PageProps) {
    const { id } = await params

    return <TaskDetailClient id={id} />
}
