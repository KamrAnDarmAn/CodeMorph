'use client'

import React, { useState, useMemo } from 'react'
import { Calculator, Copy, Check } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const bases = [
    { value: 2, label: 'Binary (2)', prefix: '0b' },
    { value: 8, label: 'Octal (8)', prefix: '0o' },
    { value: 10, label: 'Decimal (10)', prefix: '' },
    { value: 16, label: 'Hexadecimal (16)', prefix: '0x' },
]

const NumberConvertor = () => {
    const [inputValue, setInputValue] = useState('')
    const [fromBase, setFromBase] = useState(10)
    const [toBase, setToBase] = useState(16)
    const [copied, setCopied] = useState(false)

    const conversion = useMemo(() => {
        if (!inputValue.trim()) {
            return { result: '', error: false }
        }

        try {
            // Parse the input based on the selected base
            let decimalValue: number

            if (fromBase === 16) {
                // Handle hex input (with or without 0x prefix)
                const cleanInput = inputValue.replace(/^0x/i, '')
                decimalValue = parseInt(cleanInput, 16)
            } else if (fromBase === 8) {
                // Handle octal input (with or without 0o prefix)
                const cleanInput = inputValue.replace(/^0o/i, '')
                decimalValue = parseInt(cleanInput, 8)
            } else if (fromBase === 2) {
                // Handle binary input (with or without 0b prefix)
                const cleanInput = inputValue.replace(/^0b/i, '')
                decimalValue = parseInt(cleanInput, 2)
            } else {
                // Decimal input
                decimalValue = parseFloat(inputValue)
            }

            if (isNaN(decimalValue)) {
                throw new Error('Invalid number')
            }

            // Convert to the target base
            try {
                const targetBase = bases.find(b => b.value === toBase)
                if (!targetBase) {
                    throw new Error('Invalid target base')
                }

                let result: string

                if (toBase === 16) {
                    result = decimalValue.toString(16).toUpperCase()
                } else if (toBase === 8) {
                    result = Math.floor(decimalValue).toString(8)
                } else if (toBase === 2) {
                    result = Math.floor(decimalValue).toString(2)
                } else {
                    // Decimal - handle both integers and floats
                    result = decimalValue.toString()
                }

                return {
                    result: targetBase.prefix + result,
                    error: false
                }
            } catch {
                return {
                    result: '',
                    error: true
                }
            }
        } catch {
            return {
                result: '',
                error: true
            }
        }
    }, [inputValue, fromBase, toBase])

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const toBaseLabel = bases.find(b => b.value === toBase)?.label || 'Unknown'

    return (
        <div className="min-h-screen bg-background p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Calculator className="w-8 h-8 text-primary" />
                        <h1 className="text-4xl font-bold text-foreground">
                            Number Base Converter
                        </h1>
                    </div>
                    <p className="text-muted-foreground text-lg">
                        Convert numbers between binary, octal, decimal, and hexadecimal bases
                    </p>
                </div>

                {/* Input Section */}
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 space-y-2">
                                    <Label htmlFor="input-value">Enter Number</Label>
                                    <Input
                                        id="input-value"
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Enter a number..."
                                        className="h-11"
                                    />
                                </div>
                                <div className="sm:w-64 space-y-2">
                                    <Label htmlFor="from-base">From Base</Label>
                                    <Select value={fromBase.toString()} onValueChange={(value) => setFromBase(Number(value))}>
                                        <SelectTrigger id="from-base" className="w-full h-11">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {bases.map((base) => (
                                                <SelectItem key={base.value} value={base.value.toString()}>
                                                    {base.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="sm:w-64 space-y-2">
                                    <Label htmlFor="to-base">To Base</Label>
                                    <Select value={toBase.toString()} onValueChange={(value) => setToBase(Number(value))}>
                                        <SelectTrigger id="to-base" className="w-full h-11">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {bases.map((base) => (
                                                <SelectItem key={base.value} value={base.value.toString()}>
                                                    {base.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Result Section */}
                <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm font-medium text-muted-foreground">
                                        {toBaseLabel}
                                    </span>
                                </div>
                                {conversion.error || !conversion.result ? (
                                    <div className="text-destructive text-sm">
                                        {inputValue ? 'Invalid input' : 'Enter a number to see conversion'}
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <code className="text-2xl font-mono font-semibold text-foreground bg-muted px-4 py-2 rounded-md">
                                            {conversion.result}
                                        </code>
                                    </div>
                                )}
                            </div>
                            {conversion.result && !conversion.error && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleCopy(conversion.result)}
                                    title="Copy to clipboard"
                                >
                                    {copied ? (
                                        <Check className="w-5 h-5 text-primary" />
                                    ) : (
                                        <Copy className="w-5 h-5 text-muted-foreground" />
                                    )}
                                </Button>
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
                                <span>Enter a number in the input field</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>Select the &quot;From Base&quot; of your input number (Binary, Octal, Decimal, or Hexadecimal)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>Select the &quot;To Base&quot; you want to convert to</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>The tool will automatically convert from the selected base to the target base</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>Click the copy icon to copy the result to your clipboard</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default NumberConvertor