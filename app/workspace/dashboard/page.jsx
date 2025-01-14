'use client'
import React, { useEffect } from 'react'
import Card from '../../(components)/common/Card'
import { useTicketContext } from '../../(context)/TicketContext'
import { useProjectContext } from '../../(context)/ProjectContext'
import WorkloadDisplay from '../../(components)/WorkloadDisplay'
import TicketSummary from '../../(components)/TicketSummary'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const workloadData = [
  { name: 'Sam', workload: 7 },
  { name: 'Meldy', workload: 8 },
  { name: 'Ken', workload: 2 },
  { name: 'Dmitry', workload: 10 },
  { name: 'Vego', workload: 8 },
  { name: 'Kadin', workload: 2 },
  { name: 'Melm', workload: 4 },
]

const Dashboard = () => {
  const { tickets } = useTicketContext()
  const { projects } = useProjectContext()

  // Calculate metrics
  const totalTickets = tickets?.length || 0
  const totalProjects = projects?.length || 0
  const completedTickets =
    tickets?.filter((ticket) => ticket.status === 'completed').length || 0
  const urgentTickets =
    tickets?.filter((ticket) => ticket.priority >= 4).length || 0

  // Calculate ticket status distribution
  const statusData = tickets?.reduce((acc, ticket) => {
    acc[ticket.status] = (acc[ticket.status] || 0) + 1
    return acc
  }, {})

  const pieChartData = Object.entries(statusData || {}).map(
    ([name, value]) => ({
      name,
      value,
    }),
  )

  // Prepare trend data (last 7 days)
  const trendData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return {
      date: date.toLocaleDateString(),
      tickets:
        tickets?.filter(
          (ticket) =>
            new Date(ticket.createdAt).toDateString() === date.toDateString(),
        ).length || 0,
    }
  }).reverse()

  const COLORS = ['#E65F2B', '#060606', '#EBDFD7', '#f1f1f1']

  return (
    <div className="p-6 space-y-6">
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        <Card className="p-6  shadow-md">
          <h3 className="text-lg  mb-4">Total Tickets</h3>
          <p className="text-3xl  text-chill-orange">{totalTickets}</p>
        </Card>

        <Card className="p-6  shadow-md">
          <h3 className="text-lg  mb-4">Total Projects</h3>
          <p className="text-3xl  text-chill-black">{totalProjects}</p>
        </Card>

        <Card className="p-6  shadow-md">
          <h3 className="text-lg  mb-4">Completed</h3>
          <p className="text-3xl  text-green-600">{completedTickets}</p>
        </Card>

        <Card className="p-6 shadow-md">
          <h3 className="text-lg  mb-4">Urgent Tickets</h3>
          <p className="text-3xl  text-red-600">{urgentTickets}</p>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket Trend Chart */}
        <Card className="p-6  shadow-md">
          <h3 className="text-lg  mb-4">Ticket Trend (Last 7 Days)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="tickets"
                  stroke="#E65F2B"
                  strokeWidth={2}
                  dot={{ fill: '#E65F2B' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Status Distribution Chart */}
        <Card className="p-6  shadow-md">
          <h3 className="text-lg  mb-4">Ticket Status Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <TicketSummary tickets={tickets} projects={projects} />
      <WorkloadDisplay data={workloadData} />
    </div>
  )
}

export default Dashboard
