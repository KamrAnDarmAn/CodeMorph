"use client"

import { useEffect, useState } from "react"

type TocItem = { id: string; text: string; level: number }

export default function RightSidebar() {
    // table of contents
    const [toc, setToc] = useState<TocItem[]>([])
    const [active, setActive] = useState<string | null>(null)

    useEffect(() => {
        const update = () => {
            const nodes = Array.from(document.querySelectorAll("article h2, article h3")) as HTMLElement[]
            const items = nodes
                .map((n) => ({ id: n.id, text: n.innerText, level: n.tagName === "H2" ? 2 : 3 }))
                .filter((i) => i.id)
            setToc(items)
        }

        update()

        const observer = new MutationObserver(() => update())
        observer.observe(document.body, { childList: true, subtree: true })

        const headingObserver = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
                if (visible.length) setActive(visible[0].target.id)
            },
            { root: null, rootMargin: "0px 0px -60% 0px", threshold: [0, 0.1, 0.5, 1] }
        )

        const headings = Array.from(document.querySelectorAll("article h2[id], article h3[id]"))
        headings.forEach((h) => headingObserver.observe(h))

        return () => {
            observer.disconnect()
            headingObserver.disconnect()
        }
    }, [])

    if (!toc.length) return null

    return (
        <aside className="hidden xl:block w-64 shrink-0">
            <div className="sticky top-24 space-y-4">
                <div className="text-sm font-semibold text-muted-foreground">On this page</div>
                <nav className="text-sm">
                    <ol className="space-y-1">
                        {toc.map((item) => (
                            <li key={item.id} className={item.level === 3 ? "pl-4" : "pl-0"}>
                                <a
                                    href={`#${item.id}`}
                                    className={`block rounded-md px-2 py-1 hover:bg-accent/5 ${active === item.id ? "bg-accent/10 font-medium" : "text-muted-foreground"
                                        }`}
                                >
                                    {item.text}
                                </a>
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>
        </aside>
    )
}
