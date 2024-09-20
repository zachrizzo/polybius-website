import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, FileCode, Cpu, FileX, ChevronRight } from 'lucide-react'
import Header from '@/components/layout/Header'
import Link from 'next/link'

const Breadcrumbs = () => {
    return (
        <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                    <Link href="/" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">
                        Home
                    </Link>
                </li>
                <li>
                    <div className="flex items-center">
                        <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span className="ml-1 text-sm font-medium text-gray-700 md:ml-2 dark:text-gray-300">Documentation</span>
                    </div>
                </li>
            </ol>
        </nav>
    )
}

export default function Documentation() {
    const [activeTab, setActiveTab] = useState("overview")

    return (
        <>
            {/* <Header /> */}

            <div className="w-full min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
                {/* Ensure full width and height */}
                <div className="container mx-auto px-6 py-8">
                    <Breadcrumbs />

                    <h1 className="text-5xl font-extrabold text-center mb-8">Fractal X Documentation</h1>


                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="flex flex-wrap justify-center gap-2 mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-0">
                            <TabsTrigger
                                value="overview"
                                className="flex items-center gap-2 px-4 py-1 rounded-md transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                <FileCode className="h-5 w-5" />
                                Overview
                            </TabsTrigger>
                            <TabsTrigger
                                value="ai"
                                className="flex items-center gap-2 px-4 py-1 rounded-md transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                <Cpu className="h-5 w-5" />
                                AI & Local Processing
                            </TabsTrigger>
                            <TabsTrigger
                                value="analyzer"
                                className="flex items-center gap-2 px-4 py-1 rounded-md transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                <Code className="h-5 w-5" />
                                Code Map Analyzer
                            </TabsTrigger>
                            <TabsTrigger
                                value="ignore"
                                className="flex items-center gap-2 px-4 py-1 rounded-md transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                <FileX className="h-5 w-5" />
                                ignore.fractal
                            </TabsTrigger>
                        </TabsList>

                        {/* Overview Tab */}
                        <TabsContent value="overview" className="mt-6">
                            <h2 className="text-3xl font-semibold mb-4">Overview of Fractal X</h2>
                            <p className="mb-4 leading-relaxed">
                                Fractal X is an innovative application designed to help developers understand their codebase quickly and efficiently.
                            </p>
                            <ul className="list-disc list-inside mb-4 space-y-1">
                                <li>AI-powered code analysis</li>
                                <li>Interactive mind map generation</li>
                                <li>Local processing for enhanced security</li>
                                <li>Custom file exclusion with ignore.fractal</li>
                                <li>Integration with existing version control workflows</li>
                            </ul>
                        </TabsContent>

                        {/* AI & Local Processing Tab */}
                        <TabsContent value="ai" className="mt-4">
                            <h2 className="text-3xl font-semibold mb-4">AI & Local Processing</h2>
                            <p className="mb-4 leading-relaxed">
                                Fractal X utilizes advanced AI algorithms to analyze your codebase and generate insightful mind maps. One of the key features of our application is that all AI processing is done locally on your machine.
                            </p>
                            <h3 className="text-2xl font-semibold mb-2">Benefits of Local AI Processing:</h3>
                            <ul className="list-disc list-inside mb-4 space-y-1">
                                <li><span className="font-medium">Enhanced Security:</span> Your code never leaves your machine</li>
                                <li><span className="font-medium">Faster Processing:</span> No need to wait for server-side computations</li>
                                <li><span className="font-medium">Offline Capability:</span> Analyze your code without an internet connection</li>
                                <li><span className="font-medium">Data Privacy:</span> Comply with strict data protection regulations</li>
                            </ul>
                            <h3 className="text-2xl font-semibold mb-2">How It Works:</h3>
                            <ol className="list-decimal list-inside mb-4 space-y-1">
                                <li>Fractal X installs a lightweight AI model on your local machine</li>
                                <li>When you initiate an analysis, the AI model processes your codebase</li>
                                <li>The results are used to generate an interactive mind map</li>
                                <li>All computations and data remain on your device</li>
                            </ol>
                            <p>
                                By leveraging local AI processing, Fractal X ensures that your code remains secure and private while still providing powerful analysis and visualization capabilities.
                            </p>
                        </TabsContent>

                        {/* Code Map Analyzer Tab */}
                        <TabsContent value="analyzer" className="mt-4">
                            <h2 className="text-3xl font-semibold mb-4">Code Map Analyzer</h2>
                            <p className="mb-4 leading-relaxed">
                                The Code Map Analyzer is the core component of Fractal X that analyzes your codebase and generates the interactive mind map. It's designed to be efficient, thorough, and customizable.
                            </p>
                            <h3 className="text-2xl font-semibold mb-2">Key Features:</h3>
                            <ul className="list-disc list-inside mb-4 space-y-1">
                                <li>Supports multiple programming languages</li>
                                <li>Identifies dependencies and relationships between files</li>
                                <li>Respects .gitignore and custom ignore.fractal files</li>
                                <li>Generates hierarchical structure of your codebase</li>
                                <li>Provides insights on code complexity and potential issues</li>
                            </ul>
                            <h3 className="text-2xl font-semibold mb-2">How to Use:</h3>
                            <ol className="list-decimal list-inside mb-4 space-y-1">
                                <li>Open your project in Fractal X</li>
                                <li>Configure any custom exclusions in ignore.fractal (if needed)</li>
                                <li>Click the "Analyze" button to start the process</li>
                                <li>Wait for the analysis to complete (usually just a few seconds)</li>
                                <li>Explore the generated mind map and insights</li>
                            </ol>
                            <p>
                                The Code Map Analyzer is designed to work seamlessly with your existing development workflow, providing valuable insights without disrupting your process.
                            </p>
                        </TabsContent>

                        {/* ignore.fractal Tab */}
                        <TabsContent value="ignore" className="mt-4">
                            <h2 className="text-3xl font-semibold mb-4">Custom File Exclusion with ignore.fractal</h2>
                            <p className="mb-4 leading-relaxed">
                                Fractal X introduces a custom file called <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">ignore.fractal</code> that allows you to exclude specific files or directories from the code analysis without affecting their Git tracking status.
                            </p>
                            <h3 className="text-2xl font-semibold mb-2">Overview</h3>
                            <p className="mb-4">
                                The Code Map Analyzer is a powerful tool that helps map out relationships and dependencies in your codebase. To give you control over which files and directories get included in the analysis, the analyzer supports both <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.gitignore</code> and a custom file called <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">ignore.fractal</code>.
                            </p>
                            <h3 className="text-2xl font-semibold mb-2">How It Works</h3>
                            <p className="mb-4">
                                <strong>.gitignore:</strong> The analyzer reads the <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.gitignore</code> file first to skip any files or directories specified there. This is standard behavior and mirrors what Git itself does.
                            </p>
                            <p className="mb-4">
                                <strong>ignore.fractal:</strong> After reading <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.gitignore</code>, the analyzer looks for an <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">ignore.fractal</code> file. This custom file allows you to define additional exclusions specifically for the code map analysis, without affecting Git.
                            </p>
                            <h3 className="text-2xl font-semibold mb-2">Why Use ignore.fractal?</h3>
                            <p className="mb-4">
                                Sometimes, there are files or directories that should be tracked by Git (such as build scripts or environment files), but you don't want them to be included in the code map. The <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">ignore.fractal</code> file gives you a way to ignore files for the analyzer only, while keeping them in your Git repository.
                            </p>
                            <h3 className="text-2xl font-semibold mb-2">How to Create and Use ignore.fractal</h3>
                            <h4 className="text-xl font-semibold mb-2">Create the File:</h4>
                            <ol className="list-decimal list-inside mb-4 space-y-1">
                                <li>Create a file named <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">ignore.fractal</code> in your project root.</li>
                            </ol>
                            <h4 className="text-xl font-semibold mb-2">Define Patterns:</h4>
                            <ol className="list-decimal list-inside mb-4 space-y-1">
                                <li>Inside the <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">ignore.fractal</code> file, define patterns of files or directories to exclude from the analysis. This works similarly to <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.gitignore</code>.</li>
                            </ol>
                            <h4 className="text-xl font-semibold mb-2">Example ignore.fractal File:</h4>
                            <ScrollArea className="h-64 w-full rounded-md border dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800">
                                <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
                                    {`# Ignore build output
build/
dist/

# Ignore all .log files
*.log

# Ignore specific scripts
scripts/generate-docs.js

# Ignore everything in the test_data folder
test_data/*

# But include test_data/important.json
!test_data/important.json`}
                                </pre>
                            </ScrollArea>
                            <p className="mt-4">
                                By using <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">ignore.fractal</code>, you can ensure that Fractal X focuses on the most relevant parts of your codebase while ignoring unnecessary or sensitive files.
                            </p>
                            <h3 className="text-2xl font-semibold mb-2">Key Differences Between .gitignore and ignore.fractal:</h3>
                            <ul className="list-disc list-inside mb-4 space-y-1">
                                <li><strong>.gitignore:</strong> Prevents files from being tracked in Git and also excludes them from the code analysis.</li>
                                <li><strong>ignore.fractal:</strong> Excludes files from the Code Map Analyzer only, allowing them to remain tracked in Git. This provides more flexibility, especially when you want to keep certain files in your repository but not include them in the code mapping.</li>
                            </ul>
                            <h3 className="text-2xl font-semibold mb-2">When to Use Both .gitignore and ignore.fractal:</h3>
                            <ul className="list-disc list-inside mb-4 space-y-1">
                                <li><strong>Use .gitignore:</strong> When you want to exclude files from both Git tracking and code analysis.</li>
                                <li><strong>Use ignore.fractal:</strong> When you still want files in your Git repository, but don’t need them to be included in the code map.</li>
                            </ul>
                            <h3 className="text-2xl font-semibold mb-2">Example:</h3>
                            <p className="mb-4">
                                If you have a build script or a configuration file that you want to keep in your Git repository but avoid it being included in the code map, you can add it to the <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">ignore.fractal</code> file:
                            </p>
                            <ScrollArea className="h-40 w-full rounded-md border dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800">
                                <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
                                    {`scripts/build.js
.env`}
                                </pre>
                            </ScrollArea>
                            <p className="mt-4">
                                In this case:
                            </p>
                            <ul className="list-disc list-inside mb-4 space-y-1">
                                <li>The build script (<code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">scripts/build.js</code>) and environment file (<code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.env</code>) will be skipped during the code analysis but will still be part of your Git repository.</li>
                                <li>If you add <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">*.log</code> to both <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.gitignore</code> and <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">ignore.fractal</code>, the <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.log</code> files won’t be tracked by Git or analyzed by the Code Map Analyzer.</li>
                            </ul>
                            <h3 className="text-2xl font-semibold mb-2">Important Notes:</h3>
                            <ul className="list-disc list-inside mb-4 space-y-1">
                                <li><strong>Presence of the Files:</strong> For the exclusion rules to work, either <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.gitignore</code> or <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">ignore.fractal</code> (or both) must exist in the directory you are mapping.</li>
                                <li>If no <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.gitignore</code> or <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">ignore.fractal</code> exists in the directory, the Code Map Analyzer will analyze all files in that directory.</li>
                                <li><strong>How the Code Map Analyzer Uses These Files:</strong>
                                    <ul className="list-disc list-inside ml-5">
                                        <li>Read the <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.gitignore</code> file first to skip files and directories defined there.</li>
                                        <li>Read the <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">ignore.fractal</code> file for additional patterns to ignore specific files from the analysis.</li>
                                        <li>Any files not mentioned in either file will be analyzed.</li>
                                    </ul>
                                </li>
                            </ul>
                            <h3 className="text-2xl font-semibold mb-2">Sample Workflow:</h3>
                            <ol className="list-decimal list-inside mb-4 space-y-1">
                                <li><strong>Create or Edit .gitignore:</strong>
                                    <p className="ml-4">Define the files you don’t want tracked by Git or analyzed.</p>
                                    <ScrollArea className="h-24 w-full rounded-md border dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800 mt-2">
                                        <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
                                            {`# .gitignore
node_modules/
dist/
*.log`}
                                        </pre>
                                    </ScrollArea>
                                </li>
                                <li><strong>Create ignore.fractal:</strong>
                                    <p className="ml-4">Define additional files you want ignored from analysis but still tracked in Git.</p>
                                    <ScrollArea className="h-24 w-full rounded-md border dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800 mt-2">
                                        <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
                                            {`# ignore.fractal
build/
scripts/build.js
.env`}
                                        </pre>
                                    </ScrollArea>
                                </li>
                                <li><strong>Run the Code Map Analyzer:</strong>
                                    <p className="ml-4">When you run the Code Map Analyzer, it will first check <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.gitignore</code> and then <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">ignore.fractal</code> to skip files that match the patterns.</p>
                                </li>
                            </ol>
                            <h3 className="text-2xl font-semibold mb-2">FAQ:</h3>
                            <h4 className="text-xl font-semibold mb-2">Q: What if I don’t have a .gitignore or ignore.fractal file?</h4>
                            <p className="mb-4">
                                The Code Map Analyzer will analyze all files in the directory if neither file is present. You should create one or both files to control which files are excluded.
                            </p>
                            <h4 className="text-xl font-semibold mb-2">Q: Can I use wildcards in ignore.fractal?</h4>
                            <p className="mb-4">
                                Yes, just like in <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.gitignore</code>, you can use wildcards to exclude patterns of files, such as <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">*.log</code> to ignore all .log files.
                            </p>
                            <h4 className="text-xl font-semibold mb-2">Q: What happens if I add a file to .gitignore but not ignore.fractal?</h4>
                            <p className="mb-4">
                                The file will be ignored by both Git and the analyzer. If you want to keep the file in Git but exclude it from the code map, add it to <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">ignore.fractal</code> instead.
                            </p>
                            <h3 className="text-2xl font-semibold mb-2">Conclusion</h3>
                            <p className="mb-4">
                                The <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">ignore.fractal</code> file gives you fine-grained control over what files are included in the code mapping process without affecting your Git repository. By using both <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">.gitignore</code> and <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">ignore.fractal</code> together, you can ensure that the Code Map Analyzer focuses on the most relevant parts of your codebase while ignoring unnecessary or sensitive files.
                            </p>
                            <p className="mb-4">
                                For best results, we recommend creating an <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">ignore.fractal</code> file in the root of any project you wish to analyze and customizing it based on your specific needs.
                            </p>
                        </TabsContent>
                    </Tabs>

                    {/* Action Buttons */}
                    <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
                        <Button className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                            <FileCode className="mr-2 h-5 w-5" />
                            Analyze Your Code
                        </Button>
                        <Button variant="outline" className="flex items-center justify-center px-6 py-3 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors">
                            <Code className="mr-2 h-5 w-5" />
                            View Documentation
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}
