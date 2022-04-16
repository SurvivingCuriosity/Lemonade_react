import React from "react";
import Select from 'react-select'


export function KeyScaleSelect(props){

    const [keySelected,setKeySelected]= React.useState("");
    const [keyLabelSelected,setKeyLabelSelected]= React.useState("");
    const [scaleSelected,setScaleSelected] = React.useState("");

    const {titulo} = props;

    const optionsKey = [
        {
            label: "C",
            value: 0,
        },
        {
            label: "C#",
            value: 1,
        },
        {
            label: "D",
            value: 2,
        },
        {
            label: "D#",
            value: 3,
        },
        {
            label: "E",
            value: 4,
        },
        {
            label: "F",
            value: 5,
        },
        {
            label: "F#",
            value: 6,
        },
        {
            label: "G",
            value: 7,
        },
        {
            label: "G#",
            value: 8,
        },
        {
            label: "A",
            value: 9,
        },
        {
            label: "A#",
            value: 10,
        },
        {
            label: "B",
            value: 11,
        },
        

    ];

    const optionsScale = [
        {
            label: "Mayor",
            value: 1,
        },
        {
            label: "Menor",
            value: 0,
        }
    ];

    const handleChangeKey = (e) =>{
        setKeySelected(e.value)
        setKeyLabelSelected(e.label)
    }
    const handleChangeScale = (e) =>{
        setScaleSelected(e.value)
    }

    const customStyles = {
        container: (provided) => ({
            ...provided,
        }),
        option: (provided) => ({
          ...provided,
          borderBottom: '1px solid var(--colorTextoColor)',
          color: 'var(--colorTextoColor)',
          backgroundColor: 'var(--fondo)'
        }),
        control: (provided) => ({
          ...provided,
          marginTop: "5%",
          color: 'var(--colorTextoColor)',
          backgroundColor: 'var(--fondo)'
        }),
        menu: (provided) => ({
            ...provided,
            textAlign:'center',
            position:'initial',
            color: 'var(--colorTextoColor)',
            backgroundColor: 'var(--fondo)'
        }),
        placeholder:(provided) => ({
            ...provided,
            color: 'var(--colorTextoColor)',
        })
    }
    
    return(
        <div className="busqueda-container">
            <h2 className="busqueda-titulo">{titulo}</h2>
            <div className="linea-flex-center">
                <Select
                    isMulti
                    placeholder={"Introduce nota(s)"}
                    isSearchable={false}
                    value={keySelected}
                    options={optionsKey}
                    styles = {customStyles}
                    onChange={handleChangeKey}
                />
                <Select
                    isMulti
                    placeholder={"Introduce escala(s)"}
                    isSearchable={false}
                    value={scaleSelected}
                    options={optionsScale}
                    styles = {customStyles}
                    onChange={handleChangeScale}
                />
            </div>
        </div>
    )
}