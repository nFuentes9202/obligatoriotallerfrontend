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
  const [cantComidasPorDia, setCantComidasPorDia] = useState([]);
  const [diasSemana, setDiasSemana] = useState([]);

  const _getDiasAnteriores = () => {
    const diasDeLaSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const hoy = new Date();
    const diasAnteriores = [];
  
    for (let i = 7; i > 0; i--) {
      const dia = new Date(hoy);
      dia.setDate(hoy.getDate() - i);
      diasAnteriores.push(dia);
    }
  
    return diasAnteriores.map(dia => diasDeLaSemana[dia.getDay()]);
  };

  const _getComidasPorDiaYSemana = () => {
    const hoy = new Date();
    const lastWeekDate = new Date(hoy);
    lastWeekDate.setDate(hoy.getDate() - 7);

    hoy.setHours(0, 0, 0, 0);
    lastWeekDate.setHours(0, 0, 0, 0);

    const conteosPorDia = new Array(7).fill(0);
    const diasDeLaSemana = _getDiasAnteriores();
    
    events.forEach(event => {
      const fechaEvento = new Date(event.fecha);

      fechaEvento.setHours(0, 0, 0, 0);

      if (event.idCategoria == 31 && fechaEvento >= lastWeekDate && fechaEvento < hoy) {
        const diaIndex = (fechaEvento.getDay() + 6) % 7;
        conteosPorDia[diaIndex]++;
      }
    });
    
    return {
      diasDeLaSemana: diasDeLaSemana,
      conteosPorDia: conteosPorDia
    };
  };

  useEffect(() => {
      const { diasDeLaSemana, conteosPorDia } = _getComidasPorDiaYSemana();
      setCantComidasPorDia(conteosPorDia);
      setDiasSemana(diasDeLaSemana);
      console.log(conteosPorDia);
      console.log(diasDeLaSemana);
  }, [events]);

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
                //data={[2, 3, 3, 7, 8, 9, 10]}
                //labels={["Dom", "Lun", "Mar", "Miér", "Jue", "Vier", "Sáb"]}
                data = {cantComidasPorDia}
                labels={diasSemana}
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
