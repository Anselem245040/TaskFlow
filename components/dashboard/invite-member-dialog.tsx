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
import { UserPlus, Copy, Check, Mail } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function InviteMemberDialog() {
    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState("")
    const [copied, setCopied] = useState(false)

    const inviteLink = "https://taskflow.app/invite/abc-123-def"

    const handleCopy = () => {
        navigator.clipboard.writeText(inviteLink)
        setCopied(true)
        toast.success("Invite link copied to clipboard")
        setTimeout(() => setCopied(false), 2000)
    }

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault()
        toast.success(`Invitation sent to ${email}`)
        setEmail("")
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 border-white/10 hover:bg-white/5 text-gray-200">
                    <UserPlus className="h-4 w-4" />
                    Invite Member
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#1a1b26] border-white/10 text-white">
                <DialogHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                            <UserPlus className="h-5 w-5 text-indigo-400" />
                        </div>
                        <DialogTitle>Invite People</DialogTitle>
                    </div>
                    <DialogDescription className="text-gray-400">
                        Invite team members to your workspace via email or share a link.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <form onSubmit={handleInvite} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-gray-200">Email Address</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="email"
                                    placeholder="colleague@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-black/20 border-white/10 focus:border-indigo-500 text-white placeholder:text-gray-500"
                                    required
                                />
                                <Button type="submit" variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-0">
                                    <Mail className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-[#1a1b26] px-2 text-gray-400">Or share link</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-gray-200">Invite Link</Label>
                        <div className="flex gap-2">
                            <div className="flex-1 rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm text-gray-400 truncate">
                                {inviteLink}
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={handleCopy}
                                className="bg-white/5 border-white/10 hover:bg-white/10 text-white"
                            >
                                {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
