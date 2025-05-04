"use client"

import { useEffect, useState } from "react"
import { FileText, Calendar, Database, Loader2 } from "lucide-react"
import { API_URL } from "@/env"

interface UploadedFile {
  id: string
  table_name: string
  created_at: string
  analysis: {
    [key: string]: string
  }
}

export default function UploadedFiles({ user_id }: { user_id: string }) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`${API_URL}/data/files?user_id=${user_id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch files")
        }
        const data = await response.json()
        if (data.success && Array.isArray(data.data)) {
          setFiles(data.data)
        } else {
          throw new Error("Invalid data format received")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchFiles()
  }, [user_id])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    )
  }

  if (files.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No files uploaded yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {files.map((file) => (
        <div
          key={file.id}
          className="bg-white rounded-lg border border-gray-200 p-4 hover:border-emerald-200 transition-all duration-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-md bg-emerald-100">
                <FileText className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{file.table_name}</h3>
                <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(file.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {file.analysis && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Analysis</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {Object.entries(file.analysis).map(([key, value], index) => (
                  <div
                    key={index}
                    className="text-xs bg-gray-50 rounded px-2 py-1 text-gray-600"
                  >
                    <span className="font-medium">{key}:</span>
                    <span className="text-gray-400 ml-1">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
} 