import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Layout, Users, Zap } from "lucide-react";
import { Command } from "lucide-react";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f0c29] text-foreground overflow-hidden selection:bg-violet-500/30">
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-700/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-700/20 blur-[120px]" />
      </div>

      <Navbar />

      <main className="relative z-10 flex flex-col items-center justify-center pt-32 pb-20 px-6 mt-10">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            <span className="text-sm font-medium text-zinc-300">v1.0 is now live</span>
          </div>

          <h1 className="text-gradient text-5xl md:text-7xl font-bold tracking-tight mb-8 drop-shadow-2xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Manage your workspace <br />
            with <span className="text-gradient font-extrabold">TaskFlow</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            The premium platform for modern teams. Streamline collaboration, organize tasks, and boost productivity with a workspace designed for excellence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
            <Link href="/sign-up">
              <Button size="lg" className="h-12 px-8 text-base bg-white text-black hover:bg-zinc-200 rounded-full transition-all hover:scale-105">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/features">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-full backdrop-blur-sm transition-all hover:scale-105">
                View Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32 w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Layout className="h-8 w-8 text-violet-400" />}
              title="Workspace Management"
              description="Create and organize multiple workspaces with dedicated rooms for different teams."
              delay="0.5s"
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-indigo-400" />}
              title="Team Collaboration"
              description="Invite members seamlessly and foster real-time collaboration within your organization."
              delay="0.6s"
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-purple-400" />}
              title="Task Assignment"
              description="Efficiently assign, track, and complete tasks to keep projects moving forward."
              delay="0.7s"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-black/20 backdrop-blur-xl mt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/20 transition-transform group-hover:scale-105">
                  <Command className="h-4 w-4" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                  TaskFlow
                </span>
              </Link>
            </div>
            <div className="flex items-center gap-8 text-sm text-zinc-500">
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
              <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
            </div>
            <div className="text-sm text-zinc-600">
              © 2024 TaskFlow. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: string }) {
  return (
    <div className="glass glass-hover p-8 rounded-2xl animate-fade-in-up" style={{ animationDelay: delay }}>
      <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-zinc-400 leading-relaxed">
        {description}
      </p>
    </div>
  )
}
