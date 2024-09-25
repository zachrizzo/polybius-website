'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Users, ShoppingCart, DollarSign, ArrowUpRight, Menu, Bell, Search, User } from 'lucide-react'

const data = [
    { name: 'Jan', sales: 4000, revenue: 2400 },
    { name: 'Feb', sales: 3000, revenue: 1398 },
    { name: 'Mar', sales: 2000, revenue: 9800 },
    { name: 'Apr', sales: 2780, revenue: 3908 },
    { name: 'May', sales: 1890, revenue: 4800 },
    { name: 'Jun', sales: 2390, revenue: 3800 },
]

export default function AdminDashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
                <div className="flex items-center justify-center h-20 border-b">
                    <h1 className="text-xl font-bold">Admin Dashboard</h1>
                </div>
                <nav className="mt-5">
                    <a className="flex items-center px-6 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" href="#">
                        <Users className="w-5 h-5 mr-3" />
                        Users
                    </a>
                    <a className="flex items-center px-6 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" href="#">
                        <ShoppingCart className="w-5 h-5 mr-3" />
                        Products
                    </a>
                    <a className="flex items-center px-6 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" href="#">
                        <DollarSign className="w-5 h-5 mr-3" />
                        Sales
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navigation */}
                <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b">
                    <div className="flex items-center">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 focus:outline-none lg:hidden">
                            <Menu className="h-6 w-6" />
                        </button>
                        <div className="relative mx-4 lg:mx-0">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                <Search className="h-5 w-5 text-gray-500" />
                            </span>
                            <Input
                                className="pl-10 pr-4"
                                placeholder="Search..."
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Button variant="ghost" size="icon">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon">
                            <User className="h-5 w-5" />
                        </Button>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
                    <div className="container mx-auto px-6 py-8">
                        <h3 className="text-3xl font-medium text-gray-700 dark:text-gray-200">Dashboard</h3>

                        <div className="mt-8">
                            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                                {/* Card */}
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total Revenue
                                        </CardTitle>
                                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">$45,231.89</div>
                                        <p className="text-xs text-muted-foreground">
                                            +20.1% from last month
                                        </p>
                                    </CardContent>
                                </Card>

                                {/* Card */}
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            New Customers
                                        </CardTitle>
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">+2350</div>
                                        <p className="text-xs text-muted-foreground">
                                            +180.1% from last month
                                        </p>
                                    </CardContent>
                                </Card>

                                {/* Card */}
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">Sales</CardTitle>
                                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">+12,234</div>
                                        <p className="text-xs text-muted-foreground">
                                            +19% from last month
                                        </p>
                                    </CardContent>
                                </Card>

                                {/* Card */}
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Active Now
                                        </CardTitle>
                                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">+573</div>
                                        <p className="text-xs text-muted-foreground">
                                            +201 since last hour
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Charts */}
                            <div className="grid gap-6 mb-8 md:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Revenue vs Sales</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ResponsiveContainer width="100%" height={300}>
                                            <BarChart data={data}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="sales" fill="#8884d8" />
                                                <Bar dataKey="revenue" fill="#82ca9d" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle>Recent Sales</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-8">
                                            {data.map((item, index) => (
                                                <div key={index} className="flex items-center">
                                                    <div className="ml-4 space-y-1">
                                                        <p className="text-sm font-medium leading-none">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {item.sales} sales
                                                        </p>
                                                    </div>
                                                    <div className="ml-auto font-medium">
                                                        ${item.revenue}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Tabs Section */}
                            <Tabs defaultValue="overview" className="space-y-4">
                                <TabsList>
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                                    <TabsTrigger value="reports">Reports</TabsTrigger>
                                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                                </TabsList>
                                <TabsContent value="overview" className="space-y-4">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Overview Content</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>This is the overview content. You can add more details here.</p>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="analytics" className="space-y-4">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Analytics Content</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>This is where you would display detailed analytics.</p>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="reports" className="space-y-4">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Reports Content</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>You can list various reports or report generation options here.</p>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="notifications" className="space-y-4">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Notifications Content</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p>Display user notifications or notification settings in this tab.</p>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
