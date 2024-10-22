'use client'

import { useState, useCallback } from 'react'
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { ArrowRight, Code, Zap, Lightbulb, Download } from 'lucide-react'
import { useRouter } from 'next/router'
import Header from '@/components/layout/Header'
import { db } from '@/firebase/firebase'
import { addDoc, collection } from 'firebase/firestore'


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

export default function LandingPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [email, setEmail] = useState('')
  const router = useRouter()

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  const handleGetStarted = (plan, price) => {
    router.push(`https://buy.stripe.com/test_5kAaF29La9qv6Q08ww`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (email) {
      try {
        await addDoc(collection(db, "emails"), { email })
        alert('Email submitted successfully!')
        setEmail('')
      } catch (error) {
        console.error('Error adding email: ', error)
        alert('There was an error submitting your email. Please try again.')
      }
    } else {
      alert('Please enter a valid email address.')
    }
  }


  const handleDownload = () => {
    // Create a link element
    const link = document.createElement('a')
    link.href = '/apps/mac/Fractal X-darwin-arm64-1.0.0.zip'
    link.download = 'Fractal X-darwin-arm64-1.0.0.zip'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-1 xl:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl">
                    Understand Your Codebase in a Snap
                  </h1>
                  <p className="max-w-lg text-lg text-gray-600 dark:text-gray-300">
                    Fractal X helps remove tech debt and messy code by allowing independent developers and teams of any size to visualize their entire code base.

                    Through intuitive Code Maps powered by AI, we can remove any of the guesswork for you. We want you to spend more time shipping and less time debugging.

                    Always be shipping.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleDownload}
                    className="flex items-center justify-center bg-blue-600 hover:bg-blue-700"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download for Mac
                  </Button>
                </div>
                <div className="w-full max-w-md space-y-4">
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Input
                      className="flex-1"
                      placeholder="Enter your email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button type="submit" className="flex items-center justify-center">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Start your free trial. No credit card required.
                  </p>
                </div>
              </div>
              <div className="w-full h-80 md:h-96 lg:h-[400px] rounded-lg overflow-hidden shadow-lg">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  fitView
                  attributionPosition="bottom-right"
                >
                  <Background color="#aaa" gap={16} />
                  <Controls />
                </ReactFlow>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-16">Features</h2>
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center p-4">
                <Zap className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">AI-Powered Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our advanced AI quickly analyzes your codebase, identifying key components and relationships.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <Code className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Interactive Mind Maps</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Visualize your code structure with interactive, zoomable mind maps for better understanding.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <Lightbulb className="h-12 w-12 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Insight Generation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Gain valuable insights about your code architecture, dependencies, and potential improvements.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-16">How It Works</h2>
            <div className="grid gap-12 lg:grid-cols-1 xl:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">1. Upload Your Code</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Simply upload your codebase or connect your repository to Fractal X.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">2. AI Analysis</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our AI engine analyzes your code, identifying structure and relationships.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">3. Generate Mind Map</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Fractal X creates an interactive mind map of your codebase.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">4. Explore and Understand</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Navigate through your code visually, gaining deeper insights and understanding.
                  </p>
                </div>
              </div>
              <div className="w-full h-80 md:h-96 lg:h-[400px] rounded-lg overflow-hidden shadow-lg">
                <img
                  alt="How It Works"
                  className="w-full h-full object-cover object-center"
                  src="/Screenshot 2024-09-09 at 2.22.02 PM.png"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-16">Pricing Plans</h2>
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {/* Basic Plan */}
              <div className="flex flex-col p-6 bg-white dark:bg-gray-850 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-semibold mb-4">Basic</h3>
                <p className="text-4xl font-bold mb-4">$9<span className="text-lg font-normal">/month</span></p>
                <ul className="mb-6 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Up to 5 projects</li>
                  <li>Basic AI analysis</li>
                  <li>Standard mind maps</li>
                </ul>
                <Button
                  className="mt-auto w-full flex items-center justify-center"
                  onClick={() => handleGetStarted('Basic', 9)}
                >
                  Get Started
                </Button>
              </div>
              {/* Pro Plan */}
              <div className="flex flex-col p-6 bg-white dark:bg-gray-850 rounded-lg shadow-md border-2 border-blue-500 hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-semibold mb-4">Pro</h3>
                <p className="text-4xl font-bold mb-4">$29<span className="text-lg font-normal">/month</span></p>
                <ul className="mb-6 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Unlimited projects</li>
                  <li>Advanced AI analysis</li>
                  <li>Interactive mind maps</li>
                  <li>Collaboration features</li>
                </ul>
                <Button
                  className="mt-auto w-full flex items-center justify-center"
                  onClick={() => handleGetStarted('Pro', 29)}
                >
                  Get Started
                </Button>
              </div>
              {/* Enterprise Plan */}
              <div className="flex flex-col p-6 bg-white dark:bg-gray-850 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-2xl font-semibold mb-4">Enterprise</h3>
                <p className="text-4xl font-bold mb-4">Custom</p>
                <ul className="mb-6 space-y-2 text-gray-600 dark:text-gray-300">
                  <li>Custom integrations</li>
                  <li>Advanced security features</li>
                  <li>Dedicated support</li>
                  <li>On-premise deployment</li>
                </ul>
                <Button
                  className="mt-auto w-full flex items-center justify-center"
                  onClick={() => handleGetStarted('Enterprise', 0)}
                >
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-4 sm:flex-row py-6 w-full bg-white dark:bg-gray-900 border-t">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
          © {new Date().getFullYear()} Fractal X. All rights reserved.
        </p>
        <nav className="flex gap-4 sm:ml-auto justify-center sm:justify-start">
          <Link className="text-sm hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-sm hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
