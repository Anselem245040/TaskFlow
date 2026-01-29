"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/app/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    LayoutDashboard,
    Settings,
    Users,
    FolderKanban,
    LogOut,
    PlusCircle,
    User,
    UserCog,
    CheckCircle2
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname()

    const isOwner = pathname?.startsWith("/owner")

    const ownerNavItems = [
        {
            label: "Overview",
            href: "/owner",
            icon: LayoutDashboard,
        },
        {
            label: "Rooms",
            href: "/owner/rooms",
            icon: FolderKanban,
        },
        {
            label: "Members",
            href: "/owner/members",
            icon: Users,
        },
        {
            label: "Tasks",
            href: "/owner/tasks",
            icon: CheckCircle2,
        },
        {
            label: "Settings",
            href: "/owner/settings",
            icon: Settings,
        },
    ]

    const memberNavItems = [
        {
            label: "Overview",
            href: "/member",
            icon: LayoutDashboard,
        },
        {
            label: "My Tasks",
            href: "/member/tasks",
            icon: FolderKanban,
        },
        {
            label: "Rooms",
            href: "/member/rooms",
            icon: FolderKanban,
        },
        {
            label: "Settings",
            href: "/member/settings",
            icon: Settings,
        },
    ]

    const navItems = isOwner ? ownerNavItems : memberNavItems

    return (
        <div className={cn("pb-12 min-h-screen border-r border-white/10 bg-black/40 backdrop-blur-xl w-64 hidden md:block fixed left-0 top-0 h-full z-40", className)}>
            <div className="space-y-4 py-4">
                <div className="px-3 py-2">
                    <Link href={isOwner ? "/owner" : "/member"} className="flex items-center gap-2 px-4 mb-8">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/20">
                            <Command className="h-4 w-4" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            TaskFlow
                        </span>
                    </Link>
                    <div className="space-y-1">
                        <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-gray-400">
                            Menu
                        </h2>
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href}>
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "w-full justify-start gap-2",
                                        pathname === item.href || pathname?.startsWith(item.href)
                                            ? "bg-white/10 text-white"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-gray-400">
                        Workspaces
                    </h2>
                    <div className="space-y-1">
                        <Button variant="ghost" className="w-full justify-start gap-2 text-gray-400 hover:text-white hover:bg-white/5">
                            <div className="h-4 w-4 rounded-full bg-blue-500/20 border border-blue-500/50" />
                            Acme Corp
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-2 text-gray-400 hover:text-white hover:bg-white/5">
                            <PlusCircle className="h-4 w-4" />
                            Create New
                        </Button>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-4 px-3 w-full">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 text-gray-400 hover:text-white hover:bg-white/5 h-auto py-2"
                        >
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="" alt="User" />
                                <AvatarFallback className="text-sm">JD</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start flex-1 min-w-0">
                                <span className="text-sm font-medium text-white truncate w-full">John Doe</span>
                                <span className="text-xs text-gray-500 truncate w-full">john@example.com</span>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-56"
                        align="end"
                        side="top"
                        sideOffset={8}
                    >
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={isOwner ? "/owner/settings" : "/member/settings"} className="cursor-pointer">
                                <UserCog className="mr-2 h-4 w-4" />
                                <span>Profile Settings</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-400 focus:text-red-300 focus:bg-red-500/10 cursor-pointer">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Sign Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
