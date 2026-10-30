"use client";

import { useEffect, useRef, useState } from "react";
import { EditorContent, EditorContext, useCurrentEditor, useEditor } from "@tiptap/react";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { FindAndReplace } from "@tiptap/extension-find-and-replace";
import { Selection } from "@tiptap/extensions";

// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button";
import { Spacer } from "@/components/tiptap-ui-primitive/spacer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/tiptap-ui-primitive/dropdown-menu";
import { Toolbar, ToolbarGroup, ToolbarSeparator } from "@/components/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension";
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/components/tiptap-node/list-node/list-node.scss";
import "@/components/tiptap-node/image-node/image-node.scss";
import "@/components/tiptap-node/heading-node/heading-node.scss";
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss";

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu";
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button";
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button";
import { ColorHighlightPopover, ColorHighlightPopoverContent, ColorHighlightPopoverButton } from "@/components/tiptap-ui/color-highlight-popover";
import { LinkPopover, LinkContent, LinkButton } from "@/components/tiptap-ui/link-popover";
import { MarkButton } from "@/components/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button";

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon";
import { ChevronDownIcon } from "@/components/tiptap-icons/chevron-down-icon";
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon";
import { LinkIcon } from "@/components/tiptap-icons/link-icon";

// --- Hooks ---
import { useIsBreakpoint } from "@/hooks/use-is-breakpoint";
import { useWindowSize } from "@/hooks/use-window-size";
import { useCursorVisibility } from "@/hooks/use-cursor-visibility";

// --- Components ---

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss";

import defaultContent from "@/components/tiptap-templates/simple/data/content.json";

interface SimpleEditorProps {
  name?: string;
  placeholder?: string;
  defaultValue?: string;
}

const FONT_SIZES = ["12px", "14px", "16px", "18px", "20px", "22px", "24px", "32px"] as const;

const FontSizeDropdownMenu = () => {
  const { editor } = useCurrentEditor();
  const [isOpen, setIsOpen] = useState(false);
  const [customSize, setCustomSize] = useState("34");
  const [isEditorFocused, setIsEditorFocused] = useState(false);

  useEffect(() => {
    if (!editor) return;

    setIsEditorFocused(editor.isFocused);

    const handleFocus = () => setIsEditorFocused(true);
    editor.on("focus", handleFocus);

    return () => {
      editor.off("focus", handleFocus);
    };
  }, [editor]);

  const applyFontSize = (size: string) => {
    if (!editor || !isEditorFocused) return;

    editor.chain().focus().setFontSize(size).run();
    setIsOpen(false);
  };

  return (
    <DropdownMenu
      open={isOpen && !!editor && isEditorFocused}
      onOpenChange={(open) => setIsOpen(open && !!editor && isEditorFocused)}
      modal={false}
    >
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          aria-label="글자 크기"
          tooltip="글자 크기"
          data-active-state="off"
          data-disabled={!editor || !isEditorFocused}
          disabled={!editor || !isEditorFocused}
          className="font-size-control"
        >
          <span className="tiptap-button-text text-xs">가</span>
          <ChevronDownIcon className="tiptap-button-dropdown-small" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="font-size-menu">
        <DropdownMenuGroup>
          {FONT_SIZES.map((size) => (
            <DropdownMenuItem key={size} asChild>
              <Button
                type="button"
                variant="ghost"
                showTooltip={false}
                onClick={() => applyFontSize(size)}
                className="font-size-control w-full justify-start text-xs"
              >
                {size}
              </Button>
            </DropdownMenuItem>
          ))}
          <div className="border-t border-slate-200 p-2" onPointerDown={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>
            <div className="mb-1 flex items-center justify-between px-1 text-[11px] text-slate-500">
              <span>직접 입력</span>
              <span>34px ~ 72px</span>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="number"
                min="34"
                max="72"
                value={customSize}
                placeholder="34~72"
                aria-label="글자 크기 직접 입력, 34~72픽셀"
                disabled={!editor || !isEditorFocused}
                className="h-7 w-14 rounded border border-slate-200 px-2 text-xs outline-none"
                onChange={(event) => setCustomSize(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key !== "Enter") return;

                  const size = Number(customSize);
                  if (size < 34 || size > 72) return;

                  applyFontSize(`${size}px`);
                }}
              />
              <span className="text-xs text-slate-500">px</span>
              <Button
                type="button"
                variant="ghost"
                showTooltip={false}
                className="font-size-control h-7 px-2 text-xs"
                onClick={() => {
                  const size = Number(customSize);
                  if (size < 34 || size > 72) return;

                  applyFontSize(`${size}px`);
                }}
              >
                적용
              </Button>
            </div>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const MainToolbarContent = ({ onHighlighterClick, onLinkClick, isMobile }: { onHighlighterClick: () => void; onLinkClick: () => void; isMobile: boolean }) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu modal={false} levels={[1, 2, 3, 4]} />
        <FontSizeDropdownMenu />
        <ListDropdownMenu modal={false} types={["bulletList", "orderedList", "taskList"]} />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? <ColorHighlightPopover /> : <ColorHighlightPopoverButton onClick={onHighlighterClick} />}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="추가" />
      </ToolbarGroup>

      <Spacer />

      {isMobile && <ToolbarSeparator />}
    </>
  );
};

const MobileToolbarContent = ({ type, onBack }: { type: "highlighter" | "link"; onBack: () => void }) => (
  <>
    <ToolbarGroup>
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? <HighlighterIcon className="tiptap-button-icon" /> : <LinkIcon className="tiptap-button-icon" />}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? <ColorHighlightPopoverContent /> : <LinkContent />}
  </>
);

export function SimpleEditor({ name, placeholder = "내용을 입력해주세요.", defaultValue }: SimpleEditorProps) {
  const isMobile = useIsBreakpoint();
  const { height } = useWindowSize();
  const [mobileView, setMobileView] = useState<"main" | "highlighter" | "link">("main");
  const initialContent = defaultValue ?? (name ? "" : defaultContent);
  const [html, setHtml] = useState(typeof initialContent === "string" ? initialContent : "");
  const toolbarRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
        "data-placeholder": placeholder,
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TextStyleKit,
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      FindAndReplace.configure({
        searchDebounceMs: 500,
        injectCSS: false,
      }),
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => setHtml(editor.getHTML()),
  });

  const rect = useCursorVisibility({
    editor,
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  });

  useEffect(() => {
    if (!isMobile && mobileView !== "main") {
      setMobileView("main");
    }
  }, [isMobile, mobileView]);

  return (
    <div className="simple-editor-wrapper">
      <EditorContext.Provider value={{ editor }}>
        <Toolbar
          ref={toolbarRef}
          style={{
            ...(isMobile
              ? {
                  bottom: `calc(100% - ${height - rect.y}px)`,
                }
              : {}),
          }}
        >
          {mobileView === "main" ? (
            <MainToolbarContent onHighlighterClick={() => setMobileView("highlighter")} onLinkClick={() => setMobileView("link")} isMobile={isMobile} />
          ) : (
            <MobileToolbarContent type={mobileView === "highlighter" ? "highlighter" : "link"} onBack={() => setMobileView("main")} />
          )}
        </Toolbar>

        <EditorContent editor={editor} role="presentation" className="simple-editor-content" />
        {name && <input type="hidden" name={name} value={html} readOnly />}
      </EditorContext.Provider>
    </div>
  );
}
