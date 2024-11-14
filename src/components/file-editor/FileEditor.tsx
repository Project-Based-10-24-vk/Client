import { FC, useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react'

import { Typography } from '@mui/material'

interface FileEditorProps {
  onEdit: (content: string) => void
  value: string
  errorMsg?: string
}

const FileEditor: FC<FileEditorProps> = ({ onEdit, value, errorMsg }) => {
  useEffect(() => {
    const container = document.querySelector('.tox-tinymce') as HTMLElement

    if (container) {
      container.style.border = errorMsg ? '1px solid #f54636' : 'none'
    }
  }, [errorMsg])

  return (
    <div>
      <Editor
        apiKey={import.meta.env.VITE_APP_TINY_MCE_API_KEY}
        data-testid='editor'
        init={{
          height: 400,
          menubar: true,
          plugins:
            'anchor accordion autolink autosave charmap codesample emoticons directionality help fullscreen preview pagebreak insertdatetime image link lists advlist media searchreplace table visualblocks wordcount code',
          toolbar:
            'undo redo | blocks fontsize | bold italic underline strikethrough | ltr rtl | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent accordion | removeformat',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onEditorChange={onEdit}
        value={value}
      />
      {errorMsg && (
        <Typography sx={{ typography: 'caption', color: 'error.500' }}>
          {errorMsg}
        </Typography>
      )}
    </div>
  )
}

export default FileEditor
