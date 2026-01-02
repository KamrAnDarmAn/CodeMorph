import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'

interface NotImplementedProps {
    title: string;
    description: string;
}
const NotImplemented = ({ title, description }: NotImplementedProps) => {
    return (
        <Card className='my-4 bg-red-100 dark:bg-red-900 ' >
            <CardHeader>

                <h2 className="text-2xl font-bold ">{title}</h2>
            </CardHeader>
            <CardContent>

                <p className="mb-4">
                    {description}
                </p>
            </CardContent>
        </Card >
    )
}

export default NotImplemented