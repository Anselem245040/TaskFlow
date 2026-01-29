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
    MoreHorizontal,
    FolderKanban,
    Settings as SettingsIcon,
    Trash2,
    Edit
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { CreateRoomDialog } from "@/components/dashboard/create-room-dialog"
import { toast } from "sonner"

interface Room {
    id: number
    name: string
    description: string
    members: number
    tasks: number
    status: "active" | "archived"
}

export default function RoomsPage() {
    const [rooms, setRooms] = useState<Room[]>([
        { id: 1, name: "Website Redesign", description: "Complete overhaul of company website", members: 5, tasks: 12, status: "active" },
        { id: 2, name: "Mobile App Development", description: "iOS and Android app development", members: 8, tasks: 24, status: "active" },
        { id: 3, name: "Marketing Campaign", description: "Q1 2024 marketing initiatives", members: 4, tasks: 8, status: "active" },
        { id: 4, name: "Product Launch", description: "New product launch preparation", members: 6, tasks: 15, status: "active" },
    ])

    const handleCreateRoom = (newRoom: { name: string; description: string }) => {
        const room: Room = {
            id: rooms.length + 1,
            name: newRoom.name,
            description: newRoom.description,
            members: 1, // Start with owner
            tasks: 0,
            status: "active"
        }
        setRooms([room, ...rooms])
        toast.success("Room created successfully")
    }

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Rooms</h1>
                    <p className="text-gray-400 mt-2">Manage your workspace rooms and projects.</p>
                </div>
                <CreateRoomDialog onCreate={handleCreateRoom} />
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card className="glass hover:bg-white/5 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">
                            Total Rooms
                        </CardTitle>
                        <FolderKanban className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{rooms.length}</div>
                        <p className="text-xs text-gray-400">
                            {rooms.filter(r => r.status === "active").length} active
                        </p>
                    </CardContent>
                </Card>
                <Card className="glass hover:bg-white/5 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">
                            Total Members
                        </CardTitle>
                        <Users className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">
                            {rooms.reduce((acc, room) => acc + room.members, 0)}
                        </div>
                        <p className="text-xs text-gray-400">
                            Across all rooms
                        </p>
                    </CardContent>
                </Card>
                <Card className="glass hover:bg-white/5 transition-colors">
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
                            In progress
                        </p>
                    </CardContent>
                </Card>
                <Card className="glass hover:bg-white/5 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">
                            Avg Members/Room
                        </CardTitle>
                        <Users className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">
                            {rooms.length > 0 ? Math.round(rooms.reduce((acc, room) => acc + room.members, 0) / rooms.length) : 0}
                        </div>
                        <p className="text-xs text-gray-400">
                            Per room
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Rooms Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {rooms.map((room) => (
                    <Link key={room.id} href={`/owner/rooms/${room.id}`}>
                        <Card className="group hover:border-indigo-500/50 transition-all cursor-pointer h-full glass hover:bg-white/5 hover:-translate-y-1 duration-300">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-shadow">
                                            {room.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <CardTitle className="text-base group-hover:text-indigo-300 transition-colors">{room.name}</CardTitle>
                                            <Badge variant="success" className="mt-1">
                                                {room.status}
                                            </Badge>
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="bg-[#1a1b26] border-white/10 text-gray-200">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator className="bg-white/10" />
                                            <DropdownMenuItem className="cursor-pointer hover:bg-white/5 focus:bg-white/5">
                                                <Edit className="mr-2 h-4 w-4" />
                                                <span>Edit Room</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer hover:bg-white/5 focus:bg-white/5">
                                                <SettingsIcon className="mr-2 h-4 w-4" />
                                                <span>Settings</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator className="bg-white/10" />
                                            <DropdownMenuItem className="cursor-pointer text-red-400 focus:text-red-300 hover:bg-red-500/10 focus:bg-red-500/10">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                <span>Delete Room</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                <CardDescription className="mt-2 text-gray-400 line-clamp-2">
                                    {room.description || "No description provided."}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-1 text-gray-400 bg-white/5 px-2 py-1 rounded-full">
                                        <Users className="h-3 w-3" />
                                        <span>{room.members}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-400 bg-white/5 px-2 py-1 rounded-full">
                                        <FolderKanban className="h-3 w-3" />
                                        <span>{room.tasks}</span>
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
