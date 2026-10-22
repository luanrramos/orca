export function isFileEditorCenteredLayoutEnabled(
  editorCenteredLayout: boolean | undefined
): boolean {
  return editorCenteredLayout === true
}

export function buildFileEditorCenteredLayoutShellClassName(
  editorCenteredLayout: boolean | undefined
): string {
  if (!isFileEditorCenteredLayoutEnabled(editorCenteredLayout)) {
    return 'h-full min-h-0 w-full'
  }
  return 'flex h-full min-h-0 w-full justify-center bg-editor-surface'
}

export function buildFileEditorCenteredLayoutContentClassName(
  editorCenteredLayout: boolean | undefined
): string {
  if (!isFileEditorCenteredLayoutEnabled(editorCenteredLayout)) {
    return 'h-full min-h-0 w-full'
  }
  // Why: max-w-4xl (~896px) is the closest token to VS Code's ~900px centered column.
  return 'h-full min-h-0 w-full min-w-0 max-w-4xl'
}
