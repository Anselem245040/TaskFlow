"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    PlusCircle,
    Users,
    FolderKanban,
    CheckCircle2,
    Activity,
    Plus,
    UserPlus,
    ArrowUpRight
} from "lucide-react"
import { OverviewChart } from "@/components/dashboard/overview-chart"
import { InviteMemberDialog } from "@/components/dashboard/invite-member-dialog"

export default function OwnerDashboard() {
    return (
        <div className="space-y-10 animate-fade-in-up pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1.5">
                    <h1 className="text-4xl font-black tracking-tight text-white leading-none">Command Center</h1>
                    <p className="text-gray-500 font-bold text-xs uppercase tracking-[0.2em] italic">Workspace Control Panel</p>
                </div>
                <div className="flex items-center gap-3">
                    <InviteMemberDialog />
                    <Button variant="premium" className="gap-2 h-11 px-6 rounded-2xl shadow-xl shadow-indigo-600/20">
                        <Plus className="h-4 w-4" />
                        Init New Room
                    </Button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <DashboardStatCard
                    label="Total Force"
                    value="12"
                    icon={<Users className="h-5 w-5" />}
                    sub="+2 new recruits"
                    color="text-blue-400"
                />
                <DashboardStatCard
                    label="Active Shards"
                    value="5"
                    icon={<FolderKanban className="h-5 w-5" />}
                    sub="3 productionized"
                    color="text-violet-400"
                />
                <DashboardStatCard
                    label="Completion Flux"
                    value="149"
                    icon={<CheckCircle2 className="h-5 w-5" />}
                    sub="+12% velocity"
                    color="text-emerald-400"
                />
                <DashboardStatCard
                    label="Network Rate"
                    value="93%"
                    icon={<Activity className="h-5 w-5" />}
                    sub="+4% uptrend"
                    color="text-orange-400"
                />
            </div>

            <div className="grid gap-8 lg:grid-cols-7">
                <Card className="lg:col-span-4 glass border-white/5 bg-[#161726]/40 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-600 via-indigo-600 to-transparent opacity-50" />
                    <CardHeader className="pb-8">
                        <CardTitle className="text-base font-black text-gray-100 uppercase tracking-widest flex items-center gap-3">
                            <Activity className="h-4 w-4 text-violet-400" />
                            Activity Flux
                        </CardTitle>
                        <CardDescription className="text-[10px] font-bold text-gray-600 uppercase tracking-tight">
                            Weekly synchronization metrics across all rooms
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <OverviewChart />
                    </CardContent>
                </Card>

                <div className="lg:col-span-3 space-y-6">
                    <Card className="glass border-white/5 bg-[#161726]/40 shadow-2xl">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-sm font-black text-gray-100 uppercase tracking-widest">Recent Events</CardTitle>
                        </CardHeader>
                        <CardContent className="px-0">
                            <div className="space-y-1">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 hover:bg-white/[0.03] transition-colors border-b border-white/[0.02] last:border-0 group">
                                        <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-violet-500/30 transition-colors shrink-0">
                                            <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px] shadow-indigo-500" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-gray-200 truncate">Task Shard Created</p>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight truncate">Sarah in Website Redesign</p>
                                        </div>
                                        <div className="text-[9px] font-black text-gray-700 uppercase italic">2h Ago</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass border-dashed border-white/10 bg-transparent flex flex-col justify-center items-center p-8 text-center space-y-4">
                        <div className="h-14 w-14 rounded-full bg-violet-600/10 flex items-center justify-center border border-violet-600/20">
                            <UserPlus className="h-6 w-6 text-violet-400" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-black text-white uppercase tracking-wider">Expand Territory</p>
                            <p className="text-[10px] text-gray-500 font-bold max-w-[170px] leading-tight">Your current tier allows for 8 more specialized members.</p>
                        </div>
                        <Button variant="outline" size="sm" className="w-full glass border-white/10 h-10 font-black text-[9px] uppercase tracking-[0.2em] hover:bg-white/5">
                            Acquire Licenses
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function DashboardStatCard({ label, value, icon, sub, color }: any) {
    return (
        <Card className="glass border-white/5 bg-[#161726]/40 hover:bg-white/[0.05] transition-all group shadow-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 group-hover:text-gray-400 transition-colors">
                    {label}
                </CardTitle>
                <div className={`${color} opacity-40 group-hover:opacity-80 transition-opacity`}>{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-black text-gray-100 mb-1">{value}</div>
                <p className="text-[10px] font-bold text-gray-600 uppercase italic tracking-tight">{sub}</p>
            </CardContent>
        </Card>
    )
}
