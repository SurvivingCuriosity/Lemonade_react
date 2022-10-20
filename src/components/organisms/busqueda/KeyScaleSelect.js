import React from "react";
import Select from 'react-select'


export function KeyScaleSelect(props){
    const {titulo, disabled, mensaje, colorPlaceHolder, callbackEleccion} = props;

//nota seleccionada y su label keySelected=0 keySelectedLabel="C"
    const [keySelected,setKeySelected]= React.useState(-1);
    const [keySelectedLabel,setKeySelectedLabel]= React.useState("");

//escala seleccionada y su label scaleSelected=0 scaleSelected="menor"
    const [scaleSelected,setScaleSelected] = React.useState(-1);
    const [scaleSelectedLabel,setScaleSelectedLabel] = React.useState("");
    


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

    const customStyles = {
        option: (provided) => ({
          ...provided,
          borderBottom: '1px solid var(--colorTextoColor)',
          color: 'var(--colorTextoColor)',
          backgroundColor: 'var(--fondo)',
          overflowY: 'hidden'
        }),
        control: (provided) => ({
          ...provided,
          color: 'var(--colorTextoColor)',
          backgroundColor: 'var(--fondo)',
          border:'1px solid var(--blanco3)',
          overflowY: 'hidden'
          
        }),
        menu: (provided) => ({
            ...provided,
            textAlign:'center',
            position:'initial',
            color: 'var(--blanco3)',
            backgroundColor: 'var(--fondo)',
            
        }),
        placeholder:(provided) => ({
            ...provided,
            color: colorPlaceHolder,
        }),
        // multiValue:(provided) => ({
        //     ...provided,
        //     color: 'var(--colorTextoColor)',
        //     backgroundColor: 'var(--fondo2)'
        // }),
        // multiValueLabel:(provided) => ({
        //     ...provided,
        //     color: 'var(--colorTextoColor)',
        // }),
        singleValue:(provided) => ({
            ...provided,
            color: 'var(--colorTextoColor)',
            fontSize:'1.15em',
            padding:'0.25em'
        }),
    }

    const handleChangeKey = (e) =>{
        setKeySelected(()=>{return e.value})
        setKeySelectedLabel(()=>{return e.label})
    }
    const handleChangeScale = (e) =>{
        setScaleSelected(()=>{return e.value})
        setScaleSelectedLabel(()=>{return e.label})
    }

    React.useEffect(()=>{
        //si se han seleccionado nota y escala le paso los datos al padre
        if(keySelected>-1 && scaleSelected>-1){
            //paso la seleccion al padre mediante un objeto que contiene los valores y las label
            callbackEleccion({
                nota : keySelected,
                escala: scaleSelected,
                notaLabel: keySelectedLabel,
                escalaLabel: scaleSelectedLabel,
            });
        }
    },[keySelected, scaleSelected])
    
    return(
        <div className="busqueda-container">
            <h2 className="busqueda-titulo">{titulo}</h2>
            <div className="linea-flex-center">
                <Select
                    isDisabled={disabled}
                    isSearchable={false} //no se puede buscar
                    options={optionsKey} //contiene pares value:label para rellenar las opciones
                    menuShouldScrollIntoView //cuando se abren las opciones hace scroll hacia abajo
                    placeholder={(!disabled && keySelected>-1) ? keySelectedLabel : "Nota"}
                    styles = {customStyles}
                    onChange={handleChangeKey}
                    value={2}
                />
                <Select
                    isDisabled={disabled}
                    isSearchable={false}
                    options={optionsScale}
                    menuShouldScrollIntoView
                    placeholder={(!disabled && scaleSelected>-1) ? scaleSelectedLabel : "Escala"}
                    styles = {customStyles}
                    onChange={handleChangeScale}
                    value={2}
                />
            </div>
        </div>
    )
    

}