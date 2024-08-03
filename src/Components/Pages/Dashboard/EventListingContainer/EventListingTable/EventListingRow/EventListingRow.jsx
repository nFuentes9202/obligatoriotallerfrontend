const EventListingRow = ({icono, idCategoria, detalle, fecha}) => {
    // agregar como prop id, userLogged, onDelete
    return(
        <tr>
            <td>{icono}</td>
            <td>{idCategoria}</td>
            <td>{detalle}</td>
            <td>{fecha}</td>
            <td>
                <button className="btn btn-danger">Eliminar</button>
            </td>
        </tr>
    );
};

export default EventListingRow;

/* Ejemplo de row
<tr>
            <th scope="row">IconoComida</th>
            <td>Comida</td>
            <td>1ra comida del dia</td>
            <td>2024-07-31 08:02:11</td>
            <td>@</td>
</tr>
 */