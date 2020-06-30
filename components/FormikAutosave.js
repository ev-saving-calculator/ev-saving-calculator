import debounce from 'lodash.debounce'
import { useFormikContext } from 'formik'
import { useCallback, useEffect } from 'react'

const FormikAutoSave = ({ debounceMs }) => {
  const formik = useFormikContext()
  const debouncedSubmit = useCallback(
    debounce(
      () =>
        formik.submitForm(),
      debounceMs
    ),
    [debounceMs, formik.submitForm]
  )

  useEffect(() => {
    debouncedSubmit()
  }, [debouncedSubmit, formik.values])
  return null
}

export default FormikAutoSave
