import ShowContainerType from "./show-container-type";
import useContainerTypeQuery from "./../../../../../requests/request-container-profile/request-container-type/use-fetch-container-type";

export default function TableContainerType({ OnCancel }) {
  const { data: containerTypeData } = useContainerTypeQuery();

  return (
    <div className="mx-auto w-2/3 pt-8">
      <table className="table border-l-4 border-rose-500">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Details</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {containerTypeData?.map((containerData) => (
            <ShowContainerType
              key={containerData.id}
              isCancel={() => OnCancel(null)}
              containerData={containerData}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
