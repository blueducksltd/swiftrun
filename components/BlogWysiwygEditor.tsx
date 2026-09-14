'use client'

import { useState, useRef, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { FontFamily } from '@tiptap/extension-font-family'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'
import {
    FiBold,
    FiItalic,
    FiUnderline,
    FiCode,
    FiList,
    FiLink,
    FiImage,
    FiAlignLeft,
    FiAlignCenter,
    FiAlignRight,
    FiAlignJustify,
    FiRotateCcw,
    FiRotateCw,
    FiEye,
    FiEdit3,
    FiGrid,
    FiPlus,
    FiTrash2,
    FiUploadCloud,
    FiX,
    FiMessageSquare,
    FiMinus,
    FiDroplet,
    FiType,
} from 'react-icons/fi'

type Props = {
    initialContent?: string
    name?: string
    onChange?: (html: string) => void
    minHeight?: string
}

const FONT_OPTIONS = [
    { label: 'Font: Default', value: '' },
    { label: 'Sora (Brand)', value: 'var(--font-primary), sans-serif' },
    { label: 'Bricolage (Heading)', value: 'var(--font-heading), sans-serif' },
    { label: 'Inter (Sans)', value: 'Inter, system-ui, -apple-system, sans-serif' },
    { label: 'Georgia (Serif)', value: 'Georgia, Cambria, "Times New Roman", serif' },
    { label: 'Monospace (Code)', value: 'ui-monospace, SFMono-Regular, Menlo, Monaco, monospace' },
    { label: 'Impact (Headline)', value: 'Impact, "Franklin Gothic Bold", sans-serif' },
]

const PRESET_COLORS = [
    { name: 'Default Dark', color: '#1A2A30' },
    { name: 'SwiftRun Blue', color: '#066AC0' },
    { name: 'Deep Navy', color: '#063F70' },
    { name: 'Emerald Green', color: '#00D4AC' },
    { name: 'Forest Teal', color: '#267D73' },
    { name: 'Bright Yellow', color: '#FFF100' },
    { name: 'Warm Amber', color: '#D97706' },
    { name: 'Sunset Orange', color: '#EA580C' },
    { name: 'Crimson Red', color: '#DC2626' },
    { name: 'Berry Pink', color: '#DB2777' },
    { name: 'Royal Purple', color: '#7C3AED' },
    { name: 'Muted Gray', color: '#718187' },
]

export default function BlogWysiwygEditor({
    initialContent = '',
    name = 'content',
    onChange,
    minHeight = '360px',
}: Props) {
    const [htmlValue, setHtmlValue] = useState(initialContent)
    const [activeTab, setActiveTab] = useState<'write' | 'preview'>('write')
    const [isUploadingImage, setIsUploadingImage] = useState(false)
    const [imageModalOpen, setImageModalOpen] = useState(false)
    const [imageUrlInput, setImageUrlInput] = useState('')
    const [imageAltInput, setImageAltInput] = useState('')
    const [linkModalOpen, setLinkModalOpen] = useState(false)
    const [linkUrlInput, setLinkUrlInput] = useState('')
    const [tableMenuOpen, setTableMenuOpen] = useState(false)
    const [colorMenuOpen, setColorMenuOpen] = useState(false)
    const [uploadError, setUploadError] = useState('')
    const [isMounted, setIsMounted] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null)
    const colorMenuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                colorMenuRef.current &&
                !colorMenuRef.current.contains(event.target as Node)
            ) {
                setColorMenuOpen(false)
            }
        }
        if (colorMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [colorMenuOpen])

    const uploadFile = async (file: File): Promise<string> => {
        const formData = new FormData()
        formData.append('file', file)

        const response = await fetch('/api/admin/upload', {
            method: 'POST',
            body: formData,
        })

        const result = await response.json()
        if (!response.ok) {
            throw new Error(result.error || 'Failed to upload image')
        }

        const rawUrl = result.url as string
        return rawUrl.startsWith('http')
            ? `/api/blogs/blob?url=${encodeURIComponent(rawUrl)}`
            : rawUrl
    }

    const handleFileUpload = async (file: File, altText = '') => {
        if (!file.type.startsWith('image/')) {
            setUploadError('Only image files (JPEG, PNG, WebP) are allowed.')
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            setUploadError('Image size must be smaller than 5MB.')
            return
        }

        setIsUploadingImage(true)
        setUploadError('')

        try {
            const finalUrl = await uploadFile(file)
            if (editor) {
                editor
                    .chain()
                    .focus()
                    .setImage({
                        src: finalUrl,
                        alt: altText || file.name.replace(/\.[^/.]+$/, ''),
                    })
                    .run()
            }
            setImageModalOpen(false)
            setImageUrlInput('')
            setImageAltInput('')
        } catch (err) {
            setUploadError(
                err instanceof Error ? err.message : 'Error uploading image',
            )
        } finally {
            setIsUploadingImage(false)
        }
    }

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            TextStyle,
            Color,
            FontFamily,
            Underline,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    class: 'blog-link',
                },
            }),
            Image.configure({
                inline: false,
                allowBase64: false,
                HTMLAttributes: {
                    class: 'blog-editor-img rounded-xl max-w-full my-4 border border-[#e2eae7]',
                },
            }),
            Placeholder.configure({
                placeholder: 'Write your story here... format text, add headings, quotes, lists, links, or drop images directly into this box.',
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Highlight.configure({
                multicolor: false,
                HTMLAttributes: {
                    class: 'bg-amber-100 text-amber-950 px-1 py-0.5 rounded',
                },
            }),
            Table.configure({
                resizable: true,
                HTMLAttributes: {
                    class: 'blog-table my-4 w-full border-collapse border border-[#d9e5e1]',
                },
            }),
            TableRow,
            TableHeader,
            TableCell,
        ],
        content: initialContent,
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[300px] p-5 blog-content',
            },
            handleDrop: (view, event, slice, moved) => {
                if (
                    !moved &&
                    event.dataTransfer &&
                    event.dataTransfer.files &&
                    event.dataTransfer.files.length > 0
                ) {
                    const file = event.dataTransfer.files[0]
                    if (file.type.startsWith('image/')) {
                        event.preventDefault()
                        handleFileUpload(file)
                        return true
                    }
                }
                return false
            },
            handlePaste: (view, event) => {
                const items = event.clipboardData?.items
                if (items) {
                    for (let i = 0; i < items.length; i++) {
                        if (items[i].type.startsWith('image/')) {
                            const file = items[i].getAsFile()
                            if (file) {
                                event.preventDefault()
                                handleFileUpload(file)
                                return true
                            }
                        }
                    }
                }
                return false
            },
        },
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            setHtmlValue(html)
            onChange?.(html)
        },
    })

    const openLinkModal = () => {
        if (!editor) return
        const previousUrl = editor.getAttributes('link').href || ''
        setLinkUrlInput(previousUrl)
        setLinkModalOpen(true)
    }

    const setLink = () => {
        if (!editor) return
        if (linkUrlInput === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
        } else {
            const url =
                linkUrlInput.startsWith('http://') ||
                linkUrlInput.startsWith('https://') ||
                linkUrlInput.startsWith('mailto:') ||
                linkUrlInput.startsWith('tel:')
                    ? linkUrlInput
                    : `https://${linkUrlInput}`

            editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: url })
                .run()
        }
        setLinkModalOpen(false)
        setLinkUrlInput('')
    }

    const removeLink = () => {
        if (!editor) return
        editor.chain().focus().unsetLink().run()
        setLinkModalOpen(false)
        setLinkUrlInput('')
    }

    const insertImageUrl = () => {
        if (!editor || !imageUrlInput.trim()) return
        const url = imageUrlInput.trim()
        editor
            .chain()
            .focus()
            .setImage({
                src: url,
                alt: imageAltInput.trim() || 'Blog image',
            })
            .run()
        setImageModalOpen(false)
        setImageUrlInput('')
        setImageAltInput('')
    }

    // Active marks
    const currentColor = editor?.getAttributes('textStyle').color || ''
    const currentFontFamily = editor?.getAttributes('textStyle').fontFamily || ''

    // Word and character count calculation
    const textContent = editor?.getText() || ''
    const wordCount = textContent.trim()
        ? textContent.trim().split(/\s+/).length
        : 0
    const charCount = textContent.length
    const readingTime = Math.max(1, Math.ceil(wordCount / 200))

    if (!isMounted) {
        return (
            <div className="flex h-72 w-full items-center justify-center rounded-2xl border border-[#d9e5e1] bg-[#f8faf9]">
                <span className="h-6 w-6 animate-spin rounded-full border-2 border-[#066ac0]/30 border-t-[#066ac0]" />
            </div>
        )
    }

    return (
        <div className="relative flex flex-col rounded-2xl border border-[#d9e5e1] bg-white shadow-xs focus-within:border-[#066ac0] focus-within:ring-2 focus-within:ring-[#066ac0]/10 transition-all">
            {/* Hidden input for HTML form submissions */}
            <input type="hidden" name={name} value={htmlValue} />

            {/* Top Toolbar Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#edf1ef] bg-[#f8faf9] px-3 py-2.5 rounded-t-2xl">
                {/* Formatting Tools */}
                <div className="flex flex-wrap items-center gap-1">
                    {/* Undo / Redo */}
                    <div className="flex items-center border-r border-[#d9e5e1] pr-1.5 mr-1">
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().undo().run()}
                            disabled={!editor?.can().undo()}
                            className="rounded-lg p-1.5 text-sm text-[#52656b] transition hover:bg-white hover:text-black disabled:opacity-30"
                            title="Undo (Ctrl+Z)"
                        >
                            <FiRotateCcw className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() => editor?.chain().focus().redo().run()}
                            disabled={!editor?.can().redo()}
                            className="rounded-lg p-1.5 text-sm text-[#52656b] transition hover:bg-white hover:text-black disabled:opacity-30"
                            title="Redo (Ctrl+Y)"
                        >
                            <FiRotateCw className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Font Family Selector */}
                    <div className="flex items-center border-r border-[#d9e5e1] pr-1.5 mr-1 gap-1">
                        <FiType className="h-3.5 w-3.5 text-[#718187]" />
                        <select
                            value={currentFontFamily}
                            onChange={(e) => {
                                const font = e.target.value
                                if (!font) {
                                    editor?.chain().focus().unsetFontFamily().run()
                                } else {
                                    editor?.chain().focus().setFontFamily(font).run()
                                }
                            }}
                            className="rounded-lg border border-[#d9e5e1] bg-white px-2 py-1 text-xs text-[#40535a] outline-none hover:border-[#066ac0] focus:border-[#066ac0] transition cursor-pointer"
                            title="Choose Font Family"
                        >
                            {FONT_OPTIONS.map((f) => (
                                <option key={f.label} value={f.value}>
                                    {f.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Headings Selector */}
                    <div className="flex items-center border-r border-[#d9e5e1] pr-1.5 mr-1 gap-1">
                        <button
                            type="button"
                            onClick={() =>
                                editor?.chain().focus().setParagraph().run()
                            }
                            className={`rounded-lg px-2 py-1 text-xs font-semibold transition ${
                                editor?.isActive('paragraph') &&
                                !editor?.isActive('heading')
                                    ? 'bg-[#066ac0] text-white shadow-xs'
                                    : 'text-[#52656b] hover:bg-white'
                            }`}
                            title="Normal Paragraph"
                        >
                            P
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                editor
                                    ?.chain()
                                    .focus()
                                    .toggleHeading({ level: 1 })
                                    .run()
                            }
                            className={`rounded-lg px-2 py-1 text-xs font-bold transition ${
                                editor?.isActive('heading', { level: 1 })
                                    ? 'bg-[#066ac0] text-white shadow-xs'
                                    : 'text-[#52656b] hover:bg-white'
                            }`}
                            title="Heading 1"
                        >
                            H1
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                editor
                                    ?.chain()
                                    .focus()
                                    .toggleHeading({ level: 2 })
                                    .run()
                            }
                            className={`rounded-lg px-2 py-1 text-xs font-bold transition ${
                                editor?.isActive('heading', { level: 2 })
                                    ? 'bg-[#066ac0] text-white shadow-xs'
                                    : 'text-[#52656b] hover:bg-white'
                            }`}
                            title="Heading 2"
                        >
                            H2
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                editor
                                    ?.chain()
                                    .focus()
                                    .toggleHeading({ level: 3 })
                                    .run()
                            }
                            className={`rounded-lg px-2 py-1 text-xs font-bold transition ${
                                editor?.isActive('heading', { level: 3 })
                                    ? 'bg-[#066ac0] text-white shadow-xs'
                                    : 'text-[#52656b] hover:bg-white'
                            }`}
                            title="Heading 3"
                        >
                            H3
                        </button>
                    </div>

                    {/* Text Styling */}
                    <div className="flex items-center border-r border-[#d9e5e1] pr-1.5 mr-1 gap-0.5">
                        <button
                            type="button"
                            onClick={() =>
                                editor?.chain().focus().toggleBold().run()
                            }
                            className={`rounded-lg p-1.5 text-sm transition ${
                                editor?.isActive('bold')
                                    ? 'bg-[#066ac0] text-white'
                                    : 'text-[#52656b] hover:bg-white'
                            }`}
                            title="Bold (Ctrl+B)"
                        >
                            <FiBold className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                editor?.chain().focus().toggleItalic().run()
                            }
                            className={`rounded-lg p-1.5 text-sm transition ${
                                editor?.isActive('italic')
                                    ? 'bg-[#066ac0] text-white'
                                    : 'text-[#52656b] hover:bg-white'
                            }`}
                            title="Italic (Ctrl+I)"
                        >
                            <FiItalic className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                editor?.chain().focus().toggleUnderline().run()
                            }
                            className={`rounded-lg p-1.5 text-sm transition ${
                                editor?.isActive('underline')
                                    ? 'bg-[#066ac0] text-white'
                                    : 'text-[#52656b] hover:bg-white'
                            }`}
                            title="Underline (Ctrl+U)"
                        >
                            <FiUnderline className="h-4 w-4" />
                        </button>

                        {/* Color Picker Dropdown */}
                        <div className="relative" ref={colorMenuRef}>
                            <button
                                type="button"
                                onClick={() => setColorMenuOpen(!colorMenuOpen)}
                                className={`flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold transition ${
                                    currentColor
                                        ? 'bg-white shadow-2xs border border-[#d9e5e1]'
                                        : 'text-[#52656b] hover:bg-white'
                                }`}
                                title="Change Text Color"
                            >
                                <FiDroplet
                                    className="h-3.5 w-3.5"
                                    style={{ color: currentColor || '#066ac0' }}
                                />
                                <span
                                    className="h-2.5 w-2.5 rounded-full border border-black/20 shadow-2xs"
                                    style={{
                                        backgroundColor: currentColor || '#1a2a30',
                                    }}
                                />
                            </button>

                            {colorMenuOpen && (
                                <div className="absolute left-0 top-full z-40 mt-1 w-56 rounded-2xl border border-[#d9e5e1] bg-white p-3 shadow-xl animate-in fade-in duration-100">
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#718187]">
                                            Text Color
                                        </span>
                                        {currentColor && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    editor
                                                        ?.chain()
                                                        .focus()
                                                        .unsetColor()
                                                        .run()
                                                    setColorMenuOpen(false)
                                                }}
                                                className="text-[10px] text-red-600 hover:underline"
                                            >
                                                Reset
                                            </button>
                                        )}
                                    </div>

                                    {/* Preset Swatches */}
                                    <div className="grid grid-cols-6 gap-1.5 mb-3">
                                        {PRESET_COLORS.map((c) => (
                                            <button
                                                key={c.color}
                                                type="button"
                                                onClick={() => {
                                                    editor
                                                        ?.chain()
                                                        .focus()
                                                        .setColor(c.color)
                                                        .run()
                                                    setColorMenuOpen(false)
                                                }}
                                                className="h-6 w-6 rounded-full border border-black/15 transition hover:scale-110 shadow-2xs relative"
                                                style={{ backgroundColor: c.color }}
                                                title={c.name}
                                            >
                                                {currentColor === c.color && (
                                                    <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold">
                                                        ✓
                                                    </span>
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Custom Color Input */}
                                    <div className="flex items-center gap-2 pt-2 border-t border-[#edf1ef]">
                                        <input
                                            type="color"
                                            value={currentColor || '#066ac0'}
                                            onChange={(e) =>
                                                editor
                                                    ?.chain()
                                                    .focus()
                                                    .setColor(e.target.value)
                                                    .run()
                                            }
                                            className="h-7 w-7 rounded-lg border border-[#d9e5e1] cursor-pointer"
                                            title="Custom Color"
                                        />
                                        <span className="text-xs text-[#52656b] font-mono">
                                            {currentColor || 'Default'}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Highlight */}
                        <button
                            type="button"
                            onClick={() =>
                                editor?.chain().focus().toggleHighlight().run()
                            }
                            className={`rounded-lg px-2 py-1 text-xs font-bold transition ${
                                editor?.isActive('highlight')
                                    ? 'bg-amber-400 text-amber-950 font-bold'
                                    : 'text-[#52656b] hover:bg-white'
                            }`}
                            title="Highlight Text"
                        >
                            <span className="bg-amber-200 px-1 rounded text-[11px]">
                                HL
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                editor?.chain().focus().toggleCode().run()
                            }
                            className={`rounded-lg p-1.5 text-sm transition ${
                                editor?.isActive('code')
                                    ? 'bg-[#066ac0] text-white'
                                    : 'text-[#52656b] hover:bg-white'
                            }`}
                            title="Inline Code"
                        >
                            <FiCode className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Text Alignment */}
                    <div className="flex items-center border-r border-[#d9e5e1] pr-1.5 mr-1 gap-0.5">
                        <button
                            type="button"
                            onClick={() =>
                                editor
                                    ?.chain()
                                    .focus()
                                    .setTextAlign('left')
                                    .run()
                            }
                            className={`rounded-lg p-1.5 text-sm transition ${
                                editor?.isActive({ textAlign: 'left' })
                                    ? 'bg-[#066ac0] text-white'
                                    : 'text-[#52656b] hover:bg-white'
                            }`}
                            title="Align Left"
                        >
                            <FiAlignLeft className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                editor
                                    ?.chain()
                                    .focus()
                                    .setTextAlign('center')
                                    .run()
                            }
                            className={`rounded-lg p-1.5 text-sm transition ${
                                editor?.isActive({ textAlign: 'center' })
                                    ? 'bg-[#066ac0] text-white'
                                    : 'text-[#52656b] hover:bg-white'
                            }`}
                            title="Align Center"
                        >
                            <FiAlignCenter className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                editor
                                    ?.chain()
                                    .focus()
                                    .setTextAlign('right')
                                    .run()
                            }
                            className={`rounded-lg p-1.5 text-sm transition ${
                                editor?.isActive({ textAlign: 'right' })
                                    ? 'bg-[#066ac0] text-white'
                                    : 'text-[#52656b] hover:bg-white'
                            }`}
                            title="Align Right"
                        >
                            <FiAlignRight className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                editor
                                    ?.chain()
                                    .focus()
                                    .setTextAlign('justify')
                                    .run()
                            }
                            className={`rounded-lg p-1.5 text-sm transition ${
                                editor?.isActive({ textAlign: 'justify' })
                                    ? 'bg-[#066ac0] text-white'
                                    : 'text-[#52656b] hover:bg-white'
                            }`}
                            title="Align Justify"
                        >
                            <FiAlignJustify className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Lists, Quotes, Divider */}
                    <div className="flex items-center border-r border-[#d9e5e1] pr-1.5 mr-1 gap-0.5">
                        <button
                            type="button"
                            onClick={() =>
                                editor?.chain().focus().toggleBulletList().run()
                            }
                            className={`rounded-lg p-1.5 text-sm transition ${
                                editor?.isActive('bulletList')
                                    ? 'bg-[#066ac0] text-white'
                                    : 'text-[#52656b] hover:bg-white'
                            }`}
                            title="Bulleted List"
                        >
                            <FiList className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                editor
                                    ?.chain()
                                    .focus()
                                    .toggleOrderedList()
                                    .run()
                            }
                            className={`rounded-lg px-2 py-1 text-xs font-bold transition ${
                                editor?.isActive('orderedList')
                                    ? 'bg-[#066ac0] text-white'
                                    : 'text-[#52656b] hover:bg-white'
                            }`}
                            title="Numbered List"
                        >
                            1.
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                editor?.chain().focus().toggleBlockquote().run()
                            }
                            className={`rounded-lg p-1.5 text-sm transition ${
                                editor?.isActive('blockquote')
                                    ? 'bg-[#066ac0] text-white'
                                    : 'text-[#52656b] hover:bg-white'
                            }`}
                            title="Quote Block"
                        >
                            <FiMessageSquare className="h-4 w-4" />
                        </button>
                        <button
                            type="button"
                            onClick={() =>
                                editor
                                    ?.chain()
                                    .focus()
                                    .setHorizontalRule()
                                    .run()
                            }
                            className="rounded-lg p-1.5 text-sm text-[#52656b] transition hover:bg-white"
                            title="Horizontal Divider"
                        >
                            <FiMinus className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Insert Link & Insert Image & Table */}
                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            onClick={openLinkModal}
                            className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition ${
                                editor?.isActive('link')
                                    ? 'bg-[#066ac0] text-white'
                                    : 'text-[#52656b] hover:bg-white hover:text-black'
                            }`}
                            title="Insert or edit link"
                        >
                            <FiLink className="h-3.5 w-3.5" />
                            <span>Link</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setImageModalOpen(true)}
                            className="flex items-center gap-1 rounded-lg bg-white px-2.5 py-1.5 text-xs font-bold text-[#066ac0] shadow-2xs border border-[#d9e5e1] hover:border-[#066ac0] transition"
                            title="Add inline image"
                        >
                            <FiImage className="h-3.5 w-3.5" />
                            <span>Add Image</span>
                        </button>

                        {/* Table tools dropdown toggle */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setTableMenuOpen(!tableMenuOpen)}
                                className={`flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold transition ${
                                    editor?.isActive('table')
                                        ? 'bg-[#066ac0] text-white'
                                        : 'text-[#52656b] hover:bg-white'
                                }`}
                                title="Table Options"
                            >
                                <FiGrid className="h-3.5 w-3.5" />
                                <span>Table</span>
                            </button>

                            {tableMenuOpen && (
                                <div className="absolute left-0 top-full z-30 mt-1 w-48 rounded-xl border border-[#d9e5e1] bg-white p-1.5 shadow-xl text-xs space-y-0.5">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            editor
                                                ?.chain()
                                                .focus()
                                                .insertTable({
                                                    rows: 3,
                                                    cols: 3,
                                                    withHeaderRow: true,
                                                })
                                                .run()
                                            setTableMenuOpen(false)
                                        }}
                                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left font-medium text-[#40535a] hover:bg-[#f1f6f4]"
                                    >
                                        <FiPlus className="h-3 w-3 text-[#066ac0]" />
                                        Insert 3x3 Table
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            editor
                                                ?.chain()
                                                .focus()
                                                .addRowAfter()
                                                .run()
                                            setTableMenuOpen(false)
                                        }}
                                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[#40535a] hover:bg-[#f1f6f4]"
                                    >
                                        Add row below
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            editor
                                                ?.chain()
                                                .focus()
                                                .addColumnAfter()
                                                .run()
                                            setTableMenuOpen(false)
                                        }}
                                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[#40535a] hover:bg-[#f1f6f4]"
                                    >
                                        Add column right
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            editor
                                                ?.chain()
                                                .focus()
                                                .deleteRow()
                                                .run()
                                            setTableMenuOpen(false)
                                        }}
                                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-red-600 hover:bg-red-50"
                                    >
                                        Delete row
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            editor
                                                ?.chain()
                                                .focus()
                                                .deleteColumn()
                                                .run()
                                            setTableMenuOpen(false)
                                        }}
                                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-red-600 hover:bg-red-50"
                                    >
                                        Delete column
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            editor
                                                ?.chain()
                                                .focus()
                                                .deleteTable()
                                                .run()
                                            setTableMenuOpen(false)
                                        }}
                                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left font-semibold text-red-600 hover:bg-red-50"
                                    >
                                        <FiTrash2 className="h-3 w-3" />
                                        Delete table
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* View Switcher: Write vs Preview */}
                <div className="flex items-center rounded-xl bg-[#edf1ef] p-1 gap-1 text-xs">
                    <button
                        type="button"
                        onClick={() => setActiveTab('write')}
                        className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-bold transition ${
                            activeTab === 'write'
                                ? 'bg-white text-[#063f70] shadow-2xs'
                                : 'text-[#718187] hover:text-black'
                        }`}
                    >
                        <FiEdit3 className="h-3.5 w-3.5" />
                        Write
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('preview')}
                        className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-bold transition ${
                            activeTab === 'preview'
                                ? 'bg-white text-[#066ac0] shadow-2xs'
                                : 'text-[#718187] hover:text-black'
                        }`}
                    >
                        <FiEye className="h-3.5 w-3.5" />
                        Preview
                    </button>
                </div>
            </div>

            {/* Error Notification Banner */}
            {uploadError && (
                <div className="flex items-center justify-between bg-red-50 px-4 py-2 text-xs text-red-700 border-b border-red-100">
                    <span>{uploadError}</span>
                    <button
                        type="button"
                        onClick={() => setUploadError('')}
                        className="font-bold hover:underline"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            {/* Editor Area */}
            {activeTab === 'write' ? (
                <div
                    className="relative overflow-y-auto cursor-text"
                    style={{ minHeight }}
                    onClick={() => editor?.commands.focus()}
                >
                    <EditorContent editor={editor} />
                    {isUploadingImage && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/80 backdrop-blur-2xs">
                            <span className="h-8 w-8 animate-spin rounded-full border-3 border-[#066ac0]/30 border-t-[#066ac0]" />
                            <p className="mt-2 text-xs font-semibold text-[#063f70]">
                                Uploading image to storage...
                            </p>
                        </div>
                    )}
                </div>
            ) : (
                <div
                    className="overflow-y-auto p-6 blog-content bg-[#fafcfb]"
                    style={{ minHeight }}
                >
                    {htmlValue && htmlValue !== '<p></p>' ? (
                        <div
                            className="blog-content max-w-none"
                            dangerouslySetInnerHTML={{ __html: htmlValue }}
                        />
                    ) : (
                        <p className="text-center italic text-[#819096] py-12">
                            Nothing to preview yet. Switch to &quot;Write&quot;
                            to start composing your article.
                        </p>
                    )}
                </div>
            )}

            {/* Footer Stats & Status Bar */}
            <div className="flex flex-wrap items-center justify-between border-t border-[#edf1ef] bg-[#f8faf9] px-4 py-2.5 text-[11px] font-medium text-[#718187] rounded-b-2xl">
                <div className="flex items-center gap-3">
                    <span>
                        <strong className="text-[#324349]">{wordCount}</strong>{' '}
                        {wordCount === 1 ? 'word' : 'words'}
                    </span>
                    <span>·</span>
                    <span>
                        <strong className="text-[#324349]">{charCount}</strong>{' '}
                        characters
                    </span>
                    <span>·</span>
                    <span>
                        ~
                        <strong className="text-[#324349]">
                            {readingTime}
                        </strong>{' '}
                        min read
                    </span>
                </div>
                <div className="flex items-center gap-2 text-[#819096]">
                    <span>Pro-tip: Paste or drop images directly into the editor</span>
                </div>
            </div>

            {/* Image Insertion Modal / Dialog */}
            {imageModalOpen && (
                <div className="fixed inset-0 z-60 flex items-center justify-center bg-[#063f70]/40 p-4 backdrop-blur-2xs">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in duration-150">
                        <div className="flex items-center justify-between border-b border-[#edf1ef] pb-3">
                            <h3 className="font-heading text-lg font-bold text-[#063f70]">
                                Insert Blog Image
                            </h3>
                            <button
                                type="button"
                                onClick={() => setImageModalOpen(false)}
                                className="rounded-lg p-1 text-[#718187] hover:bg-[#f1f6f4]"
                            >
                                <FiX className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mt-4 space-y-4">
                            {/* Option 1: Upload from Computer */}
                            <div className="rounded-xl border border-dashed border-[#b7cfc8] bg-[#f8faf9] p-5 text-center">
                                <FiUploadCloud className="mx-auto h-8 w-8 text-[#066ac0]" />
                                <p className="mt-2 text-xs font-semibold text-[#324349]">
                                    Upload image from device
                                </p>
                                <p className="mt-1 text-[11px] text-[#819096]">
                                    PNG, JPG, or WebP up to 5MB
                                </p>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/png,image/jpeg,image/webp"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file) {
                                            handleFileUpload(file, imageAltInput)
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    disabled={isUploadingImage}
                                    onClick={() => fileInputRef.current?.click()}
                                    className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-[#066ac0] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#05579e] disabled:opacity-50"
                                >
                                    {isUploadingImage ? (
                                        <>
                                            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <FiPlus className="h-3.5 w-3.5" />
                                            Choose File
                                        </>
                                    )}
                                </button>
                            </div>

                            <div className="flex items-center my-3">
                                <div className="flex-1 border-t border-[#edf1ef]" />
                                <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-[#819096]">
                                    OR
                                </span>
                                <div className="flex-1 border-t border-[#edf1ef]" />
                            </div>

                            {/* Option 2: Image URL */}
                            <div>
                                <label className="block text-xs font-bold text-[#52656b] mb-1">
                                    Image Web URL
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    value={imageUrlInput}
                                    onChange={(e) =>
                                        setImageUrlInput(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-[#d9e5e1] px-3.5 py-2 text-xs outline-none focus:border-[#066ac0]"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-[#52656b] mb-1">
                                    Alt description / Caption (optional)
                                </label>
                                <input
                                    type="text"
                                    placeholder="Brief description of the image"
                                    value={imageAltInput}
                                    onChange={(e) =>
                                        setImageAltInput(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-[#d9e5e1] px-3.5 py-2 text-xs outline-none focus:border-[#066ac0]"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-2 border-t border-[#edf1ef]">
                                <button
                                    type="button"
                                    onClick={() => setImageModalOpen(false)}
                                    className="rounded-xl px-4 py-2 text-xs font-bold text-[#718187] hover:bg-[#f1f6f4]"
                                >
                                    Cancel
                                </button>
                                {imageUrlInput.trim() && (
                                    <button
                                        type="button"
                                        onClick={insertImageUrl}
                                        className="rounded-xl bg-[#066ac0] px-4 py-2 text-xs font-bold text-white hover:bg-[#05579e]"
                                    >
                                        Insert from URL
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Link Insertion Modal / Dialog */}
            {linkModalOpen && (
                <div className="fixed inset-0 z-60 flex items-center justify-center bg-[#063f70]/40 p-4 backdrop-blur-2xs">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in duration-150">
                        <div className="flex items-center justify-between border-b border-[#edf1ef] pb-3">
                            <h3 className="font-heading text-base font-bold text-[#063f70]">
                                {editor?.isActive('link')
                                    ? 'Edit Link'
                                    : 'Insert Link'}
                            </h3>
                            <button
                                type="button"
                                onClick={() => setLinkModalOpen(false)}
                                className="rounded-lg p-1 text-[#718187] hover:bg-[#f1f6f4]"
                            >
                                <FiX className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="mt-4 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-[#52656b] mb-1">
                                    Target URL
                                </label>
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder="https://example.com"
                                    value={linkUrlInput}
                                    onChange={(e) =>
                                        setLinkUrlInput(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault()
                                            setLink()
                                        }
                                    }}
                                    className="w-full rounded-xl border border-[#d9e5e1] px-3.5 py-2 text-xs outline-none focus:border-[#066ac0]"
                                />
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-[#edf1ef]">
                                {editor?.isActive('link') ? (
                                    <button
                                        type="button"
                                        onClick={removeLink}
                                        className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:underline"
                                    >
                                        <FiTrash2 className="h-3 w-3" />
                                        Remove Link
                                    </button>
                                ) : (
                                    <div />
                                )}

                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setLinkModalOpen(false)}
                                        className="rounded-xl px-3 py-1.5 text-xs font-bold text-[#718187] hover:bg-[#f1f6f4]"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={setLink}
                                        className="rounded-xl bg-[#066ac0] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#05579e]"
                                    >
                                        Save Link
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
