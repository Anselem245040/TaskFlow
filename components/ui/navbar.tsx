"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { href: "/features", label: "Features" },
        { href: "/pricing", label: "Pricing" },
        { href: "/about", label: "About" },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-black/20 backdrop-blur-xl">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/20 transition-transform group-hover:scale-105">
                        <Command className="h-4 w-4" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        TaskFlow
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-white",
                                    pathname === link.href ? "text-white" : "text-zinc-400"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-4 pl-6 border-l border-white/10">
                        <Link href="/auth/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                            Sign In
                        </Link>
                        <Link href="/auth/signup">
                            <Button size="sm" className="bg-white text-black hover:bg-zinc-200">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-zinc-400 hover:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-[#0f0c29]/95 backdrop-blur-3xl border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-base font-medium text-zinc-400 hover:text-white py-2"
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="h-px bg-white/10 my-2" />
                    <Link href="/auth/login" onClick={() => setIsOpen(false)} className="text-base font-medium text-zinc-400 hover:text-white py-2">
                        Sign In
                    </Link>
                    <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-white text-black hover:bg-zinc-200">
                            Get Started
                        </Button>
                    </Link>
                </div>
            )}
        </nav>
    );
}
