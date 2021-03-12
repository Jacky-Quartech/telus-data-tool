const validate = values => {
    const errors = {};
    if(!values.inputRequest) {
        errors.inputRequest = 'Required'
    }

    if(!values.inputStudy) {
        errors.inputStudy = 'Required'
    }

    if(!values.outputRequest) {
        errors.outputRequest = 'Required'
    }

    if(!values.outputStudy) {
        errors.outputStudy = 'Required'
    }
}

export default validate;