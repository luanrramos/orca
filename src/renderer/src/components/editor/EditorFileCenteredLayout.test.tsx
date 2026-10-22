import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { EditorFileCenteredLayout } from './EditorFileCenteredLayout'

describe('EditorFileCenteredLayout', () => {
  it('leaves children unwrapped when the preference is off', () => {
    const html = renderToStaticMarkup(
      <EditorFileCenteredLayout enabled={false}>
        <div data-editor-surface="code" />
      </EditorFileCenteredLayout>
    )

    expect(html).toBe('<div data-editor-surface="code"></div>')
  })

  it('wraps children in a centered max-width column when enabled', () => {
    const html = renderToStaticMarkup(
      <EditorFileCenteredLayout enabled>
        <div data-editor-surface="code" />
      </EditorFileCenteredLayout>
    )

    expect(html).toContain('data-editor-centered-layout="true"')
    expect(html).toContain('justify-center')
    expect(html).toContain('max-w-4xl')
    expect(html).toContain('data-editor-surface="code"')
  })
})
