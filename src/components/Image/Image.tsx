import { forwardRef, HtmlHTMLAttributes, useState } from 'react'
import { cn } from '@/utils/utils'
import { NoImage } from '@/assets/images'

interface ImageProp extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  className?: HtmlHTMLAttributes<HTMLImageElement>['className']
  fallback?: string
}

const Image = forwardRef<HTMLImageElement, ImageProp>(
  (
    { src, alt, className, fallback: customFallback = NoImage, ...props },
    ref
  ) => {
    const [fallback, setFallback] = useState('')

    const handleError = () => {
      setFallback(customFallback)
    }

    return (
      <img
        className={cn('overflow-hidden', className)}
        ref={ref}
        src={fallback || src}
        alt={alt}
        {...props}
        onError={handleError}
        role="listitem"
      />
    )
  }
)

export default Image
