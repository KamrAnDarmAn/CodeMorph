
import { Card, CardContent, CardHeader } from '@/components/ui/card'


const About = () => {

    return (
        <Card className='md:mx-4'>
            <CardHeader>
                <h2 className="relative z-10 text-lg md:text-5xl  bg-clip-text text-transparent bg-linear-to-b from-neutral-200 to-neutral-600   font-sans font-bold">About CodeMorph</h2>
            </CardHeader>
            <CardContent>
                <p className="mb-4 w-full md:max-w-3xl">
                    Syntax Convertor is a lightweight tool designed to facilitate the conversion between various number systems and data serialization formats. Whether you're a developer, student, or enthusiast, this tool aims to simplify the process of converting data representations.
                </p>
                <h3 className="text-xl font-semibold mb-2">Features</h3>
                <ul className="list-disc list-inside mb-4">
                    <li>Convert between Binary, Octal, Decimal, and Hexadecimal number systems.</li>
                    <li>Serialize and deserialize data in JSON, XML, YAML, TOML, and CSV formats.</li>
                    <li>User-friendly interface for quick conversions.</li>
                </ul>
                <h3 className="text-xl font-semibold mb-2">Getting Started</h3>
                <p className="mb-4">
                    To get started with Syntax Convertor, simply navigate to the desired conversion section from the sidebar. Input your data, select the target format or number system, and click the convert button to see the results instantly.
                </p>
                <h3 className="text-xl font-semibold mb-2">Contributing</h3>
                <p>
                    We welcome contributions from the community! If you'd like to contribute to the development of CodeMorph, please visit our GitHub repository for guidelines on how to get involved.
                </p>
            </CardContent>
        </Card>

    )
}

export default About