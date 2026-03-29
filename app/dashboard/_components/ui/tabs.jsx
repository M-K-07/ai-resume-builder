"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "../../../../lib/utils"

function Tabs({
  className,
  ...props
}) {
  return (
    (<TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props} />)
  );
}

function TabsList({
  className,
  ...props
}) {
  return (
    (<TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex items-center justify-start border-b border-white/10 text-muted-foreground w-full p-0 bg-transparent rounded-none",
        className
      )}
      {...props} />)
  );
}

function TabsTrigger({
  className,
  ...props
}) {
  return (
    (<TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap px-3 py-2 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 border-b-2 border-transparent data-[state=active]:border-purple-500 data-[state=active]:text-purple-400 data-[state=active]:shadow-none text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 bg-transparent rounded-none focus-visible:outline-none mb-[-1px] [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      )}
      {...props} />)
  );
}

function TabsContent({
  className,
  ...props
}) {
  return (
    (<TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props} />)
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
