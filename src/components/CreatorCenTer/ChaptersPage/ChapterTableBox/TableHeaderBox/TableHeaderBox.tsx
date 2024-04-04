import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { memo } from 'react'

const TableHeaderBox = memo(() => {
  return (
    <TableHeader className="sticky top-0 bg-secondary">
      <TableRow>
        <TableHead>chapter number</TableHead>
        <TableHead>name</TableHead>
        <TableHead>info</TableHead>
        <TableHead>privacy</TableHead>
        <TableHead>actions</TableHead>
      </TableRow>
    </TableHeader>
  )
})

export default TableHeaderBox
