import { Check, X } from 'lucide-react'
import { ReactNode, useState } from 'react'

export type ValueCategoryType = 0 | 1 | -1

type CheckCategoryProp = {
  children: ReactNode
  onChange: (value: ValueCategoryType) => void
}

const CheckCategory = ({ children, onChange }: CheckCategoryProp) => {
  const [value, setValue] = useState<ValueCategoryType>(0)

  const changeValue = () => {
    let newValue: ValueCategoryType
    switch (value) {
      case 1:
        newValue = -1
        break
      case -1:
        newValue = 0
        break
      default:
        newValue = 1
        break
    }
    setValue(newValue)
    onChange(newValue)
  }

  return (
    <div
      role="button"
      onClick={changeValue}
      className="flex items-center"
      tabIndex={0}
    >
      <div
        className={`w-6 h-6 flex justify-center items-center mr-2 bg-gray-200 dark:bg-white cursor-pointer`}
      >
        {value !== 0 &&
          (value === 1 ? <Check color="#17e5e8" /> : <X color="#e81717" />)}
      </div>
      <span className="select-none">{children}</span>
    </div>
  )
}

export default CheckCategory
