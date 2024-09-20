'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, FileCode } from 'lucide-react';

export function DocumentationComponent() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    (<div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Fractal X Documentation</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ai">AI & Local Processing</TabsTrigger>
          <TabsTrigger value="analyzer">Code Map Analyzer</TabsTrigger>
          <TabsTrigger value="ignore">ignore.fractal</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Overview of Fractal X</h2>
          <p className="mb-4">
            Fractal X is an innovative application designed to help developers understand their codebase quickly and efficiently. By leveraging AI and interactive mind maps, Fractal X provides a visual representation of your code structure, dependencies, and relationships.
          </p>
          <p className="mb-4">
            Key features of Fractal X include:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>AI-powered code analysis</li>
            <li>Interactive mind map generation</li>
            <li>Local processing for enhanced security</li>
            <li>Custom file exclusion with ignore.fractal</li>
            <li>Integration with existing version control workflows</li>
          </ul>
          <p>
            Whether you're onboarding new team members, refactoring legacy code, or simply trying to get a bird's-eye view of your project, Fractal X is the tool you need to visualize and understand your codebase.
          </p>
        </TabsContent>
        
        <TabsContent value="ai" className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">AI & Local Processing</h2>
          <p className="mb-4">
            Fractal X utilizes advanced AI algorithms to analyze your codebase and generate insightful mind maps. One of the key features of our application is that all AI processing is done locally on your machine.
          </p>
          <h3 className="text-xl font-semibold mb-2">Benefits of Local AI Processing:</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Enhanced Security: Your code never leaves your machine</li>
            <li>Faster Processing: No need to wait for server-side computations</li>
            <li>Offline Capability: Analyze your code without an internet connection</li>
            <li>Data Privacy: Comply with strict data protection regulations</li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">How It Works:</h3>
          <ol className="list-decimal list-inside mb-4">
            <li>Fractal X installs a lightweight AI model on your local machine</li>
            <li>When you initiate an analysis, the AI model processes your codebase</li>
            <li>The results are used to generate an interactive mind map</li>
            <li>All computations and data remain on your device</li>
          </ol>
          <p>
            By leveraging local AI processing, Fractal X ensures that your code remains secure and private while still providing powerful analysis and visualization capabilities.
          </p>
        </TabsContent>
        
        <TabsContent value="analyzer" className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Code Map Analyzer</h2>
          <p className="mb-4">
            The Code Map Analyzer is the core component of Fractal X that analyzes your codebase and generates the interactive mind map. It's designed to be efficient, thorough, and customizable.
          </p>
          <h3 className="text-xl font-semibold mb-2">Key Features:</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Supports multiple programming languages</li>
            <li>Identifies dependencies and relationships between files</li>
            <li>Respects .gitignore and custom ignore.fractal files</li>
            <li>Generates hierarchical structure of your codebase</li>
            <li>Provides insights on code complexity and potential issues</li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">How to Use:</h3>
          <ol className="list-decimal list-inside mb-4">
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
        
        <TabsContent value="ignore" className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Custom File Exclusion with ignore.fractal</h2>
          <p className="mb-4">
            Fractal X introduces a custom file called ignore.fractal that allows you to exclude specific files or directories from the code analysis without affecting their Git tracking status.
          </p>
          <h3 className="text-xl font-semibold mb-2">Key Points:</h3>
          <ul className="list-disc list-inside mb-4">
            <li>ignore.fractal is specific to Fractal X and doesn't affect Git</li>
            <li>It works alongside .gitignore for fine-grained control</li>
            <li>Useful for excluding files that should remain in the repo but not be analyzed</li>
            <li>Supports wildcards and patterns similar to .gitignore</li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">How to Use ignore.fractal:</h3>
          <ol className="list-decimal list-inside mb-4">
            <li>Create a file named ignore.fractal in your project root</li>
            <li>Add patterns or file paths to exclude, one per line</li>
            <li>Fractal X will automatically respect these exclusions during analysis</li>
          </ol>
          <h3 className="text-xl font-semibold mb-2">Example ignore.fractal:</h3>
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            <pre className="text-sm">
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
            By using ignore.fractal, you can ensure that Fractal X focuses on the most relevant parts of your codebase while ignoring unnecessary or sensitive files.
          </p>
        </TabsContent>
      </Tabs>
      <div className="mt-8 flex justify-center">
        <Button className="mr-4">
          <FileCode className="mr-2 h-4 w-4" />
          Analyze Your Code
        </Button>
        <Button variant="outline">
          <Code className="mr-2 h-4 w-4" />
          View Documentation
        </Button>
      </div>
    </div>)
  );
}