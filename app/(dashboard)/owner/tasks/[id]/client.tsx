"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ArrowLeft,
    CheckCircle2,
    Clock,
    Loader2,
    Calendar,
    User,
    FolderKanban,
    Flag,
    MessageSquare,
    Send,
    ExternalLink
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import Link from "next/link"

type TaskStatus = "pending" | "inProgress" | "done"

interface TaskDetailClientProps {
    id: string
}

export default function TaskDetailClient({ id }: TaskDetailClientProps) {
    // Mock data - in real app, fetch based on id
    const task = {
        id: id,
        title: "Fix navigation bug",
        description: "The main navigation menu is not displaying correctly on mobile devices. Users are reporting that the menu items overlap and some links are not clickable. This needs to be fixed urgently as it's affecting user experience.",
        priority: "High" as const,
        status: "inProgress" as "inProgress",
        due: "2024-03-20",
        createdDate: "2024-03-15",
        assignedTo: { id: 2, name: "Alice Smith", email: "alice@example.com" },
        assignedBy: { id: 1, name: "John Doe" },
        room: { id: 1, name: "Website Redesign" }
    }

    const [status, setStatus] = useState<TaskStatus>(task.status)
    const [newComment, setNewComment] = useState("")
    const [comments, setComments] = useState([
        { id: 1, author: "John Doe", text: "Please prioritize this task", time: "2 hours ago" },
        { id: 2, author: "Alice Smith", text: "Working on it now, should be done by EOD", time: "1 hour ago" },
    ])

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([...comments, {
                id: comments.length + 1,
                author: "You",
                text: newComment,
                time: "Just now"
            }])
            setNewComment("")
        }
    }

    const getStatusBadge = (status: TaskStatus) => {
        switch (status) {
            case "done":
                return <Badge variant="success" className="gap-1.5 px-3 py-1"><CheckCircle2 className="h-3.5 w-3.5" />Done</Badge>
            case "inProgress":
                return <Badge variant="inProgress" className="gap-1.5 px-3 py-1"><Loader2 className="h-3.5 w-3.5 animate-spin" />In Progress</Badge>
            case "pending":
                return <Badge variant="pending" className="gap-1.5 px-3 py-1"><Clock className="h-3.5 w-3.5" />Pending</Badge>
        }
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "High": return "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]"
            case "Medium": return "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]"
            case "Low": return "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]"
        }
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up">
            <div className="flex flex-col gap-4">
                <Link href={`/owner/rooms/${task.room.id}`} className="flex items-center gap-2 text-gray-400 hover:text-white transition-all w-fit group">
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back to Room Board</span>
                </Link>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className={`h-3 w-3 rounded-full ${getPriorityColor(task.priority)} animation-pulse`} />
                            <h1 className="text-4xl font-extrabold tracking-tight text-white leading-tight">{task.title}</h1>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                            {getStatusBadge(status)}
                            <Badge variant="outline" className="glass gap-1.5 px-3 py-1 border-white/10 text-gray-300">
                                <Flag className="h-3.5 w-3.5" />
                                {task.priority} Priority
                            </Badge>
                            <Badge variant="outline" className="glass gap-1.5 px-3 py-1 border-white/10 text-gray-300">
                                <Calendar className="h-3.5 w-3.5" />
                                Due {task.due}
                            </Badge>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 glass p-1.5 rounded-2xl border-white/10 bg-white/5">
                        <Button
                            variant={status === "pending" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setStatus("pending")}
                            className={`rounded-xl px-4 ${status === "pending" ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30' : 'text-gray-400'}`}
                        >
                            Pending
                        </Button>
                        <Button
                            variant={status === "inProgress" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setStatus("inProgress")}
                            className={`rounded-xl px-4 ${status === "inProgress" ? 'bg-violet-500/20 text-violet-300 hover:bg-violet-500/30' : 'text-gray-400'}`}
                        >
                            In Progress
                        </Button>
                        <Button
                            variant={status === "done" ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setStatus("done")}
                            className={`rounded-xl px-4 ${status === "done" ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30' : 'text-gray-400'}`}
                        >
                            Done
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Description */}
                    <Card className="glass border-white/5 bg-white/5 overflow-hidden">
                        <div className="h-1 bg-gradient-to-r from-violet-600 to-indigo-600" />
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                <div className="p-1 rounded bg-violet-500/10 border border-violet-500/20">
                                    <MessageSquare className="h-4 w-4 text-violet-400" />
                                </div>
                                Description
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base">{task.description}</p>
                        </CardContent>
                    </Card>

                    {/* Comments */}
                    <Card className="glass border-white/5 bg-white/5">
                        <CardHeader className="pb-4">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="p-1 rounded bg-indigo-500/10 border border-indigo-500/20">
                                    <MessageSquare className="h-4 w-4 text-indigo-400" />
                                </div>
                                <CardTitle className="text-lg font-semibold">Activity & Discussion</CardTitle>
                            </div>
                            <CardDescription className="text-gray-500 text-xs">
                                Collaborate and share updates on this specific task
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-2">
                            <div className="space-y-4">
                                {comments.map((comment) => (
                                    <div key={comment.id} className="flex gap-4 group">
                                        <Avatar className="h-10 w-10 border-2 border-white/5 transition-transform group-hover:scale-105">
                                            <AvatarFallback className="text-xs font-bold bg-gradient-to-br from-violet-600 to-indigo-600 text-white italic">
                                                {comment.author.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-1.5">
                                            <div className="flex items-center gap-2">
                                                <p className="font-semibold text-gray-200 text-sm">{comment.author}</p>
                                                <span className="text-[10px] text-gray-600 font-medium">{comment.time}</span>
                                            </div>
                                            <div className="p-3.5 rounded-2xl rounded-tl-none bg-white/5 border border-white/5 text-sm text-gray-300 leading-snug">
                                                {comment.text}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-white/5">
                                <Input
                                    placeholder="Type a message..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                                    className="glass border-white/10 bg-white/5 focus:bg-white/10 text-white placeholder:text-gray-600 h-11 rounded-xl"
                                />
                                <Button
                                    onClick={handleAddComment}
                                    size="icon"
                                    variant="premium"
                                    className="h-11 w-11 rounded-xl shrink-0 shadow-lg shadow-violet-500/20"
                                >
                                    <Send className="h-5 w-5" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Meta */}
                <div className="space-y-6">
                    <Card className="glass border-white/5 bg-white/5 pt-4">
                        <CardHeader className="pb-3 px-6">
                            <CardTitle className="text-sm font-bold uppercase tracking-widest text-gray-500 flex items-center justify-between">
                                Task Metadata
                                <FolderKanban className="h-4 w-4 opacity-30" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 px-6 pb-6">
                            <MetaItem
                                label="Assigned To"
                                value={task.assignedTo.name}
                                icon={<User className="h-3.5 w-3.5" />}
                                subtitle={task.assignedTo.email}
                                avatar={task.assignedTo.name}
                            />
                            <MetaItem
                                label="Project Room"
                                value={task.room.name}
                                icon={<FolderKanban className="h-3.5 w-3.5" />}
                                link={`/owner/rooms/${task.room.id}`}
                                roomCode={task.room.name.substring(0, 2).toUpperCase()}
                            />
                            <MetaItem
                                label="Responsible Owner"
                                value={task.assignedBy.name}
                                icon={<User className="h-3.5 w-3.5" />}
                                subtitle={task.createdDate}
                            />

                            <div className="pt-4 border-t border-white/5">
                                <Button variant="ghost" className="w-full justify-between text-xs text-violet-400 hover:text-violet-300 hover:bg-violet-400/5 group h-9 rounded-lg">
                                    View Revision History
                                    <ArrowLeft className="h-3.5 w-3.5 rotate-180 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass border-dashed border-white/10 bg-transparent">
                        <CardContent className="p-6">
                            <div className="flex flex-col items-center text-center space-y-3">
                                <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                                    <ExternalLink className="h-5 w-5 text-gray-400" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-white">Share Task</p>
                                    <p className="text-xs text-gray-500">Generate a unique link to share progress with stakeholders</p>
                                </div>
                                <Button variant="outline" size="sm" className="w-full glass border-white/10 h-9 font-bold text-[10px] uppercase tracking-wider">
                                    Copy Link
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function MetaItem({ label, value, icon, subtitle, avatar, link, roomCode }: any) {
    const Component = link ? Link : 'div'
    return (
        <div className="space-y-1.5 flex flex-col">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 flex items-center gap-1.5">
                {icon}
                {label}
            </p>
            <Component
                href={link || ''}
                className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${link ? 'bg-white/5 hover:bg-white/10 hover:translate-x-1 border border-white/5' : ''}`}
            >
                {avatar && (
                    <Avatar className="h-8 w-8 ring-2 ring-white/5 shrink-0">
                        <AvatarFallback className="text-[10px] font-bold bg-white/10 text-violet-300">
                            {avatar.split(' ').map((n: any) => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                )}
                {roomCode && (
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-lg shadow-indigo-500/30">
                        {roomCode}
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-100 text-sm truncate">{value}</p>
                    {subtitle && <p className="text-[10px] text-gray-500 truncate mt-0.5">{subtitle}</p>}
                </div>
                {link && <ExternalLink className="h-3 w-3 text-gray-600 mr-1" />}
            </Component>
        </div>
    )
}
