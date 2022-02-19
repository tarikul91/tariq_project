import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FormGenerate from 'component/FormGenerate';
import AttributeGenerate from 'component/attributeGenerate';
import { useSelector } from 'react-redux';
import { fetchForm } from "feature/allForm"
import { useNavigate } from 'react-router-dom';
import { postReq } from "service/fetchReq";

const Form = (props) => {
    const Dispatch = useDispatch()
    const Navigate = useNavigate()
    const { formId } = useParams()
    const activeForm = useSelector(data => data.forms.form.find(f => f._id == formId))
    const [data, setData] = useState([{ name: "", value: "" }])
    const [submitted, setSubmitted] = useState(false)
    if (!activeForm) {
        Dispatch(fetchForm())
    }

    useEffect(() => {
        if (!activeForm) return
        const onlyInput = activeForm.all_attribute_details.filter(attr => attr.type === 'input')
        const inputState = onlyInput.map(attr => {
            if (attr.type === 'input') {
                return {
                    name: attr.name,
                    value: ''
                }
            }
        })
        setData(inputState)
    }, [activeForm])
    const submit = async (ev) => {
        ev.preventDefault()
        const inputData = data.reduce((prev, cur) => {
            for (let v in cur) {
                prev[cur.name] = cur.value
            }
            return prev
        }, {})
        await postReq(activeForm.formDetail.url, inputData)
            .then(res => {
                if (res.status) {
                    setSubmitted(true)
                }
            })
            .catch(er => {
                if (er) {
                    alert(er.msg)
                }
            })
    }
    const inputChange = (ev) => {
        const prevArray = Array.from(data)
        prevArray.map(e => {
            if (e.name === ev.target.name) {
                e.value = ev.target.value
            }
            else {
                return e
            }
        })
        setData(prevArray)
    }
    if (!activeForm) {
        return (
            <div className='container'>
                <h1 className='display-4 text-danger perfect-center'>Oops! Form not found try again</h1>
            </div>
        )
    }
    if (submitted) {
        return (
            <div className='perfect-center'>
                <h1 className='text-center '>
                    <i className="fa-solid fa-circle-check text-success" style={{ fontSize: "140px" }}></i>
                    <p className='mt-5' onClick={() => Navigate('/home')} style={{ cursor: "pointer" }}>Back</p>
                </h1>
            </div>

        )
    }
    var sortedAttributes = Array.from(activeForm.all_attribute_details)

    sortedAttributes.sort((a, b) => {
        if (a.position > b.position) {
            return 1;
          }
          if (a.position < b.position) {
            return -1;
          }
          return 0;
    })
    return (
        <div>
            <div className="container home perfect-center">
                <FormGenerate {...activeForm.formDetail} onSubmit={submit}>
                    {
                        sortedAttributes.map((attr, index) => {
                            let forInput = {}
                            if (attr.type === 'input') {
                                let v = data.find(v => v.name === attr.name)
                                forInput.value = v ? v.value : ''
                                forInput.onChange = inputChange
                            }
                            return <AttributeGenerate key={index} data={attr} {...forInput} />
                        })
                    }
                </FormGenerate>
            </div>
        </div>
    );
}

export default Form;
