"use client";

import { BackgroundBeams } from "./ui/background-beams";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";


export function Hero() {
    return (
        <div className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
            <div className="max-w-2xl mx-auto p-4">
                <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
                    CodeMorph
                </h1>
                <p></p>
                <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
                    Welcome to CodeMorph, your ultimate code conversion tool! Effortlessly transform code snippets between various programming languages and formats with just a few clicks. Whether you're a developer looking to adapt code for different environments or a learner exploring new languages, CodeMorph simplifies the process, saving you time and enhancing your coding experience.
                </p>

                {/* Links */}
                <div className="flex justify-center gap-7 items-center mt-4 space-x-5 relative z-10">
                    {/* <AnimatedTooltip items={[{ id: 1, name: "KamrAn DarmAn", designation: "Creator", image: '/kamran.JPEG' }]} /> */}
                    <Link href="https://github.com/KamrAnDarmAn">
                        <Github />
                    </Link>
                    <Link href="https://www.linkedin.com/in/kamran-darman/">
                        <Linkedin />
                    </Link>
                </div>
            </div>
            <BackgroundBeams />
        </div>
    );
}
