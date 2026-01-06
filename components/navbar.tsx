'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Code2, Github } from 'lucide-react'
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
        { name: 'Serialization', link: '/serializtion' },
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
                        <Button variant='secondary' className='hover:cursor-pointer'><Github /></Button>
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