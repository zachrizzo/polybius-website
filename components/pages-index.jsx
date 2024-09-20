'use client'

import { useCallback } from 'react';
import ReactFlow, { Controls, Background, useNodesState, useEdgesState, addEdge } from 'reactflow';
import 'reactflow/dist/style.css'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ArrowRight, Code, Zap, Lightbulb } from 'lucide-react'
import { useRouter } from 'next/router'

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'App.js' }, type: 'input' },
  { id: '2', position: { x: -100, y: 100 }, data: { label: 'Header.js' } },
  { id: '3', position: { x: 100, y: 100 }, data: { label: 'Main.js' } },
  { id: '4', position: { x: -150, y: 200 }, data: { label: 'Nav.js' } },
  { id: '5', position: { x: 50, y: 200 }, data: { label: 'Content.js' } },
  { id: '6', position: { x: 200, y: 200 }, data: { label: 'Footer.js' } },
]

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-5', source: '3', target: '5' },
  { id: 'e3-6', source: '3', target: '6' },
]

export function Index() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const router = useRouter()

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const handleGetStarted = (plan, price) => {
    router.push(`/payment?plan=${plan}&price=${price}`)
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    (<div className="flex flex-col min-h-screen">
      <header
        className="px-4 lg:px-6 h-14 flex items-center fixed w-full bg-background z-50">
        <Link className="flex items-center justify-center" href="/">
          <Code className="h-6 w-6" />
          <span className="sr-only">Fractal X</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Button variant="ghost" onClick={() => scrollToSection('features')}>
            Features
          </Button>
          <Button variant="ghost" onClick={() => scrollToSection('how-it-works')}>
            How It Works
          </Button>
          <Button variant="ghost" onClick={() => scrollToSection('pricing')}>
            Pricing
          </Button>
          <Link href="/documentation">
            <Button variant="ghost">Documentation</Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1 pt-14">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div
              className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1
                    className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Understand Your Codebase in a Snap
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Fractal X uses AI and mind maps to help you quickly grasp the structure and relationships in your code.
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form className="flex space-x-2">
                    <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                    <Button type="submit">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                  <p className="text-xs text-muted-foreground">
                    Start your free trial. No credit card required.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-full h-[400px] border rounded-lg overflow-hidden">
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}>
                    <Background />
                    <Controls />
                  </ReactFlow>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Features</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <Zap className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">AI-Powered Analysis</h3>
                <p className="text-muted-foreground">Our advanced AI quickly analyzes your codebase, identifying key components and relationships.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Code className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Interactive Mind Maps</h3>
                <p className="text-muted-foreground">Visualize your code structure with interactive, zoomable mind maps for better understanding.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <Lightbulb className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Insight Generation</h3>
                <p className="text-muted-foreground">Gain valuable insights about your code architecture, dependencies, and potential improvements.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
            <div
              className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">1. Upload Your Code</h3>
                <p className="text-muted-foreground">Simply upload your codebase or connect your repository to Fractal X.</p>
                <h3 className="text-xl font-bold">2. AI Analysis</h3>
                <p className="text-muted-foreground">Our AI engine analyzes your code, identifying structure and relationships.</p>
                <h3 className="text-xl font-bold">3. Generate Mind Map</h3>
                <p className="text-muted-foreground">Fractal X creates an interactive mind map of your codebase.</p>
                <h3 className="text-xl font-bold">4. Explore and Understand</h3>
                <p className="text-muted-foreground">Navigate through your code visually, gaining deeper insights and understanding.</p>
              </div>
              <div className="flex items-center justify-center">
                <img
                  alt="How It Works"
                  className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                  height="400"
                  src="/placeholder.svg"
                  width="600" />
              </div>
            </div>
          </div>
        </section>
        <section
          id="pricing"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Pricing Plans</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div
                className="flex flex-col p-6 bg-white dark:bg-gray-850 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Basic</h3>
                <p className="text-4xl font-bold mb-4">$9<span className="text-lg font-normal">/month</span></p>
                <ul className="mb-6 space-y-2">
                  <li>Up to 5 projects</li>
                  <li>Basic AI analysis</li>
                  <li>Standard mind maps</li>
                </ul>
                <Button className="mt-auto" onClick={() => handleGetStarted('Basic', 9)}>Get Started</Button>
              </div>
              <div
                className="flex flex-col p-6 bg-white dark:bg-gray-850 rounded-lg shadow-lg border-2 border-primary">
                <h3 className="text-2xl font-bold mb-4">Pro</h3>
                <p className="text-4xl font-bold mb-4">$29<span className="text-lg font-normal">/month</span></p>
                <ul className="mb-6 space-y-2">
                  <li>Unlimited projects</li>
                  <li>Advanced AI analysis</li>
                  <li>Interactive mind maps</li>
                  <li>Collaboration features</li>
                </ul>
                <Button className="mt-auto" onClick={() => handleGetStarted('Pro', 29)}>Get Started</Button>
              </div>
              <div
                className="flex flex-col p-6 bg-white dark:bg-gray-850 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
                <p className="text-4xl font-bold mb-4">Custom</p>
                <ul className="mb-6 space-y-2">
                  <li>Custom integrations</li>
                  <li>Advanced security features</li>
                  <li>Dedicated support</li>
                  <li>On-premise deployment</li>
                </ul>
                <Button className="mt-auto" onClick={() => handleGetStarted('Enterprise', 0)}>Contact Sales</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2023 Fractal X. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>)
  );
}