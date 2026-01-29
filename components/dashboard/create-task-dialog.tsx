"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Plus } from "lucide-react"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface CreateTaskDialogProps {
    onCreate: (task: any) => void
    members?: { name: string }[]
}

export function CreateTaskDialog({ onCreate, members = [] }: CreateTaskDialogProps) {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [assignedTo, setAssignedTo] = useState("")
    const [priority, setPriority] = useState("Medium")
    const [due, setDue] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onCreate({
            title,
            description,
            assignedTo,
            priority,
            due,
            status: "pending"
        })
        setTitle("")
        setDescription("")
        setAssignedTo("")
        setPriority("Medium")
        setDue("")
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="premium" className="gap-2 shadow-lg shadow-indigo-500/20">
                    <Plus className="h-4 w-4" />
                    Create Task
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-[#1a1b26] border-white/10 text-white">
                <DialogHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                            <CheckCircle2 className="h-5 w-5 text-indigo-400" />
                        </div>
                        <DialogTitle>Create New Task</DialogTitle>
                    </div>
                    <DialogDescription className="text-gray-400">
                        Add a new task to this room and assign it to a team member.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title" className="text-gray-200">Task Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Fix Navigation Bug"
                                className="bg-black/20 border-white/10 focus:border-indigo-500 text-white placeholder:text-gray-500"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description" className="text-gray-200">Description</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Detailed description..."
                                className="bg-black/20 border-white/10 focus:border-indigo-500 text-white placeholder:text-gray-500 resize-none h-20"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="assignee" className="text-gray-200">Assign To</Label>
                                <Select value={assignedTo} onValueChange={setAssignedTo}>
                                    <SelectTrigger className="bg-black/20 border-white/10 text-white">
                                        <SelectValue placeholder="Select member" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#1a1b26] border-white/10 text-white">
                                        {members.length > 0 ? members.map((m) => (
                                            <SelectItem key={m.name} value={m.name}>{m.name}</SelectItem>
                                        )) : (
                                            <SelectItem value="unassigned">Unassigned</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="priority" className="text-gray-200">Priority</Label>
                                <Select value={priority} onValueChange={setPriority}>
                                    <SelectTrigger className="bg-black/20 border-white/10 text-white">
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-[#1a1b26] border-white/10 text-white">
                                        <SelectItem value="Low">Low</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="High">High</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="due" className="text-gray-200">Due Date</Label>
                            <Input
                                id="due"
                                type="date"
                                value={due}
                                onChange={(e) => setDue(e.target.value)}
                                className="bg-black/20 border-white/10 focus:border-indigo-500 text-white placeholder:text-gray-500"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="text-gray-400 hover:text-white hover:bg-white/10">
                            Cancel
                        </Button>
                        <Button type="submit" variant="premium">Create Task</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
