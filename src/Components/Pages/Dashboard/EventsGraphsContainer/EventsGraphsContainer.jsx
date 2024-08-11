import { useSelector } from "react-redux";
import { selectCategorias } from "../../../../app/slices/categoriasSlice";
import { selectEvents } from "../../../../app/slices/eventsSlice";

import PieChart from "./EventGraph/PieChart";
import LineChart from "./EventGraph/LineChart";

const EventsGraphsContainer = () => {
  const events = useSelector(selectEvents) || [];
  const categorias = useSelector(selectCategorias) || [];

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
                data={[8, 10, 9, 10, 11, 10, 9]}
                labels={["Lun", "Mar", "Mier", "Juev" ,"Vier" ,"Sab" ,"Dom" ]}
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
              <PieChart 
                data={quantities} 
                categorias={getCategoryName} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsGraphsContainer;
