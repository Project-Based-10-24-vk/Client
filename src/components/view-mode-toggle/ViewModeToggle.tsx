import { LayoutGrid, List } from 'lucide-react'

import { Button } from '@mui/material'

type ViewMode = 'list' | 'grid'

interface ViewModeToggleProps {
  viewMode: ViewMode
  setViewMode: (mode: ViewMode) => void
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
  viewMode,
  setViewMode
}) => {
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
      <Button
        onClick={() => setViewMode('list')}
        variant={viewMode === 'list' ? 'contained' : 'outlined'}
      >
        <List size={20} />
      </Button>
      <Button
        onClick={() => setViewMode('grid')}
        variant={viewMode === 'grid' ? 'contained' : 'outlined'}
      >
        <LayoutGrid size={20} />
      </Button>
    </div>
  )
}

export default ViewModeToggle
