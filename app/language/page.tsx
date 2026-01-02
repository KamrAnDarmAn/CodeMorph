'use client'

import React, { useState } from 'react'
import Editor from '@monaco-editor/react'
import { useTheme } from 'next-themes'
import { Code2, Copy, Check, ArrowRight, Loader2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import NotImplemented from '@/components/not-implemented'


const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'c', label: 'C' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
]

const LanguageConverter = () => {
    const { theme } = useTheme()
    const [inputCode, setInputCode] = useState('')
    const [outputCode, setOutputCode] = useState('')
    const [fromLanguage, setFromLanguage] = useState('javascript')
    const [toLanguage, setToLanguage] = useState('typescript')
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)
    const [error, setError] = useState('')

    const editorTheme = theme === 'dark' || 'system' ? 'vs-dark' : 'light'

    const handleConvert = async () => {
        if (!inputCode.trim()) {
            setError('Please enter some code to convert')
            return
        }

        setLoading(true)
        setError('')
        setOutputCode('')

        try {
            const task = `Convert ${fromLanguage} code to ${toLanguage}. Preserve all logic, functionality, and structure.`

            const response = await fetch('/api/convert', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    input: inputCode,
                    task: task,
                }),
            })

            if (!response.ok) {
                throw new Error('Conversion failed')
            }

            const reader = response.body?.getReader()
            const decoder = new TextDecoder()
            let result = ''

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read()
                    if (done) break

                    const chunk = decoder.decode(value, { stream: true })
                    result += chunk
                    setOutputCode(result)
                }
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred during conversion')
            console.error('Conversion error:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(outputCode)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const getMonacoLanguage = (lang: string) => {
        const mapping: { [key: string]: string } = {
            'javascript': 'javascript',
            'typescript': 'typescript',
            'python': 'python',
            'java': 'java',
            'cpp': 'cpp',
            'c': 'c',
            'csharp': 'csharp',
            'go': 'go',
            'rust': 'rust',
            'php': 'php',
            'ruby': 'ruby',
            'swift': 'swift',
            'kotlin': 'kotlin',
        }
        return mapping[lang] || 'plaintext'
    }

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <NotImplemented title='Feature Coming Soon!' description='The language conversion feature is currently under development. Stay tuned for updates!' />
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Code2 className="w-8 h-8 text-primary" />
                        <h1 className="text-4xl font-bold text-foreground">
                            Language Converter
                        </h1>
                    </div>
                    <p className="text-muted-foreground text-lg">
                        Convert code between different programming languages using AI
                    </p>
                </div>

                {/* Language Selection */}
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="flex flex-col sm:flex-row gap-4 items-end">
                            <div className="space-y-2 flex-1">
                                <Label htmlFor="from-language">From Language</Label>
                                <Select value={fromLanguage} onValueChange={setFromLanguage}>
                                    <SelectTrigger id="from-language" className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {languages.map((lang) => (
                                            <SelectItem key={lang.value} value={lang.value}>
                                                {lang.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button
                                onClick={handleConvert}
                                disabled={loading || !inputCode.trim()}
                                className="gap-2"
                                size="lg"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Converting...
                                    </>
                                ) : (
                                    <>
                                        Convert
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </Button>

                            <div className="space-y-2 flex-1">
                                <Label htmlFor="to-language">To Language</Label>
                                <Select value={toLanguage} onValueChange={setToLanguage}>
                                    <SelectTrigger id="to-language" className="w-full">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {languages.map((lang) => (
                                            <SelectItem key={lang.value} value={lang.value}>
                                                {lang.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Editors Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Input Editor */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>Source Code ({languages.find(l => l.value === fromLanguage)?.label})</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="border rounded-md overflow-hidden">
                                <Editor
                                    height="500px"
                                    defaultLanguage={getMonacoLanguage(fromLanguage)}
                                    language={getMonacoLanguage(fromLanguage)}
                                    value={inputCode}
                                    onChange={(value) => setInputCode(value || '')}
                                    theme={editorTheme}
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 14,
                                        scrollBeyondLastLine: false,
                                        wordWrap: 'on',
                                        automaticLayout: true,
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Output Editor */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                <span>Converted Code ({languages.find(l => l.value === toLanguage)?.label})</span>
                                {outputCode && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={handleCopy}
                                        title="Copy to clipboard"
                                    >
                                        {copied ? (
                                            <Check className="w-5 h-5 text-primary" />
                                        ) : (
                                            <Copy className="w-5 h-5 text-muted-foreground" />
                                        )}
                                    </Button>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="border rounded-md overflow-hidden">
                                <Editor
                                    height="500px"
                                    defaultLanguage={getMonacoLanguage(toLanguage)}
                                    language={getMonacoLanguage(toLanguage)}
                                    value={outputCode}
                                    onChange={(value) => setOutputCode(value || '')}
                                    theme={editorTheme}
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 14,
                                        scrollBeyondLastLine: false,
                                        wordWrap: 'on',
                                        automaticLayout: true,
                                        readOnly: false,
                                    }}
                                />
                            </div>
                            {error && (
                                <div className="mt-4 p-3 bg-destructive/10 text-destructive text-sm rounded-md">
                                    {error}
                                </div>
                            )}
                            {!outputCode && !loading && !error && (
                                <div className="mt-4 text-muted-foreground text-sm italic text-center">
                                    Click Convert to see the converted code
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Info Section */}
                <Card className="mt-8 bg-muted/50">
                    <CardHeader>
                        <CardTitle>How to use</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <p>Select the source language of your code</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <p>Select the target language you want to convert to</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <p>Paste or type your code in the source editor</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <p>Click the Convert button to transform your code</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <p>The converted code will appear in the output editor</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <p>Use the copy button to copy the converted code to your clipboard</p>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default LanguageConverter