'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Code2 } from 'lucide-react'
import { motion } from "motion/react"
import { cn } from '@/lib/utils'
import {
    Navbar as ResizableNavbar,
    NavBody,
    MobileNav,
    MobileNavHeader,
    MobileNavMenu,
    MobileNavToggle,
} from '@/components/ui/resizable-navbar'
// import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from './ui/button'

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [hovered, setHovered] = useState<number | null>(null)

    const navItems = [
        { name: 'Home', link: '/' },
        { name: 'Number Converter', link: '/numbers-convertor' },
        { name: 'Serialization', link: '/serialization' },
        { name: 'Language', link: '/language' },
        { name: "AST", link: '/ast' },
        { name: "About", link: '/about' },
    ]

    const handleMobileMenuClose = () => {
        setMobileMenuOpen(false)
    }

    return (
        <ResizableNavbar>
            {/* Desktop Nav */}
            <NavBody>
                <Link href="/" className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black dark:text-white">
                    <Code2 className="w-6 h-6" />
                    <span className="font-medium text-black dark:text-white">CodeMorph</span>
                </Link>

                <motion.div
                    onMouseLeave={() => setHovered(null)}
                    className={cn(
                        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2 pointer-events-none"
                    )}
                >
                    {navItems.map((item, idx) => (
                        <Link
                            key={`link-${idx}`}
                            href={item.link}
                            onMouseEnter={() => setHovered(idx)}
                            onClick={handleMobileMenuClose}
                            className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300 pointer-events-auto"
                        >
                            {hovered === idx && (
                                <motion.div
                                    layoutId="hovered"
                                    className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
                                />
                            )}
                            <span className="relative z-20">{item.name}</span>
                        </Link>
                    ))}
                </motion.div>

                <div className="relative z-20 ml-auto flex items-center gap-2">
                    <Link href='https://github.com/KamrAnDarmAn'>
                        <Button variant='secondary' className='hover:cursor-pointer'>
                            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                <path d="M12 .297a12 12 0 00-3.797 23.398c.6.111.82-.261.82-.579 0-.286-.011-1.042-.016-2.045-3.338.726-4.042-1.613-4.042-1.613-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.494.997.108-.775.418-1.304.76-1.604-2.665-.303-5.467-1.333-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 016.003 0c2.292-1.552 3.298-1.23 3.298-1.23.655 1.653.243 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.625-5.479 5.921.43.37.814 1.096.814 2.21 0 1.596-.015 2.882-.015 3.276 0 .321.218.694.825.576A12 12 0 0012 .297" />
                            </svg>
                        </Button>
                    </Link>
                    {/* </NavbarButton> */}
                </div>
            </NavBody>

            {/* Mobile Nav */}
            <MobileNav>

                <MobileNavHeader>
                    <Link href="/" className="relative z-20 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black dark:text-white">
                        <Code2 className="w-6 h-6" />
                        <span className="font-medium text-black dark:text-white ">CodeMorph</span>
                    </Link>
                    <MobileNavToggle
                        isOpen={mobileMenuOpen}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        onToggle={() => setMobileMenuOpen(prev => !prev)}
                    />
                </MobileNavHeader>

                <MobileNavMenu isOpen={mobileMenuOpen} onClose={handleMobileMenuClose}>
                    {navItems.map((item, idx) => (
                        <Link
                            key={`mobile-link-${idx}`}
                            href={item.link}
                            onClick={handleMobileMenuClose}
                            className="text-base font-medium text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100"
                        >
                            {item.name}
                        </Link>

                    ))}

                </MobileNavMenu>
            </MobileNav>

        </ResizableNavbar>
    )
}

export default Navbar