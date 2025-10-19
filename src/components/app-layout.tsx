"use client";

import React from "react";
import Link from "next/link";
import { Search, Calculator, Palette, Code, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import useAppStore from "@/lib/store";

interface AppLayoutProps {
  children: React.ReactNode;
}

interface Tool {
  id: string;
  name: string;
  icon: any;
  href: string;
  meta: {
    title: string;
    description: string;
  };
}

const tools: Tool[] = [
  {
    id: "calculator",
    name: "Calculator",
    icon: Calculator,
    href: "/calculator",
    meta: { title: "Calculator", description: "Perform calculations" },
  },
  {
    id: "color-picker",
    name: "Color Picker",
    icon: Palette,
    href: "/color-picker",
    meta: { title: "Color Picker", description: "Pick and convert colors" },
  },
  {
    id: "encoder",
    name: "Encoder/Decoder",
    icon: Code,
    href: "/encoder",
    meta: { title: "Encoder / Decoder", description: "Encode and decode data" },
  },
  {
    id: "json-formatter",
    name: "JSON Formatter",
    icon: FileText,
    href: "/formatter/json",
    meta: { title: "JSON Formatter", description: "Format and minify JSON" },
  },
];

// exported metadata map so pages can import routing/meta information
export const toolsMetadata = tools.map((t) => ({
  id: t.id,
  href: t.href,
  title: t.meta.title,
  description: t.meta.description,
}));

export function AppLayout({ children }: AppLayoutProps) {
  const { selectedTool, setSelectedTool } = useAppStore();

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="p-4 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-sidebar-foreground">
            WebDev Toys
          </h1>
        </div>
        <div className="flex-1 p-4">
          <div className="space-y-2">
            {tools.map((tool) => (
              <Button
                key={tool.id}
                asChild
                variant={selectedTool === tool.id ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Link
                  href={tool.href}
                  onClick={() => setSelectedTool(tool.id)}
                  className="w-full flex items-center"
                >
                  <tool.icon className="mr-2 h-4 w-4" />
                  {tool.name}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 bg-background border-b border-border flex items-center justify-between px-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search tools..." className="pl-10" />
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
