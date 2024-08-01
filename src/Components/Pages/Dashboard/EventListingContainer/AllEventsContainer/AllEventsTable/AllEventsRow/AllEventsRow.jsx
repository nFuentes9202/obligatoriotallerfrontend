const AllEventsRow = ({props}) => {
    return(
        <tr>
            <th scope="row">{props.icono}</th>
            <td>{props.categoria}</td>
            <td>{props.detalle}</td>
            <td>{props.fechaHora}</td>
            <td>Boton</td>
        </tr>
    );
};

export default AllEventsRow;

/* Ejemplo de row
<tr>
            <th scope="row">IconoComida</th>
            <td>Comida</td>
            <td>1ra comida del dia</td>
            <td>2024-07-31 08:02:11</td>
            <td>@</td>
</tr>
 */