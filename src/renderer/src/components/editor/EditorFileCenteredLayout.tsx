import type React from 'react'
import type { ReactNode } from 'react'
import {
  buildFileEditorCenteredLayoutContentClassName,
  buildFileEditorCenteredLayoutShellClassName,
  isFileEditorCenteredLayoutEnabled
} from './file-editor-centered-layout'

export function EditorFileCenteredLayout({
  enabled,
  children
}: {
  enabled: boolean | undefined
  children: ReactNode
}): React.JSX.Element {
  if (!isFileEditorCenteredLayoutEnabled(enabled)) {
    return <>{children}</>
  }

  return (
    <div
      className={buildFileEditorCenteredLayoutShellClassName(true)}
      data-editor-centered-layout="true"
    >
      <div className={buildFileEditorCenteredLayoutContentClassName(true)}>{children}</div>
    </div>
  )
}
