"use client"


import dynamic from 'next/dynamic';

const MarkdownContent = dynamic(() => import('./json.mdx').then((mod) => mod.default), {
    // ssr: false,
});


const page = () => {
    return (
        // this classes is to apply style on md file
        <div className="max-w-none">
            <MarkdownContent />
        </div>
    )
}

export default page