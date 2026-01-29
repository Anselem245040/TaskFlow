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
import { PlusCircle, FolderKanban } from "lucide-react"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"

interface CreateRoomDialogProps {
    onCreate: (room: { name: string; description: string }) => void
}

export function CreateRoomDialog({ onCreate }: CreateRoomDialogProps) {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onCreate({ name, description })
        setName("")
        setDescription("")
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="premium" className="gap-2 shadow-lg shadow-indigo-500/20">
                    <PlusCircle className="h-4 w-4" />
                    Create Room
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#1a1b26] border-white/10 text-white">
                <DialogHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                            <FolderKanban className="h-5 w-5 text-indigo-400" />
                        </div>
                        <DialogTitle>Create New Room</DialogTitle>
                    </div>
                    <DialogDescription className="text-gray-400">
                        Create a dedicated space for your team to collaborate on specific projects.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-gray-200">Room Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Q4 Marketing Campaign"
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
                                placeholder="Briefly describe the purpose of this room..."
                                className="bg-black/20 border-white/10 focus:border-indigo-500 text-white placeholder:text-gray-500 resize-none h-24"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => setOpen(false)} className="text-gray-400 hover:text-white hover:bg-white/10">
                            Cancel
                        </Button>
                        <Button type="submit" variant="premium">Create Room</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
