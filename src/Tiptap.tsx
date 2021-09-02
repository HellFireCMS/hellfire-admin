import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '<p>Hello World! 🌎️</p>',
  })

  return (
    <div>
        <EditorContent editor={editor} />
        <button onClick={() => {
            let json = editor!.getJSON();
            for (let i of json['content']) {
              if (i['type'] == 'heading') {
                let temp = {
                  heading: {
                    attrs: i['attrs'],
                    content: i['content']
                  }
                }
                i['content'] = temp;
                delete i['attrs']
              }
            }
            console.log(JSON.stringify(json))
        }}>Get json</button>
    </div>
  )
}

export default Tiptap