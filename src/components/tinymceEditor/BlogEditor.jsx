import React from 'react'
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react'
import { useEffect } from 'react';

function BlogEditor({setContent, initValue = "<p></p>"},ref) {
    const editorRef = useRef(null);
    const log = () => {
      if (editorRef.current) {
        setContent(editorRef.current.getContent());
        // editorRef.current.setContent("");
      }
    };


    const handleEditorChange = (content, editor) => {
      setContent(content); // Update the `setDesc` with the latest content
      console.log(content.length)
  };

  React.useImperativeHandle(ref, () => ({
    log,
  }));

    return (
      <>
        <Editor
          apiKey='3qlloed070e12crx79mkcs9mzto86b0tigaeimcnqrjutd5j'
          onInit={(_evt, editor) => editorRef.current = editor}
          initialValue={`${initValue}`} 
          init={{
            height: 500,
            menubar: false,
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
              'bold italic forecolor | alignleft aligncenter ' +
              'alignright alignjustify | bullist numlist outdent indent | ' +
              'removeformat | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
          }}
          onEditorChange={handleEditorChange}
        />
        {/* <button onClick={log} className='bg-purple-500'>Log editor content</button> */}
      </>
    );
}

export default React.forwardRef(BlogEditor)