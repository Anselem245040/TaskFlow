"use client"

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
    Bell,
    Lock,
    User,
    Palette,
    Globe,
    Save
} from "lucide-react"

export default function OwnerSettingsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
                <p className="text-gray-400 mt-2">Manage your workspace settings and preferences.</p>
            </div>

            <div className="grid gap-6">
                {/* Workspace Settings */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Globe className="h-5 w-5 text-indigo-400" />
                            <CardTitle>Workspace Settings</CardTitle>
                        </div>
                        <CardDescription>
                            Configure your workspace name and details.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="workspace-name">Workspace Name</Label>
                            <Input id="workspace-name" defaultValue="Acme Corp" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="workspace-description">Description</Label>
                            <Input id="workspace-description" defaultValue="Our main workspace for all projects" />
                        </div>
                        <Button variant="destructive" className="gap-2">
                            <Save className="h-4 w-4" />
                            Save Changes
                        </Button>
                    </CardContent>
                </Card>

                {/* Profile Settings */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <User className="h-5 w-5 text-indigo-400" />
                            <CardTitle>Profile Settings</CardTitle>
                        </div>
                        <CardDescription>
                            Update your personal information.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" defaultValue="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" defaultValue="john@example.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Input id="role" defaultValue="Workspace Owner" disabled />
                        </div>
                        <Button variant="default" className="gap-2">
                            <Save className="h-4 w-4" />
                            Update Profile
                        </Button>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Bell className="h-5 w-5 text-indigo-400" />
                            <CardTitle>Notifications</CardTitle>
                        </div>
                        <CardDescription>
                            Manage how you receive notifications.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-white">Email Notifications</p>
                                <p className="text-sm text-gray-400">Receive email updates about your workspace</p>
                            </div>
                            <Button variant="outline" size="sm">Enable</Button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-white">Task Assignments</p>
                                <p className="text-sm text-gray-400">Get notified when tasks are assigned</p>
                            </div>
                            <Button variant="outline" size="sm">Enable</Button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-white">Member Activity</p>
                                <p className="text-sm text-gray-400">Updates about member actions</p>
                            </div>
                            <Button variant="outline" size="sm">Disable</Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Security */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Lock className="h-5 w-5 text-indigo-400" />
                            <CardTitle>Security</CardTitle>
                        </div>
                        <CardDescription>
                            Manage your account security settings.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="current-password">Current Password</Label>
                            <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-password">New Password</Label>
                            <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input id="confirm-password" type="password" />
                        </div>
                        <Button variant="default" className="gap-2">
                            <Lock className="h-4 w-4" />
                            Change Password
                        </Button>
                    </CardContent>
                </Card>

                {/* Appearance */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Palette className="h-5 w-5 text-indigo-400" />
                            <CardTitle>Appearance</CardTitle>
                        </div>
                        <CardDescription>
                            Customize how TaskFlow looks for you.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-white">Theme</p>
                                <p className="text-sm text-gray-400">Currently using dark mode</p>
                            </div>
                            <Button variant="outline" size="sm">Change Theme</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
