"use client"


import dynamic from 'next/dynamic';

const MarkdownContent = dynamic(() => import('./binary.mdx').then((mod) => mod.default), {
    // ssr: false,
});


const page = () => {
    return (
        // remove nested `prose` — outer layout article already provides typography
        <div className="max-w-none">
            <MarkdownContent />
        </div>
    )
}

export default page