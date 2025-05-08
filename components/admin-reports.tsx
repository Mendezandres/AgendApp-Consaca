"use client"

import { useState } from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Download, FileText, BarChart, PieChart, TrendingUp, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"

export function AdminReports() {
  const [date, setDate] = useState<Date>()
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })

  const handleGenerateReport = (type: string) => {
    toast({
      title: "Generando reporte",
      description: `El reporte de ${type} se está generando y estará disponible en breve.`,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-sky-500">Reportes y Análisis</CardTitle>
          <CardDescription>Genere reportes detallados y analice el rendimiento del sistema</CardDescription>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
            <div className="flex items-center space-x-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("justify-start text-left font-normal", !dateRange.from && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "d 'de' MMMM 'de' yyyy", { locale: es })} -{" "}
                          {format(dateRange.to, "d 'de' MMMM 'de' yyyy", { locale: es })}
                        </>
                      ) : (
                        format(dateRange.from, "d 'de' MMMM 'de' yyyy", { locale: es })
                      )
                    ) : (
                      <span>Seleccionar rango de fechas</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-center space-x-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Tipo de reporte" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="citas">Citas</SelectItem>
                  <SelectItem value="pacientes">Pacientes</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="financiero">Financiero</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="citas" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              <TabsTrigger value="citas">Citas</TabsTrigger>
              <TabsTrigger value="pacientes">Pacientes</TabsTrigger>
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="financiero">Financiero</TabsTrigger>
            </TabsList>
            <TabsContent value="citas" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Reporte de Citas</CardTitle>
                    <CardDescription>Análisis detallado de citas médicas</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-center py-4">
                      <BarChart className="h-16 w-16 text-sky-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Este reporte incluye estadísticas de citas programadas, completadas, canceladas y reprogramadas.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-sky-500 hover:bg-sky-500"
                      onClick={() => handleGenerateReport("citas")}
                    >
                      <FileText className="mr-2 h-4 w-4" /> Generar Reporte
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Citas por Especialidad</CardTitle>
                    <CardDescription>Distribución de citas por especialidad médica</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-center py-4">
                      <PieChart className="h-16 w-16 text-sky-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Este reporte muestra la distribución de citas entre las diferentes especialidades médicas.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-sky-500 hover:bg-sky-600"
                      onClick={() => handleGenerateReport("citas por especialidad")}
                    >
                      <FileText className="mr-2 h-4 w-4" /> Generar Reporte
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Tendencia de Citas</CardTitle>
                    <CardDescription>Análisis de tendencias a lo largo del tiempo</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-center py-4">
                      <TrendingUp className="h-16 w-16 text-sky-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Este reporte analiza las tendencias de citas a lo largo del tiempo, identificando patrones y
                      picos.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-sky-500 hover:bg-sky-600"
                      onClick={() => handleGenerateReport("tendencias de citas")}
                    >
                      <FileText className="mr-2 h-4 w-4" /> Generar Reporte
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="pacientes" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Demografía de Pacientes</CardTitle>
                    <CardDescription>Análisis demográfico de pacientes</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-center py-4">
                      <PieChart className="h-16 w-16 text-sky-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Este reporte incluye distribución por edad, género y ubicación geográfica de los pacientes.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-sky-500 hover:bg-sky-600"
                      onClick={() => handleGenerateReport("demografía de pacientes")}
                    >
                      <FileText className="mr-2 h-4 w-4" /> Generar Reporte
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Condiciones Médicas</CardTitle>
                    <CardDescription>Análisis de condiciones médicas comunes</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-center py-4">
                      <BarChart className="h-16 w-16 text-sky-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Este reporte analiza las condiciones médicas más comunes tratadas en la clínica.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-sky-500 hover:bg-sky-600"
                      onClick={() => handleGenerateReport("condiciones médicas")}
                    >
                      <FileText className="mr-2 h-4 w-4" /> Generar Reporte
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Retención de Pacientes</CardTitle>
                    <CardDescription>Análisis de retención y recurrencia</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-center py-4">
                      <TrendingUp className="h-16 w-16 text-sky-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Este reporte analiza la retención de pacientes y patrones de visitas recurrentes.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-sky-500 hover:bg-sky-600"
                      onClick={() => handleGenerateReport("retención de pacientes")}
                    >
                      <FileText className="mr-2 h-4 w-4" /> Generar Reporte
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="personal" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Rendimiento del Personal</CardTitle>
                    <CardDescription>Análisis de rendimiento por médico</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-center py-4">
                      <BarChart className="h-16 w-16 text-sky-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Este reporte analiza el rendimiento de cada médico, incluyendo número de citas y valoraciones.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-sky-500 hover:bg-sky-600"
                      onClick={() => handleGenerateReport("rendimiento del personal")}
                    >
                      <FileText className="mr-2 h-4 w-4" /> Generar Reporte
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Disponibilidad y Ocupación</CardTitle>
                    <CardDescription>Análisis de horarios y ocupación</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-center py-4">
                      <PieChart className="h-16 w-16 text-sky-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Este reporte analiza la disponibilidad y ocupación de horarios del personal médico.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-sky-500 hover:bg-sky-600"
                      onClick={() => handleGenerateReport("disponibilidad y ocupación")}
                    >
                      <FileText className="mr-2 h-4 w-4" /> Generar Reporte
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Satisfacción de Pacientes</CardTitle>
                    <CardDescription>Análisis de valoraciones y comentarios</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-center py-4">
                      <TrendingUp className="h-16 w-16 text-sky-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Este reporte analiza las valoraciones y comentarios de los pacientes sobre el personal médico.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-sky-500 hover:bg-sky-600"
                      onClick={() => handleGenerateReport("satisfacción de pacientes")}
                    >
                      <FileText className="mr-2 h-4 w-4" /> Generar Reporte
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="financiero" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Ingresos por Especialidad</CardTitle>
                    <CardDescription>Análisis de ingresos por especialidad médica</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-center py-4">
                      <BarChart className="h-16 w-16 text-sky-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Este reporte analiza los ingresos generados por cada especialidad médica.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-sky-500 hover:bg-sky-600"
                      onClick={() => handleGenerateReport("ingresos por especialidad")}
                    >
                      <FileText className="mr-2 h-4 w-4" /> Generar Reporte
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Tendencias de Ingresos</CardTitle>
                    <CardDescription>Análisis de tendencias financieras</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-center py-4">
                      <TrendingUp className="h-16 w-16 text-sky-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Este reporte analiza las tendencias de ingresos a lo largo del tiempo.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-sky-500 hover:bg-sky-600"
                      onClick={() => handleGenerateReport("tendencias de ingresos")}
                    >
                      <FileText className="mr-2 h-4 w-4" /> Generar Reporte
                    </Button>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Análisis de Costos</CardTitle>
                    <CardDescription>Análisis detallado de costos operativos</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-center py-4">
                      <PieChart className="h-16 w-16 text-sky-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Este reporte analiza los costos operativos y su distribución por categorías.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-sky-500 hover:bg-sky-600"
                      onClick={() => handleGenerateReport("análisis de costos")}
                    >
                      <FileText className="mr-2 h-4 w-4" /> Generar Reporte
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline" className="mr-2">
            <Download className="mr-2 h-4 w-4" /> Exportar a Excel
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Exportar a PDF
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
