"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Users,
    FolderKanban,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Room {
    id: number
    name: string
    description: string
    members: number
    tasks: number
    myTasks: number
    status: "active" | "archived"
}

export default function MemberRoomsPage() {
    const [rooms] = useState<Room[]>([
        { id: 1, name: "Website Redesign", description: "Complete overhaul of company website", members: 5, tasks: 12, myTasks: 3, status: "active" },
        { id: 2, name: "Mobile App Development", description: "iOS and Android app development", members: 8, tasks: 24, myTasks: 5, status: "active" },
        { id: 3, name: "Marketing Campaign", description: "Q1 2024 marketing initiatives", members: 4, tasks: 8, myTasks: 2, status: "active" },
    ])

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">My Rooms</h1>
                    <p className="text-gray-400 mt-2">Rooms you're a member of.</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">
                            Total Rooms
                        </CardTitle>
                        <FolderKanban className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{rooms.length}</div>
                        <p className="text-xs text-gray-400">
                            Active rooms
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">
                            Total Tasks
                        </CardTitle>
                        <FolderKanban className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">
                            {rooms.reduce((acc, room) => acc + room.tasks, 0)}
                        </div>
                        <p className="text-xs text-gray-400">
                            Across all rooms
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">
                            My Tasks
                        </CardTitle>
                        <Users className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">
                            {rooms.reduce((acc, room) => acc + room.myTasks, 0)}
                        </div>
                        <p className="text-xs text-gray-400">
                            Assigned to you
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Rooms Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {rooms.map((room) => (
                    <Link key={room.id} href={`/member/rooms/${room.id}`}>
                        <Card className="group hover:border-indigo-500/50 transition-all cursor-pointer h-full">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
                                            {room.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <CardTitle className="text-base">{room.name}</CardTitle>
                                            <Badge variant="success" className="mt-1">
                                                {room.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                                <CardDescription className="mt-2">
                                    {room.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-1 text-gray-400">
                                            <Users className="h-4 w-4" />
                                            <span>{room.members} members</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-400">
                                            <FolderKanban className="h-4 w-4" />
                                            <span>{room.tasks} tasks</span>
                                        </div>
                                    </div>
                                    <div className="pt-2 border-t border-white/5">
                                        <div className="flex items-center gap-1 text-sm">
                                            <span className="text-indigo-400 font-medium">{room.myTasks}</span>
                                            <span className="text-gray-400">tasks assigned to you</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
