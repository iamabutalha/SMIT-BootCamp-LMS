import { useState } from 'react';
import { toast } from 'sonner';
import {
  Bell,
  Info,
  Sparkles,
  Calendar as CalendarIcon,
} from 'lucide-react';

// UI Library Imports (using @/components/ui/ alias)
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { PageHeader } from '@/components/common/PageHeader';
import DashboardLayout from '@/layouts/DashboardLayout';

export function ComponentShowcase() {
  const [date, setDate] = useState(new Date());
  const [switchChecked, setSwitchChecked] = useState(true);
  const [progressVal] = useState(65);
  const [sliderVal, setSliderVal] = useState([40]);

  return (
    <TooltipProvider>
      <div className="space-y-8 pb-12">
        <PageHeader
          title="UI Component Library Showcase"
          subtitle="Verification suite for the integrated shadcn/ui JSX component library"
          action={
            <Button onClick={() => toast.success('Sonner toast notification working!')}>
              <Bell className="w-4 h-4 mr-2" /> Test Toast
            </Button>
          }
        />

        {/* Buttons & Badges Section */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons & Badges</CardTitle>
            <CardDescription>Radix-backed button and badge variants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Badge variant="default">Default Badge</Badge>
              <Badge variant="secondary">Secondary Badge</Badge>
              <Badge variant="outline">Outline Badge</Badge>
              <Badge variant="destructive">Destructive Badge</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Information Alert</AlertTitle>
            <AlertDescription>
              The component library is cleanly integrated with Tailwind design tokens.
            </AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <Sparkles className="h-4 w-4" />
            <AlertTitle>Destructive Alert</AlertTitle>
            <AlertDescription>
              Validation warning or critical alert notification example.
            </AlertDescription>
          </Alert>
        </div>

        {/* Form Controls & Switches */}
        <Card>
          <CardHeader>
            <CardTitle>Form Controls & Toggles</CardTitle>
            <CardDescription>Inputs, Selects, Checkboxes, Switches, and Sliders</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-slate-600">Input Field</label>
              <Input placeholder="Type something..." />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-slate-600">Select Dropdown</label>
              <Select defaultValue="student">
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="mentor">Mentor</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-slate-600">Date Picker (Popover)</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? date.toDateString() : 'Pick a date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center gap-3">
              <Checkbox id="demo-check" defaultChecked />
              <label htmlFor="demo-check" className="text-sm font-medium text-slate-700 cursor-pointer">
                Enable Notifications
              </label>
            </div>

            <div className="flex items-center gap-3">
              <Switch id="demo-switch" checked={switchChecked} onCheckedChange={setSwitchChecked} />
              <label htmlFor="demo-switch" className="text-sm font-medium text-slate-700 cursor-pointer">
                Dark Mode Toggle
              </label>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase text-slate-600">Slider ({sliderVal[0]}%)</label>
              <Slider value={sliderVal} onValueChange={setSliderVal} max={100} step={1} />
            </div>
          </CardContent>
        </Card>

        {/* Tabs, Data Table & Modals */}
        <Card>
          <CardHeader>
            <CardTitle>Tabs & Data Display</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="table" className="w-full">
              <TabsList>
                <TabsTrigger value="table">Data Table</TabsTrigger>
                <TabsTrigger value="accordion">Accordion</TabsTrigger>
                <TabsTrigger value="progress">Progress & Skeleton</TabsTrigger>
              </TabsList>

              <TabsContent value="table" className="pt-4 space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { name: 'Ali Jan', role: 'Student', status: 'Active' },
                      { name: 'Shah Faisal', role: 'Mentor', status: 'Active' },
                      { name: 'Abu Talha', role: 'Admin', status: 'Active' },
                    ].map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{row.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <span className="font-semibold">{row.name}</span>
                        </TableCell>
                        <TableCell>{row.role}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{row.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                Options
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </TabsContent>

              <TabsContent value="accordion" className="pt-4">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Is this UI library fully compatible with React 19?</AccordionTrigger>
                    <AccordionContent>
                      Yes, all components are built on Radix primitives and styled with Tailwind CSS.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>How do Faizan and Muzamil use these components?</AccordionTrigger>
                    <AccordionContent>
                      They can import components directly using `@/components/ui/button`, `@/components/ui/card`, etc.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              <TabsContent value="progress" className="pt-4 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Task Completion Rate</span>
                    <span>{progressVal}%</span>
                  </div>
                  <Progress value={progressVal} />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500">Skeleton Loaders</label>
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open Dialog Test</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Shadcn Dialog Component</DialogTitle>
                  <DialogDescription>
                    Radix-backed accessible dialog modal trigger test.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="primary">Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" icon={<Info className="w-4 h-4" />}>
                  Hover Tooltip Test
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tooltip component is working!</p>
              </TooltipContent>
            </Tooltip>
          </CardFooter>
        </Card>
      </div>
    </TooltipProvider>
  );
}

export function ComponentShowcaseWrapper() {
  return <DashboardLayout />;
}

export default ComponentShowcase;
