const EventListingRow = ({icono, categoria, detalle, fechaHora}) => {
    return(
        <tr>
            <td>{icono}</td>
            <td>{categoria}</td>
            <td>{detalle}</td>
            <td>{fechaHora}</td>
            <td>Boton</td>
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