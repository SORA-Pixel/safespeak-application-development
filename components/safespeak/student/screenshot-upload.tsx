'use client'

import { useId } from 'react'
import { ImageUp, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

interface ScreenshotUploadProps {
  file: { url: string; name: string } | null
  onFileChange: (file: { url: string; name: string } | null) => void
  privacyShield: boolean
  onPrivacyShieldChange: (on: boolean) => void
}

export function ScreenshotUpload({
  file,
  onFileChange,
  privacyShield,
  onPrivacyShieldChange,
}: ScreenshotUploadProps) {
  const inputId = useId()
  const shieldId = useId()

  function handleFiles(files: FileList | null) {
    const f = files?.[0]
    if (!f || !f.type.startsWith('image/')) return
    onFileChange({ url: URL.createObjectURL(f), name: f.name })
  }

  return (
    <div className="flex flex-col gap-4">
      {file ? (
        <div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50 p-3">
          <div className="relative mx-auto max-h-72 w-fit overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
            <img
              src={file.url}
              alt={`Preview of ${file.name}${privacyShield ? ' with privacy blur applied' : ''}`}
              className={cn('max-h-72 w-auto object-contain transition-[filter] duration-300', privacyShield && 'blur-md')}
            />
            {privacyShield && (
              <span className="absolute inset-x-0 bottom-2 mx-auto w-fit rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-violet-800 shadow-sm">
                {'🎭 Faces & handles blurred'}
              </span>
            )}
          </div>
          <div className="mt-2 flex items-center justify-between gap-2 text-sm">
            <span className="truncate text-muted-foreground">{file.name}</span>
            <Button type="button" variant="ghost" size="sm" onClick={() => onFileChange(null)}>
              <X aria-hidden />
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <label
          htmlFor={inputId}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault()
            handleFiles(e.dataTransfer.files)
          }}
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/60 px-4 py-8 text-center transition-colors hover:border-violet-300 hover:bg-violet-50 has-focus-visible:ring-3 has-focus-visible:ring-ring/50"
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-violet-200 text-violet-800">
            <ImageUp className="size-6" aria-hidden />
          </span>
          <span className="font-display text-base font-semibold">Tap to add a screenshot</span>
          <span className="text-xs text-muted-foreground">or drag & drop an image here</span>
          <input
            id={inputId}
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </label>
      )}

      <div className="flex items-center justify-between gap-4 rounded-2xl bg-secondary px-4 py-3">
        <label htmlFor={shieldId} className="flex flex-col">
          <span className="font-display text-base font-semibold text-secondary-foreground">
            {'🎭 Privacy Shield: Auto-blur faces & handles'}
          </span>
          <span className="text-xs text-secondary-foreground/80">
            {'Keeps names and faces hidden — even from us.'}
          </span>
        </label>
        <Switch id={shieldId} checked={privacyShield} onCheckedChange={onPrivacyShieldChange} />
      </div>
    </div>
  )
}
