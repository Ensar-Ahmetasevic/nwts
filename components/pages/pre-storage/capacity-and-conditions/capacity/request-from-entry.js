export default function RequestFromEntry({ request }) {
  // Novi zahtjev od firme {request.companyName}, registarski broj tablica
  // {request.registrationPlates} sa {request.totalQuantity} kontejnera

  return (
    <div className="w-full overflow-x-auto">
      <table className="menu table min-h-full w-1/2 bg-base-200 p-4 text-base-content">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Company name:</th>
            <th>Registration:</th>
            <th>Quantity</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th></th>
            <td>{request.companyName}</td>
            <td>{request.registrationPlates}</td>
            <td>{request.totalQuantity}</td>
            <td>
              <button className="btnSave">Accept</button>
            </td>
            <td>
              <button className="btnCancel">Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
