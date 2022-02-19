import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import constant from "navigation/CONSTANT";
import { Link } from 'react-router-dom';
import FormGenerate from 'component/FormGenerate';
import AttributeGenerate from 'component/attributeGenerate';
import { useSelector } from 'react-redux';
import { fetchForm } from "feature/allForm"

const Form = (props) => {
    const Dispatch = useDispatch()
    const { formId } = useParams()
    const activeForm = useSelector(data => data.forms.form.find(f => f._id == formId))
    const [data, setData] = useState([{ name: "", value: "" }])

    console.log(activeForm)
    if(!activeForm){
        Dispatch(fetchForm())
    }
    useEffect(() => {
        if(!activeForm)return
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
    const submit = (ev) => {
        const inputData =  data.reduce((prev,cur)=>{
            for(let v in cur){
                prev[cur.name] = cur.value
            }
            return prev
        },{})
        console.log(activeForm)
        ev.preventDefault()
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
            <div className='home'>
                <h1 className='display-4 text-danger perfect-center'>Oops! Form not found try again</h1>
            </div>
        )
    }
    return (
        <div>
            <div className="container home perfect-center">
                <FormGenerate {...activeForm.formDetail} onSubmit={submit}>
                    {
                        activeForm.all_attribute_details.map((attr, index) => {
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
