import {
  lazy,
  useState,
  FormEvent,
  ComponentType,
  LazyExoticComponent
} from 'react'
import { IFormFields } from '../types'

const useFormOptions = () => {
  const [fields, setFields] = useState<IFormFields>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (event: FormEvent, name: string): void => {
    const { value } = event.target as HTMLInputElement

    setFields({
      ...fields,
      [name]: {
        ...fields[name],
        value
      }
    })
  }

  const componentMap: {
    [key: string]: LazyExoticComponent<ComponentType<any>>
  } = {
    text: lazy(() => import('../components/InputText')),
    textArea: lazy(() => import('../components/InputTextArea')),
    typeAheadMulti: lazy(() => import('../components/InputTypeAheadMulti'))
  }

  return {
    fields,
    setFields,
    componentMap,
    isSubmitting,
    setIsSubmitting,
    handleInputChange
  }
}

export default useFormOptions
