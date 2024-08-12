import { useSelector } from "react-redux";
import { selectCategorias } from "../../../../app/slices/categoriasSlice";
import { selectEvents } from "../../../../app/slices/eventsSlice";

import PieChart from "./EventGraph/PieChart";
import LineChart from "./EventGraph/LineChart";
import FeedingTimer from "./FeedingTimer/FeedingTimer";
import { useEffect, useState } from "react";

const EventsGraphsContainer = () => {
  const events = useSelector(selectEvents) || [];
  const categorias = useSelector(selectCategorias) || [];
  const [dataCantComidasPorDiaSem, setDataCantComidasPorDiaSem] = useState();

  const _countEventsComidasByDate = () => {
    const conteo = {};
    events.forEach((evento) => {
      if (evento.idCategoria === 31) {
        const fecha = evento.fecha.split(" ")[0];
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
    const eventoComidasConDiaSemana = _countEventsComidasByDate().map(
      (evento) => {
        const fecha = new Date(evento.fecha);
        const diaSemana = diasSemana[fecha.getDay()];
        return {
          ...evento,
          diaSemana: diaSemana,
        };
      }
    );
    return eventoComidasConDiaSemana;
  };

  useEffect(() => {
    if (events.length > 0) {
      setDataCantComidasPorDiaSem(_cantComidasPorDia());
    }
  }, [events]);
  console.log("dataCantComidasPorDiaSem", dataCantComidasPorDiaSem);
  



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
    <div className="row my-3 g-2">
      <div className="col-md-4 d-flex align-items-stretch">
        <div className="card w-100">
          <div className="card-body">
            <h5>Gráfico barras</h5>
            <div className="placeholder">
              <LineChart
                data={[2, 3, 3, 7, 8, 9, 10]}
                labels={["Dom", "Lun", "Mar", "Miér", "Jue", "Vier", "Sáb"]}
                /*data = {[dataCantComidasPorDiaSem.cantComidas]}
                labels = {[dataCantComidasPorDiaSem.diaSemana]}*/
              />
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4 d-flex align-items-stretch">
        <div className="card w-100">
          <div className="card-body">
            <h5>Cantidades por categorías</h5>
            <div className="placeholder">
              <PieChart data={quantities} categorias={getCategoryName} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4 d-flex align-items-stretch">
        <div className="card w-100">
          <div className="card-body">
            <h5>Tiempo restante para alimentar al bicho..</h5>
            <div className="placeholder">
              <FeedingTimer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsGraphsContainer;
