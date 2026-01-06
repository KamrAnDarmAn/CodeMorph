'use client'



import React, { useState, useMemo } from 'react'
import Editor from '@monaco-editor/react'
import { useTheme } from 'next-themes'
import { Code2, Copy, Check, AlertCircle } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { XMLParser, XMLBuilder } from 'fast-xml-parser'
import * as yaml from 'js-yaml'
import * as toml from '@iarna/toml'
import Papa from 'papaparse'
import { encode, decode } from '@toon-format/toon'


const formats = [
    { value: 'json', label: 'JSON', icon: '{}' },
    { value: 'xml', label: 'XML', icon: '</>' },
    { value: 'yaml', label: 'YAML', icon: '---' },
    { value: 'toml', label: 'TOML', icon: '=' },
    { value: 'csv', label: 'CSV', icon: ',' },
    { value: 'toon', label: 'TOON', icon: '█' },
]

const xmlParser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    textNodeName: '#text',
    parseAttributeValue: true,
    trimValues: true,
})

const xmlBuilder = new XMLBuilder({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    textNodeName: '#text',
    format: true,
    indentBy: '  ',
})

const SerializationConverter = () => {
    const { theme } = useTheme()
    const [inputValue, setInputValue] = useState('')
    const [fromFormat, setFromFormat] = useState('json')
    const [toFormat, setToFormat] = useState('xml')
    const [copied, setCopied] = useState(false)

    const conversion = useMemo(() => {
        if (!inputValue.trim()) {
            return { result: '', error: false, errorMessage: '' }
        }

        // If from and to are the same, just return the input
        if (fromFormat === toFormat) {
            return { result: inputValue, error: false, errorMessage: '' }
        }

        // First, parse the input based on the selected format
        let parsedData: any

        try {
            switch (fromFormat) {
                case 'json':
                    parsedData = JSON.parse(inputValue)
                    break
                case 'xml':
                    try {
                        parsedData = xmlParser.parse(inputValue)
                    } catch (e: any) {
                        throw new Error(`Invalid XML: ${e.message}`)
                    }
                    break
                case 'yaml':
                    try {
                        parsedData = yaml.load(inputValue)
                    } catch (e: any) {
                        throw new Error(`Invalid YAML: ${e.message}`)
                    }
                    break
                case 'toml':
                    try {
                        parsedData = toml.parse(inputValue)
                    } catch (e: any) {
                        throw new Error(`Invalid TOML: ${e.message}`)
                    }
                    break
                case 'csv':
                    try {
                        const result = Papa.parse(inputValue, {
                            header: true,
                            skipEmptyLines: true,
                            transformHeader: (header) => header.trim(),
                        })
                        parsedData = result.data
                    } catch (e: any) {
                        throw new Error(`Invalid CSV: ${e.message}`)
                    }
                    break
                case 'toon':
                    try {
                        parsedData = decode(inputValue)
                    } catch (e: any) {
                        throw new Error(`Invalid TOON: ${e.message}`)
                    }
                    break
                default:
                    throw new Error('Unknown input format')
            }
        } catch (e: any) {
            return {
                result: '',
                error: true,
                errorMessage: e.message || 'Failed to parse input',
            }
        }

        // Now convert to the target format
        try {
            let result: string = ''

            switch (toFormat) {
                case 'json':
                    result = JSON.stringify(parsedData, null, 2)
                    break
                case 'xml':
                    try {
                        result = xmlBuilder.build(parsedData)
                    } catch (e: any) {
                        throw new Error(`Cannot convert to XML: ${e.message}`)
                    }
                    break
                case 'yaml':
                    try {
                        result = yaml.dump(parsedData, {
                            indent: 2,
                            lineWidth: -1,
                            noRefs: true,
                        })
                    } catch (e: any) {
                        throw new Error(`Cannot convert to YAML: ${e.message}`)
                    }
                    break
                case 'toml':
                    try {
                        result = toml.stringify(parsedData)
                    } catch (e: any) {
                        throw new Error(`Cannot convert to TOML: ${e.message}`)
                    }
                    break
                case 'csv':
                    try {
                        if (Array.isArray(parsedData) && parsedData.length > 0) {
                            result = Papa.unparse(parsedData, {
                                header: true,
                            })
                        } else if (typeof parsedData === 'object' && parsedData !== null) {
                            // Convert object to array
                            result = Papa.unparse([parsedData], {
                                header: true,
                            })
                        } else {
                            throw new Error('Data must be an object or array to convert to CSV')
                        }
                    } catch (e: any) {
                        throw new Error(`Cannot convert to CSV: ${e.message}`)
                    }
                    break
                case 'toon':
                    try {
                        result = encode(parsedData)
                    } catch (e: any) {
                        throw new Error(`Cannot convert to TOON: ${e.message}`)
                    }
                    break
                default:
                    result = ''
            }

            return {
                result,
                error: false,
                errorMessage: '',
            }
        } catch (e: any) {
            return {
                result: '',
                error: true,
                errorMessage: e.message || 'Conversion failed',
            }
        }
    }, [inputValue, fromFormat, toFormat])

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const toFormatLabel = formats.find(f => f.value === toFormat)?.label || toFormat.toUpperCase()

    const getMonacoLanguage = (format: string) => {
        const mapping: { [key: string]: string } = {
            'json': 'json',
            'xml': 'xml',
            'yaml': 'yaml',
            'toml': 'plaintext',
            'csv': 'plaintext',
            'toon': 'toon',
        }
        return mapping[format] || 'plaintext'
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
                            Serialization Converter
                        </h1>
                    </div>
                    <p className="text-muted-foreground text-lg">
                        Convert between JSON, XML, YAML, TOML, and CSV formats
                    </p>
                </div>

                {/* Input Section */}
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="space-y-2 sm:w-64">
                                    <Label htmlFor="from-format">From Format</Label>
                                    <Select value={fromFormat} onValueChange={setFromFormat}>
                                        <SelectTrigger id="from-format" className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {formats.map((format) => (
                                                <SelectItem key={format.value} value={format.value}>
                                                    {format.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2 sm:w-64">
                                    <Label htmlFor="to-format">To Format</Label>
                                    <Select value={toFormat} onValueChange={setToFormat}>
                                        <SelectTrigger id="to-format" className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {formats.map((format) => (
                                                <SelectItem key={format.value} value={format.value}>
                                                    {format.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="input-value">Enter Data</Label>
                                <div className="border rounded-md overflow-hidden">
                                    <Editor
                                        height="300px"
                                        language={getMonacoLanguage(fromFormat)}
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
                                        {toFormatLabel}
                                    </span>
                                </div>
                                {conversion.result && !conversion.error && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleCopy(conversion.result)}
                                        title="Copy to clipboard"
                                        className="flex-shrink-0"
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
                                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <div className="font-medium mb-1">Error</div>
                                        <div className="text-xs">{conversion.errorMessage || 'Invalid input'}</div>
                                    </div>
                                </div>
                            ) : conversion.result ? (
                                <div className="border rounded-md overflow-hidden">
                                    <Editor
                                        height="300px"
                                        language={getMonacoLanguage(toFormat)}
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
                        <ul className="space-y-2 text-muted-foreground">
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <p>Select the &quot;From Format&quot; of your input data (JSON, XML, YAML, TOML, or CSV)</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <p>Select the &quot;To Format&quot; you want to convert to</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <p>Paste or type your data in the input field</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <p>The tool will automatically convert from the selected format to the target format</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <p>Click the copy icon to copy the result to your clipboard</p>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <p>Invalid data will show error messages to help you fix the input</p>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default SerializationConverter

