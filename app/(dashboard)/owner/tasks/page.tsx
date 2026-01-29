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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Plus,
    Users,
    Calendar,
    Flag,
    FolderKanban,
    CheckCircle2,
    ArrowLeft
} from "lucide-react"
import Link from "next/link"

export default function CreateTaskPage() {
    const [taskTitle, setTaskTitle] = useState("")
    const [taskDescription, setTaskDescription] = useState("")
    const [assignedTo, setAssignedTo] = useState("")
    const [priority, setPriority] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [room, setRoom] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle task creation logic here
        console.log({
            taskTitle,
            taskDescription,
            assignedTo,
            priority,
            dueDate,
            room
        })
    }

    // Mock data - in real app, fetch from API
    const members = [
        { id: 1, name: "Alice Smith" },
        { id: 2, name: "Bob Johnson" },
        { id: 3, name: "Sarah Williams" },
        { id: 4, name: "Mike Brown" },
    ]

    const rooms = [
        { id: 1, name: "Website Redesign" },
        { id: 2, name: "Mobile App Development" },
        { id: 3, name: "Marketing Campaign" },
        { id: 4, name: "Product Launch" },
    ]

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <Link href="/owner" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-2">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="text-sm">Back to Dashboard</span>
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Create New Task</h1>
                    <p className="text-gray-400 mt-2">Assign a new task to your team members.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                {/* Main Form */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Task Details</CardTitle>
                        <CardDescription>
                            Fill in the information below to create a new task.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Task Title *</Label>
                                <Input
                                    id="title"
                                    placeholder="e.g., Fix navigation bug"
                                    value={taskTitle}
                                    onChange={(e) => setTaskTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    className="flex min-h-[120px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Describe the task in detail..."
                                    value={taskDescription}
                                    onChange={(e) => setTaskDescription(e.target.value)}
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="assignee">Assign To *</Label>
                                    <Select value={assignedTo} onValueChange={setAssignedTo} required>
                                        <SelectTrigger id="assignee">
                                            <SelectValue placeholder="Select member" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {members.map((member) => (
                                                <SelectItem key={member.id} value={member.name}>
                                                    {member.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="room">Room *</Label>
                                    <Select value={room} onValueChange={setRoom} required>
                                        <SelectTrigger id="room">
                                            <SelectValue placeholder="Select room" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {rooms.map((room) => (
                                                <SelectItem key={room.id} value={room.name}>
                                                    {room.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="priority">Priority *</Label>
                                    <Select value={priority} onValueChange={setPriority} required>
                                        <SelectTrigger id="priority">
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Low">Low</SelectItem>
                                            <SelectItem value="Medium">Medium</SelectItem>
                                            <SelectItem value="High">High</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="dueDate">Due Date *</Label>
                                    <Input
                                        id="dueDate"
                                        type="date"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" variant="premium" className="gap-2">
                                    <Plus className="h-4 w-4" />
                                    Create Task
                                </Button>
                                <Link href="/owner">
                                    <Button type="button" variant="outline">
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Quick Tips */}
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Quick Tips</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="flex gap-3">
                                <div className="h-8 w-8 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                                    <Users className="h-4 w-4 text-indigo-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-white">Assign Wisely</p>
                                    <p className="text-gray-400 text-xs">Choose team members based on their expertise and current workload.</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="h-8 w-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                    <Flag className="h-4 w-4 text-purple-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-white">Set Priority</p>
                                    <p className="text-gray-400 text-xs">Use High priority for urgent tasks that need immediate attention.</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="h-8 w-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                    <Calendar className="h-4 w-4 text-green-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-white">Realistic Deadlines</p>
                                    <p className="text-gray-400 text-xs">Set achievable due dates to maintain team morale and productivity.</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                                    <FolderKanban className="h-4 w-4 text-blue-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-white">Organize by Room</p>
                                    <p className="text-gray-400 text-xs">Group related tasks in the same room for better organization.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
                        <CardHeader>
                            <CardTitle className="text-base flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-indigo-400" />
                                Task Created
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-300">
                                Once created, the task will be visible to the assigned member and they'll receive a notification.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
