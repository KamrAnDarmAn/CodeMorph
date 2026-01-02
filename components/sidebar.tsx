'use client'
import { ArrowBigDown, ArrowDown, ArrowDown01, ArrowDown01Icon, ArrowDown10, ArrowDownIcon, Calendar, Eye, EyeIcon, Home, Inbox, Search, Settings, Watch } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarInput,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import themeConfig from "@/theme.config"
import { useState, useMemo } from "react"
import { Arrow } from "@radix-ui/react-select"
import { IconEyeBolt } from "@tabler/icons-react"

export default function AppSidebar() {
    const pathname = usePathname() || "/"
    const groups = (themeConfig.sidebar?.["/"] ?? []) as {
        title: string
        items: { title: string; link: string }[]
    }[]

    const [query, setQuery] = useState("")
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
        () => Object.fromEntries(groups.map((g) => [g.title, true]))
    )

    const filtered = useMemo(() => {
        if (!query) return groups
        const q = query.toLowerCase()
        return groups
            .map((g) => ({
                ...g,
                items: g.items.filter((i) => i.title.toLowerCase().includes(q)),
            }))
            .filter((g) => g.items.length > 0)
    }, [groups, query])

    return (
        <Sidebar>
            <SidebarHeader className="pt-6 px-3">
                <div className="flex items-center justify-between">
                    <span className="font-semibold">Docs</span>
                </div>
                <div className="mt-2">
                    <SidebarInput
                        placeholder="Search docs..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </SidebarHeader>
            <SidebarContent>
                {filtered.map((group) => {
                    const isOpen = openGroups[group.title]
                    return (
                        <SidebarGroup key={group.title}>
                            <div className="flex items-center justify-between">
                                <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                                <button
                                    aria-expanded={isOpen}
                                    onClick={() =>
                                        setOpenGroups((s) => ({ ...s, [group.title]: !s[group.title] }))
                                    }
                                    className="mx-2 text-xs text-sidebar-foreground/60 hover:text-sidebar-accent"
                                >
                                    {isOpen ? "Collapse" : "Expand"}
                                </button>
                            </div>

                            {isOpen && (
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {group.items.map((item) => {
                                            const active = pathname === item.link || pathname.startsWith(item.link + "/")
                                            return (
                                                <SidebarMenuItem key={item.link}>
                                                    <Link href={item.link} className="block">
                                                        <SidebarMenuButton asChild isActive={active} className="ml-1">
                                                            <p>{item.title} </p>
                                                        </SidebarMenuButton>
                                                    </Link>
                                                </SidebarMenuItem>
                                            )
                                        })}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            )}
                        </SidebarGroup>
                    )
                })}
            </SidebarContent>
        </Sidebar>
    )
}