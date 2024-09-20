import React from 'react';
import Link from 'next/link';
import { Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = ({ scrollToSection }) => {
    return (
        <header className="px-4 lg:px-6 h-16 flex items-center fixed top-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
            <Link className="flex items-center justify-center space-x-2" href="/">
                <Code className="h-6 w-6 text-primary" />
                <span className="font-semibold text-lg">Fractal X</span>
            </Link>
            <nav className="ml-auto flex gap-4 sm:gap-6">
                <Button variant="ghost" onClick={() => scrollToSection('features')}>
                    Features
                </Button>
                <Button variant="ghost" onClick={() => scrollToSection('how-it-works')}>
                    How It Works
                </Button>
                <Button variant="ghost" onClick={() => scrollToSection('pricing')}>
                    Pricing
                </Button>
                <Link href="/documentation">
                    <Button variant="ghost">Documentation</Button>
                </Link>
            </nav>
        </header>
    );
};

export default Header;
