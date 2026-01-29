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
    Flag,
    MessageSquare,
    Send,
    User,
    FolderKanban,
    History
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import Link from "next/link"

type TaskStatus = "pending" | "inProgress" | "done"

interface MemberTaskDetailClientProps {
    id: string
}

export default function MemberTaskDetailClient({ id }: MemberTaskDetailClientProps) {
    // Mock data - in real app, fetch based on id
    const task = {
        id: id,
        title: "Fix navigation bug",
        description: "The main navigation menu is not displaying correctly on mobile devices. Users are reporting that the menu items overlap and some links are not clickable. This needs to be fixed urgently as it's affecting user experience.",
        priority: "High" as const,
        status: "inProgress" as "inProgress",
        due: "2024-03-20",
        createdDate: "2024-03-15",
        assignedBy: { id: 1, name: "John Doe" },
        room: { id: 1, name: "Website Redesign" }
    }

    const [status, setStatus] = useState<TaskStatus>(task.status)
    const [newComment, setNewComment] = useState("")
    const [comments, setComments] = useState([
        { id: 1, author: "John Doe", text: "Please prioritize this task", time: "2 hours ago" },
        { id: 2, author: "You", text: "Working on it now, should be done by EOD", time: "1 hour ago" },
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
                return <Badge variant="success" className="gap-1.5 px-3 py-1"><CheckCircle2 className="h-3.5 w-3.5" />Finished</Badge>
            case "inProgress":
                return <Badge variant="inProgress" className="gap-1.5 px-3 py-1"><Loader2 className="h-3.5 w-3.5 animate-spin" />In Production</Badge>
            case "pending":
                return <Badge variant="pending" className="gap-1.5 px-3 py-1"><Clock className="h-3.5 w-3.5" />Awaiting Start</Badge>
        }
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "High": return "bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.3)]"
            case "Medium": return "bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.3)]"
            case "Low": return "bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.3)]"
        }
    }

    return (
        <div className="max-w-6xl mx-auto space-y-10 animate-fade-in-up pb-10">
            <div className="flex flex-col gap-6">
                <Link href={`/member/rooms/${task.room.id}`} className="flex items-center gap-2 text-gray-500 hover:text-white transition-all w-fit group">
                    <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest text-[10px]">Back to Workspace</span>
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="flex-1 space-y-5">
                        <div className="flex items-center gap-4">
                            <div className={`h-1.5 w-1.5 rounded-full ${getPriorityColor(task.priority)} animate-pulse`} />
                            <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1]">{task.title}</h1>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                            {getStatusBadge(status)}
                            <Badge variant="outline" className="glass border-white/5 text-gray-400 gap-1.5 px-3 py-1">
                                <Flag className="h-3.5 w-3.5" />
                                <span className="text-[11px] font-bold">{task.priority} Priority</span>
                            </Badge>
                            <Badge variant="outline" className="glass border-white/5 text-gray-400 gap-1.5 px-3 py-1">
                                <Calendar className="h-3.5 w-3.5" />
                                <span className="text-[11px] font-bold">Due {task.due}</span>
                            </Badge>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 glass p-1.5 rounded-2xl border-white/5 bg-white/[0.02] shadow-2xl">
                        {(["pending", "inProgress", "done"] as TaskStatus[]).map((s) => (
                            <Button
                                key={s}
                                variant={status === s ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setStatus(s)}
                                className={`rounded-xl px-4 h-9 font-bold text-[11px] uppercase tracking-wider transition-all ${status === s
                                        ? s === "done" ? 'bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30'
                                            : s === "inProgress" ? 'bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30'
                                                : 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30'
                                        : 'text-gray-600 hover:text-gray-300'
                                    }`}
                            >
                                {s.replace(/([A-Z])/g, ' $1')}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Description */}
                    <Card className="glass border-white/5 bg-[#161726]/40 overflow-hidden shadow-2xl">
                        <div className="h-1.5 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600" />
                        <CardHeader className="pb-4">
                            <CardTitle className="text-base font-black flex items-center gap-3 text-gray-100 uppercase tracking-widest">
                                <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                                    <MessageSquare className="h-4 w-4 text-indigo-400" />
                                </div>
                                Context & Mission
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-300 leading-relaxed text-sm lg:text-base font-medium opacity-90">{task.description}</p>
                        </CardContent>
                    </Card>

                    {/* Comments */}
                    <Card className="glass border-white/5 bg-[#161726]/40 shadow-2xl">
                        <CardHeader className="pb-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20">
                                            <History className="h-4 w-4 text-violet-400" />
                                        </div>
                                        <CardTitle className="text-base font-black text-gray-100 uppercase tracking-widest">Global Comms</CardTitle>
                                    </div>
                                    <CardDescription className="text-[10px] text-gray-500 uppercase font-black tracking-tighter pl-12">
                                        Timeline & Collaboration History
                                    </CardDescription>
                                </div>
                                <Badge variant="outline" className="border-white/5 bg-white/5 text-[9px] font-black">{comments.length} Messages</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-8 pt-2 px-8 pb-10">
                            <div className="space-y-6">
                                {comments.map((comment) => (
                                    <div key={comment.id} className="flex gap-5 group">
                                        <Avatar className="h-11 w-11 border-2 border-white/10 ring-4 ring-transparent group-hover:ring-violet-500/10 transition-all">
                                            <AvatarFallback className={`text-xs font-black ${comment.author === "You" ? "bg-zinc-800 text-gray-400" : "bg-gradient-to-tr from-indigo-600 to-violet-600 text-white"
                                                }`}>
                                                {comment.author === "You" ? "JD" : comment.author.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-3">
                                                <p className="font-black text-gray-200 text-xs uppercase tracking-tight">
                                                    {comment.author === "You" ? "John Doe (You)" : comment.author}
                                                </p>
                                                <span className="text-[9px] text-gray-600 font-black italic tracking-widest">{comment.time}</span>
                                            </div>
                                            <div className="p-4 rounded-3xl rounded-tl-none bg-white/[0.03] border border-white/5 text-sm text-gray-400 leading-relaxed font-medium">
                                                {comment.text}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-4 pt-6 border-t border-white/[0.05]">
                                <Input
                                    placeholder="Initiate communication..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                                    className="glass border-white/10 bg-white/[0.02] focus:bg-white/[0.05] text-white placeholder:text-gray-700 h-12 rounded-2xl px-5 text-sm font-medium"
                                />
                                <Button
                                    onClick={handleAddComment}
                                    size="icon"
                                    variant="premium"
                                    className="h-12 w-12 rounded-2xl shrink-0 shadow-2xl shadow-indigo-600/30 group/btn"
                                >
                                    <Send className="h-5 w-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Details */}
                <div className="space-y-6">
                    <Card className="glass border-white/5 bg-[#161726]/40 p-1">
                        <CardHeader className="pb-5 pt-6 px-6">
                            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Task Intelligence</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8 px-6 pb-8">
                            <SidebarMetaItem
                                label="Project Core"
                                value={task.room.name}
                                icon={<FolderKanban className="h-3.5 w-3.5" />}
                                roomCode={task.room.name.substring(0, 2).toUpperCase()}
                                link={`/member/rooms/${task.room.id}`}
                            />
                            <SidebarMetaItem
                                label="Responsible Lead"
                                value={task.assignedBy.name}
                                icon={<User className="h-3.5 w-3.5" />}
                                subtitle={`Created ${task.createdDate}`}
                                avatar={task.assignedBy.name}
                            />
                            <SidebarMetaItem
                                label="Execution Date"
                                value={`By ${task.due}`}
                                icon={<Calendar className="h-3.5 w-3.5" />}
                                subtitle="Mainnet Deadline"
                            />
                            <SidebarMetaItem
                                label="Priority Tier"
                                value={task.priority}
                                icon={<Flag className="h-3.5 w-3.5" />}
                                isPriority
                            />
                        </CardContent>
                    </Card>

                    <Card className="glass border-white/5 bg-gradient-to-br from-indigo-600/5 to-transparent relative overflow-hidden">
                        <div className="absolute -right-4 -bottom-4 opacity-5">
                            <History className="h-32 w-32" />
                        </div>
                        <CardContent className="p-8">
                            <div className="flex flex-col items-center text-center space-y-4">
                                <History className="h-8 w-8 text-indigo-500/50 mb-2" />
                                <div className="space-y-1">
                                    <p className="text-sm font-black text-white uppercase tracking-wider">Audit Log</p>
                                    <p className="text-[10px] text-gray-500 font-bold max-w-[140px] leading-tight">Every change is tracked on the immutable task shard.</p>
                                </div>
                                <Button variant="outline" size="sm" className="w-full glass border-white/10 h-10 font-black text-[9px] uppercase tracking-[0.1em] hover:bg-white/5 mt-2">
                                    Download Manifest
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function SidebarMetaItem({ label, value, icon, subtitle, avatar, roomCode, link, isPriority }: any) {
    const Wrapper = link ? Link : 'div'

    return (
        <div className="space-y-3">
            <p className="text-[9px] font-black uppercase tracking-widest text-gray-600 flex items-center gap-2">
                {icon}
                {label}
            </p>
            <Wrapper
                href={link || ''}
                className={`flex items-center gap-4 transition-all ${link ? 'hover:translate-x-1 group/link' : ''}`}
            >
                {avatar && (
                    <Avatar className="h-9 w-9 border border-white/10">
                        <AvatarFallback className="text-[11px] font-black bg-zinc-800 text-gray-500 italic">
                            {avatar.split(' ').map((n: any) => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                )}
                {roomCode && (
                    <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-black text-xs shadow-lg shadow-indigo-600/30">
                        {roomCode}
                    </div>
                )}
                {!avatar && !roomCode && !isPriority && (
                    <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500">
                        {icon}
                    </div>
                )}
                {isPriority && (
                    <div className={`h-9 w-9 rounded-xl flex items-center justify-center border-0 ${value === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500'
                        }`}>
                        <Flag className="h-4 w-4" />
                    </div>
                )}

                <div className="flex-1 min-w-0">
                    <p className={`font-black text-xs uppercase tracking-tight ${link ? 'group-hover/link:text-indigo-400' : 'text-gray-100'}`}>
                        {value}
                    </p>
                    {subtitle && <p className="text-[9px] text-gray-600 font-bold italic mt-0.5">{subtitle}</p>}
                </div>
            </Wrapper>
        </div>
    )
}
