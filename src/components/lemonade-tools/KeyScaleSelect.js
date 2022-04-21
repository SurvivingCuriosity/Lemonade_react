import React from "react";
import Select from 'react-select'


export function KeyScaleSelect(props){
    const {titulo} = props;

//nota seleccionada y su label keySelected=0 keySelectedLabel="C"
    const [keySelected,setKeySelected]= React.useState(-1);
    const [keySelectedLabel,setKeySelectedLabel]= React.useState("");

//escala seleccionada y su label scaleSelected=0 scaleSelected="menor"
    const [scaleSelected,setScaleSelected] = React.useState(-1);
    const [scaleSelectedLabel,setScaleSelectedLabel] = React.useState("");
    
//objeto que representa la nota y la escala
    const [seleccion, setSeleccion] = React.useState(props.seleccion);


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
          backgroundColor: 'var(--fondo)'
        }),
        control: (provided) => ({
          ...provided,
          marginTop: "5%",
          color: 'var(--colorTextoColor)',
          backgroundColor: 'var(--fondo)',
          border:'1px solid var(--color)'
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
        }),
    }

    const handleChangeKey = (e) =>{
        console.log('key cambia a '+e.value);
        setKeySelected(e.value)
        setKeySelectedLabel(e.label)
    }
    const handleChangeScale = (e) =>{
        console.log('scale cambia a '+e.value);
        setScaleSelected(e.value)
        setScaleSelectedLabel(e.label)
    }

    React.useEffect(()=>{
        //si se han seleccionado nota y escala le paso los datos al padre
        if(keySelected>-1 && scaleSelected>-1){
            console.log("Key final: "+keySelected);
            console.log('Scale final:'+scaleSelected);
            props.parentCallback({
                nota : keySelected,
                escala: scaleSelected,
                notaLabel: keySelectedLabel,
                escalaLabel: scaleSelectedLabel,
            });
        }
    },[keySelected,scaleSelected])
    
    return(
        <div className="busqueda-container">
            <h2 className="busqueda-titulo">{titulo}</h2>
            <div className="linea-flex-center">
                <Select
                    isSearchable={false} //no se puede buscar
                    options={optionsKey} //contiene pares value:label para rellenar las opciones
                    menuShouldScrollIntoView //cuando se abren las opciones hace scroll hacia abajo
                    placeholder={keySelected>-1 ? keySelectedLabel : "Introduce nota"}
                    styles = {customStyles}
                    onChange={handleChangeKey}
                    setValue={-1}
                />
                <Select
                    isSearchable={false}
                    options={optionsScale}
                    menuShouldScrollIntoView
                    placeholder={(scaleSelected>-1) ? scaleSelectedLabel : "Introduce escala"}
                    styles = {customStyles}
                    onChange={handleChangeScale}
                    setValue={-1}
                />
            </div>
        </div>
    )
    

}