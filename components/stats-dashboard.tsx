"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, UserCheck, Clock, Activity, TrendingUp, TrendingDown, BarChart } from "lucide-react"

export function StatsDashboard() {
  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="especialidades">Especialidades</TabsTrigger>
        <TabsTrigger value="doctores">Doctores</TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Citas</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">+12% respecto al mes anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Citas Confirmadas</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">189</div>
              <p className="text-xs text-muted-foreground">77% del total de citas</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pacientes Nuevos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">+18% respecto al mes anterior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tiempo Promedio</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28 min</div>
              <p className="text-xs text-muted-foreground">-5% respecto al mes anterior</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Citas por Día</CardTitle>
              <CardDescription>Distribución de citas durante la semana actual</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[200px] w-full flex items-end justify-between gap-2">
                <div className="relative h-full w-full">
                  <div className="absolute inset-0 flex items-end">
                    <div className="w-full">
                      <div className="flex items-end justify-around">
                        <div className="flex flex-col items-center">
                          <div className="h-[120px] w-9 rounded-md bg-sky-500"></div>
                          <span className="mt-2 text-xs">Lun</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-[150px] w-9 rounded-md bg-sky-500"></div>
                          <span className="mt-2 text-xs">Mar</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-[100px] w-9 rounded-md bg-sky-500"></div>
                          <span className="mt-2 text-xs">Mié</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-[180px] w-9 rounded-md bg-sky-500"></div>
                          <span className="mt-2 text-xs">Jue</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="h-[140px] w-9 rounded-md bg-sky-500"></div>
                          <span className="mt-2 text-xs">Vie</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Estado de Citas</CardTitle>
              <CardDescription>Distribución por estado actual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Confirmadas</span>
                      <span className="text-sm font-medium">77%</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                      <div className="h-full w-[77%] rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Pendientes</span>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                      <div className="h-full w-[15%] rounded-full bg-yellow-500"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Canceladas</span>
                      <span className="text-sm font-medium">8%</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                      <div className="h-full w-[8%] rounded-full bg-red-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="especialidades" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Medicina General</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68</div>
              <div className="flex items-center pt-1">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                <span className="text-xs text-green-500">+8%</span>
                <span className="text-xs text-muted-foreground ml-1">vs. mes anterior</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pediatría</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">52</div>
              <div className="flex items-center pt-1">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                <span className="text-xs text-green-500">+12%</span>
                <span className="text-xs text-muted-foreground ml-1">vs. mes anterior</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cardiología</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">37</div>
              <div className="flex items-center pt-1">
                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                <span className="text-xs text-red-500">-3%</span>
                <span className="text-xs text-muted-foreground ml-1">vs. mes anterior</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ginecología</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <div className="flex items-center pt-1">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                <span className="text-xs text-green-500">+5%</span>
                <span className="text-xs text-muted-foreground ml-1">vs. mes anterior</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Traumatología</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">29</div>
              <div className="flex items-center pt-1">
                <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                <span className="text-xs text-green-500">+2%</span>
                <span className="text-xs text-muted-foreground ml-1">vs. mes anterior</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dermatología</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14</div>
              <div className="flex items-center pt-1">
                <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                <span className="text-xs text-red-500">-8%</span>
                <span className="text-xs text-muted-foreground ml-1">vs. mes anterior</span>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Distribución por Especialidad</CardTitle>
            <CardDescription>Porcentaje de citas por especialidad médica</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] w-full flex items-center justify-center">
              <div className="relative h-40 w-40 rounded-full border-8 border-sky-500">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BarChart className="h-8 w-8 text-sky-500" />
                </div>
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-center">
                  <div className="text-sm font-medium">Medicina General</div>
                  <div className="text-xs text-muted-foreground">28%</div>
                </div>
                <div className="absolute top-1/2 -right-24 -translate-y-1/2 text-center">
                  <div className="text-sm font-medium">Pediatría</div>
                  <div className="text-xs text-muted-foreground">21%</div>
                </div>
                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center">
                  <div className="text-sm font-medium">Cardiología</div>
                  <div className="text-xs text-muted-foreground">15%</div>
                </div>
                <div className="absolute top-1/2 -left-24 -translate-y-1/2 text-center">
                  <div className="text-sm font-medium">Ginecología</div>
                  <div className="text-xs text-muted-foreground">18%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="doctores" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Doctores más Solicitados</CardTitle>
              <CardDescription>Top 5 de médicos con mayor número de citas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Dr. Juan Rodríguez</span>
                      <span className="text-sm font-medium">42 citas</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                      <div className="h-full w-[85%] rounded-full bg-sky-500"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Dra. Ana Martínez</span>
                      <span className="text-sm font-medium">38 citas</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                      <div className="h-full w-[76%] rounded-full bg-sky-500"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Dr. Roberto Gómez</span>
                      <span className="text-sm font-medium">35 citas</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                      <div className="h-full w-[70%] rounded-full bg-sky-500"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Dra. Sofía Vargas</span>
                      <span className="text-sm font-medium">29 citas</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                      <div className="h-full w-[58%] rounded-full bg-sky-500"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Dr. Miguel Ángel Pérez</span>
                      <span className="text-sm font-medium">24 citas</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                      <div className="h-full w-[48%] rounded-full bg-sky-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Disponibilidad de Doctores</CardTitle>
              <CardDescription>Porcentaje de disponibilidad por doctor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Dr. Juan Rodríguez</span>
                      <span className="text-sm font-medium">15%</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                      <div className="h-full w-[15%] rounded-full bg-red-500"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Dra. Ana Martínez</span>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                      <div className="h-full w-[25%] rounded-full bg-yellow-500"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Dr. Roberto Gómez</span>
                      <span className="text-sm font-medium">40%</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                      <div className="h-full w-[40%] rounded-full bg-yellow-500"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Dra. Sofía Vargas</span>
                      <span className="text-sm font-medium">55%</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                      <div className="h-full w-[55%] rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Dr. Miguel Ángel Pérez</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                      <div className="h-full w-[65%] rounded-full bg-green-500"></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Satisfacción de Pacientes</CardTitle>
            <CardDescription>Valoración promedio por doctor (escala 1-5)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Dr. Juan Rodríguez</span>
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                    <div className="h-full w-[96%] rounded-full bg-green-500"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Dra. Ana Martínez</span>
                    <span className="text-sm font-medium">4.7</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                    <div className="h-full w-[94%] rounded-full bg-green-500"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Dr. Roberto Gómez</span>
                    <span className="text-sm font-medium">4.5</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                    <div className="h-full w-[90%] rounded-full bg-green-500"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Dra. Sofía Vargas</span>
                    <span className="text-sm font-medium">4.9</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                    <div className="h-full w-[98%] rounded-full bg-green-500"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Dr. Miguel Ángel Pérez</span>
                    <span className="text-sm font-medium">4.6</span>
                  </div>
                  <div className="mt-2 h-2 w-full rounded-full bg-gray-100">
                    <div className="h-full w-[92%] rounded-full bg-green-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
