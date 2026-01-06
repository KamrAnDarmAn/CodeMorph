'use client'



import { useState, useMemo } from 'react'
import Editor from '@monaco-editor/react'
import { useTheme } from 'next-themes'
import { Code2, Copy, Check, AlertCircle } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { parse } from '@babel/parser'




const SerializationConverter = () => {
    const { theme } = useTheme()
    const [inputValue, setInputValue] = useState('')
    const [copied, setCopied] = useState(false)

    const conversion = useMemo(() => {
        if (!inputValue.trim()) {
            return { result: '', error: false, errorMessage: '' }
        }
        let parsedData: any

        try {
            // to ast
            parsedData = parse(inputValue, { sourceType: 'module', plugins: ['jsx', 'typescript'] })
        } catch (e: any) {
            return {
                result: '',
                error: true,
                errorMessage: e.message || 'Failed to parse input',
            }
        }

        // Then, convert the AST to the target format
        const convertedData = JSON.stringify(parsedData, null, 2)

        return {
            result: convertedData,
            error: false,
            errorMessage: '',
        }

    }, [inputValue])

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }




    const editorTheme = theme === 'dark' || 'system' ? 'vs-dark' : 'light'

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Code2 className="w-8 h-8 text-primary" />
                        <h1 className="text-4xl font-bold text-foreground">
                            AST Converter
                        </h1>
                    </div>
                    <p className="text-muted-foreground text-lg">
                        Convert code snippets into their Abstract Syntax Tree (AST) representation with ease.
                    </p>
                </div>

                {/* Input Section */}
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="input-value">Enter Data</Label>
                                <div className="border rounded-md overflow-hidden">
                                    <Editor
                                        height="300px"
                                        language={'javascript'}
                                        value={inputValue}
                                        onChange={(value) => setInputValue(value || '')}
                                        theme={editorTheme}
                                        options={{
                                            minimap: { enabled: false },
                                            fontSize: 14,
                                            scrollBeyondLastLine: false,
                                            wordWrap: 'on',
                                            automaticLayout: true,
                                            padding: { top: 12, bottom: 12 },
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Result Section */}
                <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-muted-foreground">
                                        {conversion.result && !conversion.error}
                                    </span>
                                </div>
                                {conversion.result && !conversion.error && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleCopy(conversion.result)}
                                        title="Copy to clipboard"
                                        className="shrink-0"
                                    >
                                        {copied ? (
                                            <Check className="w-5 h-5 text-primary" />
                                        ) : (
                                            <Copy className="w-5 h-5 text-muted-foreground" />
                                        )}
                                    </Button>
                                )}
                            </div>
                            {conversion.error ? (
                                <div className="flex items-start gap-2 text-destructive text-sm bg-destructive/10 p-3 rounded-md">
                                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                    <div>
                                        <div className="font-medium mb-1">Error</div>
                                        <div className="text-xs">{conversion.errorMessage || 'Invalid input'}</div>
                                    </div>
                                </div>
                            ) : conversion.result ? (
                                <div className="border rounded-md overflow-hidden">
                                    <Editor
                                        height="900px"
                                        language={'json'}
                                        value={conversion.result}
                                        onChange={() => { }}
                                        theme={editorTheme}
                                        options={{
                                            minimap: { enabled: false },
                                            fontSize: 14,
                                            scrollBeyondLastLine: false,
                                            wordWrap: 'on',
                                            automaticLayout: true,
                                            padding: { top: 12, bottom: 12 },
                                            readOnly: true,
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="text-muted-foreground text-sm italic text-center py-20">
                                    Enter data to see conversion
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Info Section */}
                <Card className="mt-8 bg-muted/50">
                    <CardHeader>
                        <CardTitle>How to use</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                            <li>Paste your data in the input editor.</li>
                            <li>The tool will automatically parse and convert the data to an AST representation.</li>
                            <li>Copy the converted AST from the result editor.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default SerializationConverter

