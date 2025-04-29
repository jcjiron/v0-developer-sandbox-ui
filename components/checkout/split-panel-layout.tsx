"use client"

import type React from "react"

import { type ReactNode, useRef, useState, useEffect } from "react"
import { Maximize2, Minimize2, GripVertical } from "lucide-react"

interface SplitPanelLayoutProps {
  leftPanel: ReactNode
  rightPanel: ReactNode
}

export function SplitPanelLayout({ leftPanel, rightPanel }: SplitPanelLayoutProps) {
  const [leftPanelWidth, setLeftPanelWidth] = useState(50) // Default 50%
  const [isResizing, setIsResizing] = useState(false)
  const [isLeftPanelCollapsed, setIsLeftPanelCollapsed] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const newLeftPanelWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100

      // Limit the minimum width of both panels
      if (newLeftPanelWidth >= 20 && newLeftPanelWidth <= 80) {
        setLeftPanelWidth(newLeftPanelWidth)
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing])

  const toggleLeftPanel = () => {
    setIsLeftPanelCollapsed(!isLeftPanelCollapsed)
  }

  return (
    <div ref={containerRef} className="flex flex-1 overflow-hidden">
      {/* Left Panel */}
      <div
        className={`bg-white overflow-auto transition-all duration-300 ${isLeftPanelCollapsed ? "w-0" : ""}`}
        style={{ width: isLeftPanelCollapsed ? "0%" : `${leftPanelWidth}%` }}
      >
        <div className="p-4">{leftPanel}</div>
      </div>

      {/* Resizable Divider */}
      <div
        ref={dividerRef}
        className={`w-1 bg-gray-200 relative cursor-col-resize hover:bg-blue-400 active:bg-blue-600 ${isLeftPanelCollapsed ? "hidden" : ""}`}
        onMouseDown={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-10 flex items-center justify-center bg-gray-200 rounded">
          <GripVertical className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* Toggle Button */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-1 rounded-r-md shadow-md border border-l-0"
        onClick={toggleLeftPanel}
      >
        {isLeftPanelCollapsed ? (
          <Maximize2 className="w-4 h-4 text-gray-600" />
        ) : (
          <Minimize2 className="w-4 h-4 text-gray-600" />
        )}
      </button>

      {/* Right Panel */}
      <div
        className="flex-1 overflow-auto p-6"
        style={{ width: isLeftPanelCollapsed ? "100%" : `${100 - leftPanelWidth}%` }}
      >
        {rightPanel}
      </div>
    </div>
  )
}
