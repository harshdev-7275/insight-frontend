import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Upload, X, Check, File, UploadCloud, Loader2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { API_URL } from "@/env";
import { useDropzone } from "react-dropzone";
// import { useToast } from "@/components/ui/use-toast";

export const UploadDataSection = ({user_id, email}:{user_id:string, email:string}) => {



    const [files, setFiles] = useState<File[]>([])
    const [schemaInput, setSchemaInput] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)
  



  const [recentFiles, setRecentFiles] = useState<any[]>([]);
//   const { toast } = useToast();




const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [...prev, ...acceptedFiles])
    setError(null)
  }, [])

const clearAllFiles = () => {
    setFiles([])
    setError(null)
  }
  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
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
    // Get table name from user
    const tableName = window.prompt("Please enter a name for your table:")
    if (!tableName) {
      setIsUploading(false)
      return
    }
    setSchemaInput(tableName)


    try {
      const formData = new FormData()
      formData.append("file", files[0])

        formData.append("tableName", schemaInput)
        formData.append("user_id", user_id)
        formData.append("email", email)



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



  useEffect(() => {
    const fetchFiles = async () => {
        console.log("user_id", user_id)
      try {
        const response = await fetch(`${API_URL}/data/files?user_id=${user_id}`)
        if (!response.ok) {
          throw new Error("Failed to fetch files")
        }
        const data = await response.json()
        if (data.success && Array.isArray(data.data)) {
          setRecentFiles(data.data)
        } else {
          throw new Error("Invalid data format received")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {

      }
    }

    fetchFiles()
  }, [user_id])

  return (
    <div className="p-6 w-full max-w-4xl mx-auto">
      <Card className=" bg-[#15153a]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Upload Data</CardTitle>
          <CardDescription>
            Upload your CSV files for analysis and insights
          </CardDescription>
        </CardHeader>
        <CardContent>
        <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300${
          isDragActive ? "border-emerald-500 bscale-[1.02]" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} />
        <div
          className={`p-4 rounded-full mb-4 transition-transform duration-300 ${isDragActive ? "scale-110" : ""}`}
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
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
        </CardContent>
     
        <CardFooter className="flex flex-col items-start">
        {files.length > 0 && (
        <div className="space-y-3 text-white p-4 rounded-lg border border-gray-200 bg-transparent w-full">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-400">Uploaded Files ({files.length})</h3>
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
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-2">Supported file formats:</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <File className="h-4 w-4 text-primary" />
                <span>.csv - Comma-separated values</span>
              </li>
            </ul>
          </div>
        </CardFooter>
      </Card>

      <Card className="mt-6 card-gradient border-border">
        <CardHeader>
          <CardTitle className="text-xl">Recent Uploads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isUploading ? (
              <div className="flex items-center justify-center p-4">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            ) : error ? (
              <div className="text-destructive text-center p-4">{error}</div>
            ) : recentFiles.length === 0 ? (
              <div className="text-muted-foreground text-center p-4">No files uploaded yet</div>
            ) : (
              recentFiles.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary/80" />
                    <div>
                      <p className="font-medium">{item.table_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(item.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm bg-primary/20 text-primary px-2 py-1 rounded-full">
                    <Check className="h-3.5 w-3.5" />
                    <span>Processed</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};