import { describe, expect, it, vi } from 'vitest'
import { handleTerminalWorkspaceEditorShortcut } from './terminal-workspace-editor-shortcuts'

const updateSettings = vi.fn()

vi.mock('../store', () => ({
  useAppStore: {
    getState: () => ({
      activeTabType: 'editor',
      activeFileId: 'file-1',
      openFiles: [
        {
          id: 'file-1',
          filePath: '/repo/src/index.ts',
          relativePath: 'src/index.ts',
          worktreeId: 'wt-1',
          language: 'typescript',
          isDirty: false,
          mode: 'edit'
        }
      ],
      settings: { editorCenteredLayout: false },
      updateSettings
    })
  }
}))

vi.mock('@/lib/floating-workspace-terminal-actions', () => ({
  isEventTargetInsideFloatingWorkspacePanel: () => false
}))

function shortcutEvent(): KeyboardEvent {
  return {
    repeat: false,
    preventDefault: vi.fn(),
    target: null
  } as unknown as KeyboardEvent
}

describe('handleTerminalWorkspaceEditorShortcut', () => {
  it('toggles centered layout on an edit tab (#31236)', () => {
    const notifyTerminalCapture = vi.fn()
    const event = shortcutEvent()
    const consumed = handleTerminalWorkspaceEditorShortcut({
      event,
      floatingWorkspaceFocused: false,
      matchShortcut: (actionId) => actionId === 'editor.toggleCenteredLayout',
      notifyTerminalCapture
    })

    expect(consumed).toBe(true)
    expect(event.preventDefault).toHaveBeenCalledOnce()
    expect(notifyTerminalCapture).toHaveBeenCalledWith('editor.toggleCenteredLayout')
    expect(updateSettings).toHaveBeenCalledWith({ editorCenteredLayout: true })
  })

  it('ignores centered layout when the shortcut does not match', () => {
    updateSettings.mockClear()
    const consumed = handleTerminalWorkspaceEditorShortcut({
      event: shortcutEvent(),
      floatingWorkspaceFocused: false,
      matchShortcut: () => false,
      notifyTerminalCapture: vi.fn()
    })

    expect(consumed).toBe(false)
    expect(updateSettings).not.toHaveBeenCalled()
  })
})
