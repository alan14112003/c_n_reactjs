import { TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

const TableHeaderBox = memo(() => {
  const { t } = useTranslation(['creator_chapters_page'])
  return (
    <TableHeader className="sticky top-0 bg-secondary">
      <TableRow>
        <TableHead>{t('creator_chapters_page:table_head.number')}</TableHead>
        <TableHead>{t('creator_chapters_page:table_head.name')}</TableHead>
        <TableHead>{t('creator_chapters_page:table_head.info')}</TableHead>
        <TableHead>{t('creator_chapters_page:table_head.privacy')}</TableHead>
        <TableHead>{t('creator_chapters_page:table_head.actions')}</TableHead>
      </TableRow>
    </TableHeader>
  )
})

export default TableHeaderBox
