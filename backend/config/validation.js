module.exports = (data) => {
    //data must be array contain of object

    return {
        validate(localData) {
            let isValid = true
            let needValidate = localData || data
            if (!Array.isArray(needValidate)) {
                throw new Error("Argument must be an array")
            }
            const validationError = needValidate.reduce((prev, cur) => {
                if (typeof cur !== 'object') {
                    return prev
                }
                for (const props in cur) {
                    let value = cur[props]
                    if (typeof value == 'string') {
                        if (!value.trim()) {
                            isValid = false
                            prev.push(`Please fill the field '${props.toString()}'`)
                        }
                    }
                    else {
                        if (value == undefined || value == null) {
                            isValid = false
                            prev.push(`Please fill the field '${props.toString()}'`)
                        }
                    }
                }
                return prev.concat([])
            }, [])
            return {
                isValid,
                validationError
            }

        },
        trimValidate(localData) {
            let isValid = true
            let needValidate = localData || data
            if (!Array.isArray(needValidate)) {
                throw new Error("Argument must be an array")
            }
            const validationError = needValidate.reduce((prev, cur) => {
                if (typeof cur !== 'object') {
                    return prev
                }
                for (const props in cur) {
                    let value = cur[props]
                    if (typeof value == 'string') {
                        if (!value.trim()) {
                            isValid = false
                            prev.push(`Field must not contain only blank space. '${props.toString()}'  has only blank space`)
                        }
                    }
                }
                return prev.concat([])
            }, [])
            return {
                isValid,
                validationError,
            }
        },
        updateData(updateData) {
            let updateNeed = updateData || data
            if (!Array.isArray(updateNeed)) {
                throw new Error("Argument must be an array")
            }
            return updateNeed.reduce((prev, cur) => {
                for (const props in cur) {
                    if (typeof cur !== 'object') {
                        return prev
                    }
                    let value = cur[props]
                    if (typeof value == 'string') {
                        if (Boolean(value.trim()) ) {
                            prev[props] = value
                        }
                    }
                    else {
                        if (value != undefined && value != null) {
                            prev[props] = value
                        }
                    }
                }
                return prev
            }, {})
        }
    }
}
