import React from 'react';
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header({ scrollToSection, onLoginClick }) {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-whiteflex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md">
            <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold">
                    Fractal X
                </Link>
                <nav className="hidden md:flex space-x-4">
                    <Button variant="ghost" onClick={() => scrollToSection('features')}>Features</Button>
                    <Button variant="ghost" onClick={() => scrollToSection('how-it-works')}>How It Works</Button>
                    <Button variant="ghost" onClick={() => scrollToSection('pricing')}>Pricing</Button>
                    <Link href="/documentation">
                        <Button variant="ghost">Documentation</Button>
                    </Link>
                    <Button onClick={onLoginClick}>Login</Button>

                </nav>
                <Button className="md:hidden" variant="outline" onClick={onLoginClick}>
                    Login
                </Button>
            </div>
        </header>
    )
}
