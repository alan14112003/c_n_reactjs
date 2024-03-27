import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { memo } from 'react'

const TableHeaderBox = memo(() => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>info</TableHead>
        <TableHead>actions</TableHead>
        <TableHead>status</TableHead>
        <TableHead>privacy</TableHead>
      </TableRow>
    </TableHeader>
  )
})

export default TableHeaderBox
