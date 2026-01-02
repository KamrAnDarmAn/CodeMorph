import RightSidebar from '@/components/right-sidebar'
import AppSidebar from '@/components/sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Sidebar } from 'lucide-react'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger >
                <Sidebar />
            </SidebarTrigger>
            <main className="mx-auto max-w-4xl px-6 py-8">
                <article className="prose prose-slate dark:prose-invert max-w-none">
                    {children}
                </article>
            </main>
            <RightSidebar />
        </SidebarProvider>
    )
}

export default layout