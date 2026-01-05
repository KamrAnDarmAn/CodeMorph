"use client"
import React from 'react'
import { motion } from 'motion/react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Users, Target, Heart, Code, BookOpen, Zap, Globe } from 'lucide-react'
import Link from 'next/link'

const About = () => {
    const stats = [
        { icon: <Code className="h-6 w-6" />, label: "Formats Supported", value: "6+" },
        { icon: <Users className="h-6 w-6" />, label: "Contributors", value: "Growing" },
        { icon: <BookOpen className="h-6 w-6" />, label: "Conversions", value: "Real-time" },
        { icon: <Zap className="h-6 w-6" />, label: "Performance", value: "Instant" },
    ]

    const features = [
        {
            icon: <Clock className="h-8 w-8 text-gray-500" />,
            title: "Multi-Format Support",
            description: "Convert seamlessly between JSON, XML, YAML, TOML, CSV, and TOON formats with instant validation and error handling."
        },
        {
            icon: <Target className="h-8 w-8 text-green-500" />,
            title: "Real-time Conversion",
            description: "Watch your data transform instantly as you type with live preview and syntax highlighting for all supported formats."
        },
        {
            icon: <Heart className="h-8 w-8 text-red-500" />,
            title: "Developer Friendly",
            description: "Built with developers in mind. Copy conversions with one click, beautiful code editor, and comprehensive error messages."
        },
        {
            icon: <Globe className="h-8 w-8 text-purple-500" />,
            title: "Open Source",
            description: "Free, open-source platform designed for code transformation and analysis across multiple data formats."
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="container mx-auto px-4 py-16"
            >
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-4xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold"
                    >
                        About CodeMorph
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed"
                    >
                        An open-source platform designed to
                        <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600"> transform and analyze code </span>
                        across multiple programming languages and data formats.
                    </motion.p>
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                        >
                            <Card className="text-center p-6 hover:shadow-lg transition-shadow border-neutral-200 dark:border-neutral-800">
                                <CardContent className="p-0">
                                    <div className="flex justify-center mb-3 text-gray-500">
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                                        {stat.label}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Mission Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    className="mb-16"
                >
                    <Card className="border-neutral-200 dark:border-neutral-800">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl mb-4">Our Mission</CardTitle>
                            <CardDescription className="text-lg">
                                Simplify code transformation and data format conversion for developers worldwide
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="prose prose-neutral dark:prose-invert max-w-none">
                                <p className="text-lg leading-relaxed">
                                    CodeMorph was created to solve a common problem developers face: converting data between different formats
                                    and transforming code across programming languages. We believe this task should be effortless and intuitive.
                                </p>
                                <p className="text-lg leading-relaxed">
                                    Our platform provides a suite of tools that enable developers to manipulate, analyze, and visualize code
                                    in various programming languages. Whether you're working with <strong className="text-gray-600 dark:text-gray-400">JSON, XML, YAML, or any other format</strong>,
                                    CodeMorph makes the transformation process smooth and error-free.
                                </p>
                                <p className="text-lg leading-relaxed">
                                    We're committed to building an <em>open-source community</em> that welcomes contributions from developers
                                    around the world, continuously improving our tools and expanding support for more formats and languages.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Features Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-bold text-center mb-12 text-neutral-900 dark:text-neutral-100">
                        Why Choose CodeMorph?
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                            >
                                <Card className="h-full hover:shadow-lg transition-shadow border-neutral-200 dark:border-neutral-800">
                                    <CardContent className="p-6">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex-shrink-0">
                                                {feature.icon}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-neutral-100">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.6 }}
                    className="text-center"
                >
                    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 border-gray-200 dark:border-gray-800">
                        <CardContent className="p-8">
                            <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
                                Ready to Transform Your Code?
                            </h2>
                            <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6">
                                Join our community of developers working to make code transformation accessible and effortless for everyone.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/">
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                                        Explore Tools
                                    </Button>
                                </Link>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50"
                                    onClick={() => window.open('https://github.com/KamrAnDarmAn/CodeMorph', '_blank')}
                                >
                                    Contribute on GitHub
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default About
