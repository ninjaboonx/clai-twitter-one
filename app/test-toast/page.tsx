"use client"

import { useState } from "react"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { CheckCircle, AlertCircle, Info, Clock, RefreshCw } from "lucide-react"

export default function TestToastPage() {
  const { toast } = useToast()
  const [title, setTitle] = useState("Toast Notification")
  const [description, setDescription] = useState("This is a toast notification message.")
  const [duration, setDuration] = useState(5000)
  const [withAction, setWithAction] = useState(false)

  const showToast = (variant: "default" | "destructive" = "default") => {
    const toastOptions: any = {
      title,
      description,
      duration,
      variant,
    }

    if (withAction) {
      toastOptions.action = (
        <Button variant="outline" size="sm" onClick={() => console.log("Toast action clicked")}>
          Undo
        </Button>
      )
    }

    toast(toastOptions)
  }

  const showSuccessToast = () => {
    toast({
      title: "Success!",
      description: "The operation was completed successfully.",
      variant: "default",
    })
  }

  const showErrorToast = () => {
    toast({
      title: "Error!",
      description: "An error occurred while performing the operation.",
      variant: "destructive",
    })
  }

  const showInfoToast = () => {
    toast({
      title: "Information",
      description: "Here's some information you might find useful.",
      variant: "default",
    })
  }

  const showLoadingToast = () => {
    toast({
      title: "Loading...",
      description: (
        <div className="flex items-center">
          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
          <span>Please wait while we process your request.</span>
        </div>
      ),
      duration: 10000,
    })
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Toast Notification Test"
        text="Test the toast notification system to ensure it's working correctly."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Test</CardTitle>
            <CardDescription>Test different types of toast notifications with a single click.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={showSuccessToast} className="flex items-center">
                <CheckCircle className="mr-2 h-4 w-4" />
                Success Toast
              </Button>
              <Button onClick={showErrorToast} variant="destructive" className="flex items-center">
                <AlertCircle className="mr-2 h-4 w-4" />
                Error Toast
              </Button>
              <Button onClick={showInfoToast} variant="outline" className="flex items-center">
                <Info className="mr-2 h-4 w-4" />
                Info Toast
              </Button>
              <Button onClick={showLoadingToast} variant="secondary" className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Loading Toast
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Custom Toast</CardTitle>
            <CardDescription>Customize and test your own toast notification.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter toast title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter toast description"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="duration">Duration (ms): {duration}</Label>
              </div>
              <Slider
                id="duration"
                min={1000}
                max={10000}
                step={1000}
                value={[duration]}
                onValueChange={(value) => setDuration(value[0])}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="with-action" checked={withAction} onCheckedChange={setWithAction} />
              <Label htmlFor="with-action">Include action button</Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => showToast()}>
              Show Default Toast
            </Button>
            <Button variant="destructive" onClick={() => showToast("destructive")}>
              Show Destructive Toast
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Toast Notification System Test Results</CardTitle>
            <CardDescription>
              Use this page to verify that the toast notification system is working correctly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="instructions">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="instructions">Test Instructions</TabsTrigger>
                <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
              </TabsList>
              <TabsContent value="instructions" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">How to Test Toast Notifications</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Use the "Quick Test" section to test predefined toast notifications.</li>
                    <li>Use the "Custom Toast" section to create and test your own toast notifications.</li>
                    <li>Verify that toasts appear in the correct position (top-right by default).</li>
                    <li>Check that toasts automatically dismiss after the specified duration.</li>
                    <li>Test that action buttons in toasts work correctly.</li>
                    <li>Verify that multiple toasts stack correctly.</li>
                  </ol>
                </div>
              </TabsContent>
              <TabsContent value="troubleshooting" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Troubleshooting</h3>
                  <div className="space-y-4">
                    <div className="rounded-md bg-muted p-4">
                      <h4 className="text-sm font-medium">Toasts Not Appearing</h4>
                      <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground">
                        <li>Check that the Toaster component is included in your layout.</li>
                        <li>Verify that useToast is being imported correctly.</li>
                        <li>Check the browser console for any errors.</li>
                      </ul>
                    </div>
                    <div className="rounded-md bg-muted p-4">
                      <h4 className="text-sm font-medium">Styling Issues</h4>
                      <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground">
                        <li>Ensure your toast.tsx and toaster.tsx files have the correct styles.</li>
                        <li>Check that your theme provider is working correctly.</li>
                        <li>Verify that the toast variants are defined correctly.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
