import React from "react";
import { buscarCancion, getPaginaSiguienteOAnterior, } from "../../../api/apiCalls";
import { getAllAudioFeatures } from "../../../api/apiCustomMethods";
import { mergeAudioFeaturesWithSongObject, getMapWithIdAsKey, } from "../../../helpers/Tools";
import { useTranslation } from "react-i18next";
import { ContainerResultadoIndividual } from "../../containers/ContainerResultadoIndividual";
import caratula from "../../../assets/images/nadiecomoyo.jpg";

export function SongKeyFinder({ getRandomOnInit }) {
  const [t, i18n] = useTranslation("global");
  const [text, setText] = React.useState("");

  const [temporalMsgConfig, setTemporalMsgConfig] = React.useState({
    msg: "",
    type: "",
  });

  //array de resultados obtenidos tras la busqueda
  const [indexItemVisible, setIndexItemVisible] = React.useState(0);
  const [itemVisible, setItemVisible] = React.useState({});
  const [listaResultados, setListaResultados] = React.useState([{
    bpm: 85,
    name: "NADIE COMO YO",
    artists: [{ name: "FXY" }],
    key: 3,
    mode: 0,
    album: {
      images: [{ url: caratula }],
    },
    next:null,
    prev:null
  }]);
  const [resultadoBusqueda, setResultadoBusqueda] = React.useState([]);
  const [objetosAudioFeatures, setObjetosAudioFeatures] = React.useState([]);

  let handleSubmit = async (e) => {
    e.preventDefault();
    setIndexItemVisible(0);
    setText("");
    if (text === "") {
      return;
    } else {
      // console.log('Buscando...');
      buscarCancion(text, lleganResultadosDeBusqueda);
    }
  };
  //se ejecuta cada vez que resultadoBusqueda cambia
  React.useEffect(() => {
    //llegan varios
    if (resultadoBusqueda.tracks) {
      if (resultadoBusqueda.tracks.items.length > 0) {
        // console.log('resultadoBusqueda cambia, llegan tracks, llamando audio features');
        getAllAudioFeatures(
          resultadoBusqueda.tracks.items,
          lleganAudioFeatures
        );
      } else {
        setTemporalMsgConfig(() => {
          return { msg: "No hay resultados", type: "error" };
        });
      }
    } else if (resultadoBusqueda.id) {
      // console.log('resultadoBusqueda cambia, llegan tracks, llamando audio features');
      getAllAudioFeatures(resultadoBusqueda, lleganAudioFeatures);
    }
  }, [resultadoBusqueda]);
  React.useEffect(() => {
    setItemVisible(listaResultados[indexItemVisible]);
  }, [indexItemVisible]);

  React.useEffect(() => {
    setItemVisible(listaResultados[indexItemVisible]);
  }, [listaResultados]);

  //se ejecuta cada vez que audioFeatures cambia
  React.useEffect(() => {
    if (objetosAudioFeatures.length > 0 && !resultadoBusqueda.id) {
      let audioFeaturesMap = getMapWithIdAsKey(objetosAudioFeatures);
      let resultado = mergeAudioFeaturesWithSongObject(
        resultadoBusqueda.tracks.items,
        audioFeaturesMap
      );
      setListaResultados(resultado);
    } else {
      if (resultadoBusqueda.id) {
        resultadoBusqueda.key = objetosAudioFeatures[0].key;
        resultadoBusqueda.mode = objetosAudioFeatures[0].mode;
        resultadoBusqueda.bpm = objetosAudioFeatures[0].tempo;
        setListaResultados(resultadoBusqueda);
      }
    }
  }, [objetosAudioFeatures]);
  //funcion que se ejecuta cuando llegan los resultados
  function lleganResultadosDeBusqueda(resultados) {
    // console.log('Llegan resultados de busqueda. Actualizando resultadoBusqueda');
    if (resultados.err?.message) {
      setTemporalMsgConfig(() => {
        return { msg: "Error de red", type: "error", remain: true };
      });
      return;
    }
    setTemporalMsgConfig(() => {
      return {};
    }); //para borrar mensaje anterior
    setResultadoBusqueda(() => {
      return resultados;
    });
  }

  function lleganAudioFeatures(audio) {
    // console.log('llegan audio features, actualizando objetosaudiofeatuers');
    setObjetosAudioFeatures(audio);
  }
  function clickSiguiente() {
    setIndexItemVisible((prev) => prev + 1);
  }
  function clickAnterior() {
    setIndexItemVisible((prev) => prev - 1);
  }
  return (
    <div className="columna-centro">
      <form onSubmit={handleSubmit} className="linea-flex-start">
        <span className="input_and_button">
          <input
            id="input_artista"
            autoFocus
            type="search"
            value={text}
            placeholder={t("tools.intro-song")}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            id="submit_artista"
            type="submit"
            className="busqueda-boton-buscar boton zoom-on-click"
            disabled={text === "" ? true : false}
          >
            {t("tools.button-text")}
          </button>
        </span>
      </form>

      {itemVisible && (
        <ContainerResultadoIndividual
          item={itemVisible}
          reducirInformacion={false}
        >
          <div
            className="linea-flex-between"
            style={{
              position: "absolute",
              bottom: "1em",
              width: "95%",
            }}
          >
            {indexItemVisible > 0 && (
              <button
                className="boton-circulo-next"
                style={{ marginRight: "auto" }}
                onClick={clickAnterior}
              >
                Prev
              </button>
            )}
            {listaResultados.length>1 && indexItemVisible < 19 && (
              <button
                className="boton-circulo-next"
                style={{ marginLeft: "auto" }}
                onClick={clickSiguiente}
              >
                Next
              </button>
            )}
          </div>
        </ContainerResultadoIndividual>
      )}
      {indexItemVisible == 19 && (
        <>
          <p
            className="error"
            style={{ margin: "0.5em", fontWeight: "bold", textAlign: "center" }}
          >
            {t("tools.texto-error-resultados-1")}
          </p>
          <p className="error" style={{ margin: "0.5em", textAlign: "center" }}>
            {t("tools.texto-error-resultados-2")}
          </p>
        </>
      )}
    </div>
  );
}
