import React from 'react'
import {
  Pagination as PaginationContainer,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination'

// Hằng số DOTS để biểu diễn dấu chấm trong phân trang
const DOTS = '...'

// Hàm để tạo ra một dãy số
const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, idx) => idx + start)

// Giao diện Props cho component Pagination
interface PaginationProps {
  onPageChange: (page: number) => void
  total: number
  pageSize: number
  siblingCount?: number
  currentPage?: number
}

// Component Pagination
const Pagination: React.FC<PaginationProps> = ({
  onPageChange,
  total,
  pageSize,
  siblingCount = 1,
  currentPage = 1,
}) => {
  // Tính tổng số trang
  const totalPage: number = Math.ceil(total / pageSize)
  // Hàm để tạo ra dãy số của phân trang
  const generatePaginationRange = (): (number | string)[] => {
    if (totalPage <= 1) return []
    const totalPageNumbers: number = siblingCount + 5
    // Số trang được xác định là siblingCount + trang đầu + trang cuối + trang hiện tại + 2*DOTS
    // Trường hợp 1: Nếu số lượng trang ít hơn số trang chúng ta muốn hiển thị trong component phân trang của chúng ta
    if (totalPageNumbers >= totalPage) {
      return range(1, totalPage)
    }
    // Tính toán chỉ số anh em bên trái và bên phải
    const leftSiblingIndex: number = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex: number = Math.min(
      currentPage + siblingCount,
      totalPage
    )
    // Xác định xem có hiển thị dấu chấm bên trái và bên phải không
    const shouldShowLeftDots: boolean = leftSiblingIndex > 2
    const shouldShowRightDots: boolean = rightSiblingIndex < totalPage - 2
    // Trường hợp 2: Không có dấu chấm bên trái được hiển thị, nhưng có dấu chấm bên phải
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount: number = 3 + 2 * siblingCount
      const leftRange: number[] = range(1, leftItemCount)
      return [...leftRange, DOTS, totalPage]
    }
    // Trường hợp 3: Không có dấu chấm bên phải được hiển thị, nhưng có dấu chấm bên trái
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount: number = 3 + 2 * siblingCount
      const rightRange: number[] = range(
        totalPage - rightItemCount + 1,
        totalPage
      )
      return [1, DOTS, ...rightRange]
    }
    // Trường hợp 4: Cả hai dấu chấm bên trái và bên phải đều được hiển thị
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange: number[] = range(leftSiblingIndex, rightSiblingIndex)
      return [1, DOTS, ...middleRange, DOTS, totalPage]
    }
    return []
  }
  // Tạo ra dãy số của phân trang
  const paginationRange: (number | string)[] = generatePaginationRange()
  // Hàm xử lý sự kiện khi chuyển trang tiếp theo
  const onNext = (): void => {
    onPageChange(currentPage + 1)
  }
  // Hàm xử lý sự kiện khi chuyển trang trước đó
  const onPrevious = (): void => {
    onPageChange(currentPage - 1)
  }

  // Render Component Pagination
  return (
    <PaginationContainer className="mt-9">
      {totalPage >= 2 && (
        <PaginationContent>
          {/* Mũi tên điều hướng trái */}
          <PaginationItem
            className={`${currentPage === 1 && 'cursor-not-allowed'}`}
          >
            <PaginationPrevious
              onClick={onPrevious}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {/* Các phần tử của phân trang */}
          {paginationRange.map((pageNumber) => (
            <PaginationItem key={pageNumber}>
              {pageNumber === DOTS ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={currentPage === pageNumber}
                  disabled={currentPage === pageNumber}
                  onClick={() => onPageChange(pageNumber as number)}
                >
                  {pageNumber}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          {/* Mũi tên điều hướng phải */}
          <PaginationItem
            className={`${currentPage === totalPage && 'cursor-not-allowed'}`}
          >
            <PaginationNext
              onClick={onNext}
              disabled={currentPage === totalPage}
            />
          </PaginationItem>
        </PaginationContent>
      )}
    </PaginationContainer>
  )
}

export default Pagination
