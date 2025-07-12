
'use client';

import { useEffect, useRef } from 'react';
import 'tui-image-editor/dist/tui-image-editor.css';

type Props = {
  imageUrl: string;
  onClose: () => void;
};
interface TuiImageEditorInstance {
  toDataURL(): string;
  destroy(): void;
}
export default function ImageEditorModal({ imageUrl, onClose }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const editorRef = useRef<TuiImageEditorInstance>(null);


  useEffect(() => {
    let instance: TuiImageEditorInstance;

    (async () => {
      if (!container.current || editorRef.current) return;

      const { default: ImageEditor } = await import('tui-image-editor');
      instance = new ImageEditor(container.current, {
        includeUI: {
          loadImage: { path: imageUrl, name: 'Product Image' },
          menu: ['crop', 'flip', 'rotate', 'draw', 'shape', 'icon', 'text', 'filter'],
          initMenu: 'filter',
          uiSize: { width: '1000px', height: '700px' },
          menuBarPosition: 'bottom',
        },
        cssMaxWidth: 700,
        cssMaxHeight: 500,
        selectionStyle: { cornerSize: 20, rotatingPointOffset: 70 },
      });

      editorRef.current = instance;
      document.body.classList.add('overflow-hidden'); 
    })();

    return () => {
      instance?.destroy();
      editorRef.current = null;
      document.body.classList.remove('overflow-hidden');
    };
   
  }, [imageUrl]); 

  /* Save handler */
  const handleSave = () => {
    const dataUrl = editorRef.current?.toDataURL();
    if (!dataUrl) return;

    // Optional download
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'edited-image.png';
    link.click();

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative bg-white rounded-md shadow-xl">
        
        <div ref={container} className="w-[1000px] h-[700px]" />

       
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            ✅ Apply Changes
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            ❌ Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
