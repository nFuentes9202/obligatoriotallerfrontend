import { useSelector } from "react-redux";
import { selectCategorias } from "../../../../app/slices/categoriasSlice";
import PieChart from "./EventGraph/PieChart";
import { selectEvents } from "../../../../app/slices/eventsSlice";

const EventsGraphsContainer = () => {
  const events = useSelector(selectEvents) || [];
  const categorias = useSelector(selectCategorias) || [];

  const getAmountPerCategory = events.reduce((contador, evento) => {
      const { idCategoria } = evento;
      contador[idCategoria] = (contador[idCategoria] || 0) + 1;
      return contador;
    }, {});

  console.log("metodo obtener cant por categoria", getAmountPerCategory);
  
  const _nombreCategoria = (idCategoria) => {
    const unaCategoria = categorias.find((unaCat) => unaCat.id === idCategoria);
    return unaCategoria ? unaCategoria.tipo : "Sin categoria";
  };

  const getCategoryName = events.map(evento => {
    return _nombreCategoria(evento.idCategoria);
  });
  console.log("metodo obtener nombre de categoria", getCategoryName);

  const getCategoryNameUnique = Array.from(new Set(getCategoryName));
  console.log("nombres sin repetir: ", getCategoryNameUnique)

  return (
    <div className="row my-3">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h5>Gráfico barras</h5>
            <div className="placeholder"></div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card">
          <div className="card-body">
            <h5>Cantidades por categorías</h5>
            <div className="placeholder">
              <PieChart
                data={getAmountPerCategory}
                categorias={getCategoryNameUnique}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsGraphsContainer;
