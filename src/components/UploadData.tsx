"use client"

import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { FileText, UploadCloud, X, Trash2, Loader2 } from "lucide-react"
import { API_URL } from "@/env"
import UploadedFiles from "./UploadedFiles"

export default function UploadData({ user_id, email }: { user_id: string, email: string }) {
  const [files, setFiles] = useState<File[]>([])
  const [schemaInput, setSchemaInput] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles])
    setError(null)
  }, [])

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const clearAllFiles = () => {
    setFiles([])
    setError(null)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  // Format file size to human-readable format
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", files[0])
      if (schemaInput) {
        formData.append("tableName", schemaInput)
        formData.append("user_id", user_id)
        formData.append("email", email)

      }

      // TODO: Replace with your actual API endpoint
      const response = await fetch(`${API_URL}/data/upload`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()
      console.log("Upload successful:", data)
      
      // Clear files after successful upload
      clearAllFiles()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during upload")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Upload Your Data</h2>
        <p className="text-gray-500 mt-1">Import your data files to get started</p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Schema Input</label>
        <div className="relative">
          <input
            type="text"
            placeholder="Enter your schema here..."
            value={schemaInput}
            onChange={(e) => setSchemaInput(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      {/* Drag & Drop area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-50 ${
          isDragActive ? "border-emerald-500 bg-emerald-50 scale-[1.02]" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        <div
          className={`p-4 rounded-full bg-emerald-100 mb-4 transition-transform duration-300 ${isDragActive ? "scale-110" : ""}`}
        >
          <UploadCloud className="w-8 h-8 text-emerald-600" />
        </div>
        <p className="text-sm font-medium text-gray-700">
          {isDragActive ? "Drop your files here!" : "Drag & drop files here"}
        </p>
        <p className="text-xs text-gray-500 mt-1">- or -</p>
        <button className="mt-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200">
          Browse files
        </button>
        <p className="text-xs text-gray-500 mt-3">Supports CSV, JSON, and Excel files</p>
      </div>

      {/* Error message */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* File Previews */}
      {files.length > 0 && (
        <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">Uploaded Files ({files.length})</h3>
            <button
              onClick={clearAllFiles}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors duration-200"
            >
              <Trash2 className="w-3 h-3" />
              Clear all
            </button>
          </div>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-200 transition-all duration-200"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2 rounded-md bg-emerald-100 flex-shrink-0">
                    <FileText className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium text-gray-700 truncate max-w-[180px]">{file.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  aria-label="Remove file"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {files.length > 0 && (
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="w-full py-2.5 px-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-200 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Uploading...
            </>
          ) : (
            `Process ${files.length} ${files.length === 1 ? "File" : "Files"}`
          )}
        </button>
      )}

      {/* Display uploaded files */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Your Uploaded Files</h3>
        <UploadedFiles user_id={user_id} />
      </div>
    </div>
  )
}
