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
    UserPlus,
    Users,
    MoreHorizontal,
    Mail,
    Shield,
    UserX,
    Crown
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Member {
    id: number
    name: string
    email: string
    role: "owner" | "admin" | "member"
    status: "active" | "pending" | "inactive"
    tasksCompleted: number
    joinedDate: string
}

export default function MembersPage() {
    const [members, setMembers] = useState<Member[]>([
        { id: 1, name: "John Doe", email: "john@example.com", role: "owner", status: "active", tasksCompleted: 45, joinedDate: "Jan 2024" },
        { id: 2, name: "Alice Smith", email: "alice@example.com", role: "admin", status: "active", tasksCompleted: 38, joinedDate: "Jan 2024" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "member", status: "active", tasksCompleted: 24, joinedDate: "Feb 2024" },
        { id: 4, name: "Sarah Williams", email: "sarah@example.com", role: "member", status: "active", tasksCompleted: 31, joinedDate: "Feb 2024" },
        { id: 5, name: "Mike Brown", email: "mike@example.com", role: "member", status: "pending", tasksCompleted: 0, joinedDate: "Mar 2024" },
    ])

    const getRoleBadge = (role: string) => {
        switch (role) {
            case "owner":
                return <Badge variant="warning" className="gap-1"><Crown className="h-3 w-3" />Owner</Badge>
            case "admin":
                return <Badge variant="inProgress" className="gap-1"><Shield className="h-3 w-3" />Admin</Badge>
            case "member":
                return <Badge variant="pending" className="gap-1"><Users className="h-3 w-3" />Member</Badge>
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge variant="success">Active</Badge>
            case "pending":
                return <Badge variant="warning">Pending</Badge>
            case "inactive":
                return <Badge variant="destructive">Inactive</Badge>
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Members</h1>
                    <p className="text-gray-400 mt-2">Manage workspace members and permissions.</p>
                </div>
                <Button variant="premium" className="gap-2">
                    <UserPlus className="h-4 w-4" />
                    Invite Member
                </Button>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">
                            Total Members
                        </CardTitle>
                        <Users className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{members.length}</div>
                        <p className="text-xs text-gray-400">
                            {members.filter(m => m.status === "active").length} active
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">
                            Pending Invites
                        </CardTitle>
                        <Mail className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">
                            {members.filter(m => m.status === "pending").length}
                        </div>
                        <p className="text-xs text-gray-400">
                            Awaiting response
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">
                            Admins
                        </CardTitle>
                        <Shield className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">
                            {members.filter(m => m.role === "admin" || m.role === "owner").length}
                        </div>
                        <p className="text-xs text-gray-400">
                            With elevated access
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-200">
                            Avg Tasks/Member
                        </CardTitle>
                        <Users className="h-4 w-4 text-gray-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">
                            {Math.round(members.reduce((acc, m) => acc + m.tasksCompleted, 0) / members.filter(m => m.status === "active").length)}
                        </div>
                        <p className="text-xs text-gray-400">
                            Tasks completed
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Members List */}
            <Card>
                <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>
                        A list of all members in your workspace.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {members.map((member) => (
                            <Link key={member.id} href={`/owner/members/${member.id}`}>
                                <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-indigo-500/50 transition-all cursor-pointer">
                                    <div className="flex items-center gap-4 flex-1">
                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src="" alt={member.name} />
                                            <AvatarFallback className="text-sm font-bold">
                                                {member.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium text-white">{member.name}</p>
                                                {getRoleBadge(member.role)}
                                                {getStatusBadge(member.status)}
                                            </div>
                                            <p className="text-sm text-gray-400">{member.email}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {member.tasksCompleted} tasks completed • Joined {member.joinedDate}
                                            </p>
                                        </div>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="cursor-pointer">
                                                <Mail className="mr-2 h-4 w-4" />
                                                <span>Send Message</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="cursor-pointer">
                                                <Shield className="mr-2 h-4 w-4" />
                                                <span>Change Role</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="cursor-pointer text-red-400 focus:text-red-300">
                                                <UserX className="mr-2 h-4 w-4" />
                                                <span>Remove Member</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </Link>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
