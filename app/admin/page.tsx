import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppointmentList } from "@/components/appointment-list"
import { StatsDashboard } from "@/components/stats-dashboard"
import { StaffManagement } from "@/components/staff-management"
import { AdminReports } from "@/components/admin-reports"
import { AdminSettings } from "@/components/admin-settings"

export default function AdminPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-sky-500 sm:text-4xl">Panel de Administración</h1>
        <p className="mt-4 text-lg text-gray-600">Gestione el sistema de citas médicas y visualice estadísticas</p>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-5">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="citas">Citas</TabsTrigger>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="reportes">Reportes</TabsTrigger>
          <TabsTrigger value="configuracion">Configuración</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="mt-6">
          <StatsDashboard />
        </TabsContent>
        <TabsContent value="citas" className="mt-6">
          <AppointmentList
            title="Todas las Citas"
            description="Vista general de todas las citas programadas en el sistema"
          />
        </TabsContent>
        <TabsContent value="personal" className="mt-6">
          <StaffManagement />
        </TabsContent>
        <TabsContent value="reportes" className="mt-6">
          <AdminReports />
        </TabsContent>
        <TabsContent value="configuracion" className="mt-6">
          <AdminSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}
