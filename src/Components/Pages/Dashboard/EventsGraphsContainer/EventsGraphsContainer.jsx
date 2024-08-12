import { useSelector } from "react-redux";
import { selectCategorias } from "../../../../app/slices/categoriasSlice";
import { selectEvents } from "../../../../app/slices/eventsSlice";

import PieChart from "./EventGraph/PieChart";
import LineChart from "./EventGraph/LineChart";
import { useEffect, useState } from "react";

const EventsGraphsContainer = () => {
  const events = useSelector(selectEvents) || [];
  const categorias = useSelector(selectCategorias) || [];
  const [dataEventsByDate, setDataEventsByDate] = useState();
  const [dataCantComidasPorDiaSem, setDataCantComidasPorDiaSem] = useState();

  const _countEventsComidasByDate = () => {
    const conteo = {};
    events.forEach((evento) => {
      if (evento.idCategoria === 31) {
        const fecha = evento.fecha.split(" ")[0]; // Obtener solo la fecha (AAAA-MM-DD)
        if (!conteo[fecha]) {
          conteo[fecha] = 0;
        }
        conteo[fecha] += 1;
      }
    });

    return Object.keys(conteo).map((fecha) => ({
      fecha,
      cantComidas: conteo[fecha],
    }));
    
  };

  const diasSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const eventoComidasConDiaSemana = _countEventsComidasByDate().map((evento) => {
    const fecha = new Date(evento.fecha);
    //console.log("fecha", fecha);
    const diaSemana = diasSemana[fecha.getDay()];
    //console.log("Dia sem:",diaSemana);
    return {
      ...evento,
      diaSemana: diaSemana,
    };
    
  });
/*
  const _cantComidasPorDia = () => {
    const diasSemana = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const eventoComidasConDiaSemana = _countEventsComidasByDate().map((evento) => {
      const fecha = new Date(evento.fecha);
      //console.log("fecha", fecha);
      const diaSemana = diasSemana[fecha.getDay()];
      //console.log("Dia sem:",diaSemana);
      return {
        ...evento,
        diaSemana: diaSemana,
      };
      
    })
  };
*/
  

  useEffect(() => {
    if (events.length > 0) {
      setDataEventsByDate(_countEventsComidasByDate(events));
      setDataCantComidasPorDiaSem(eventoComidasConDiaSemana);
      //cantComidasPorDia();
    }
  }, [events]);

  console.log("--dataCantComidasPorDiaSem",dataCantComidasPorDiaSem);
  console.log("dataEventsByDate", dataEventsByDate);
  /*
  //borrar
  const getDayOfWeek = () => {
    events.forEach((evento) => {
      const fecha = new Date(evento.fecha);
      const diasSemana = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ];
      const diaSemana = diasSemana[fecha.getDay()];
      console.log(
        `Fecha: ${evento.fecha}, Día de la semana: ${diaSemana}, Comidas: ${evento.comidas}`
      );
      console.log("diasem", diaSemana);

      return diasSemana;
    });
  };
  //fin borrar
*/
  /*const crearArrayCantComidasXDia = Object.entries(getAmountPerCategory).map(
    ([idCategoria, cantidad]) => ({
      idCategoria: Number(idCategoria),
      cantidad,
    })
  );*/
  /////////////////////////

  const getAmountPerCategory = events.reduce((contador, evento) => {
    const { idCategoria } = evento;
    contador[idCategoria] = (contador[idCategoria] || 0) + 1;
    return contador;
  }, {});

  const arrayAmountPerCategory = Object.entries(getAmountPerCategory).map(
    ([idCategoria, cantidad]) => ({
      idCategoria: Number(idCategoria),
      cantidad,
    })
  );

  const quantities = arrayAmountPerCategory.map((obj) => {
    return obj.cantidad;
  });

  const _nombreCategoria = (idCategoria) => {
    const unaCategoria = categorias.find((unaCat) => unaCat.id === idCategoria);
    return unaCategoria ? unaCategoria.tipo : "Sin categoria";
  };

  const getCategoryName = arrayAmountPerCategory.map((obj) => {
    return _nombreCategoria(obj.idCategoria);
  });

  return (
    <div className="row my-3">
      <div className="col-7">
        <div className="card">
          <div className="card-body">
            <h5>Gráfico barras</h5>
            <div className="placeholder">
              <LineChart
                data={[2, 3, 3, 7, 8, 9, 10]}
                labels={["Dom", "Lun", "Mar", "Miér", "Jue", "Vier", "Sáb"]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-5">
        <div className="card">
          <div className="card-body">
            <h5>Cantidades por categorías</h5>
            <div className="placeholder">
              <PieChart data={quantities} categorias={getCategoryName} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsGraphsContainer;
