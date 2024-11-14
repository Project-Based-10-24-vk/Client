export const styles = {
  title: { typography: 'body2', color: 'primary.500', mr: '8px', mb: '16px' },
  helperText: (multiline?: boolean) => ({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    mr: multiline ? '48px' : '14px'
  })
}
