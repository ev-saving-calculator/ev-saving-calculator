import React from 'react'
import debounce from 'lodash/debounce'
import isEqual from 'lodash/isEqual'
import { connect } from 'formik'

export default connect(
  class FormikAutoSave extends React.Component {
    constructor(props) {
      super(props)

      this.save = debounce(() => {
        if (!this.props.formik.isValid) {
          return
        }
        this.props.onSave(this.props.values)
      }, this.props.debounceMs)
    }

    componentDidUpdate(prevProps) {
      if (!isEqual(prevProps.values, this.props.values)) {
        this.save()
      }
    }

    render() {
      return null
    }
  }
)
