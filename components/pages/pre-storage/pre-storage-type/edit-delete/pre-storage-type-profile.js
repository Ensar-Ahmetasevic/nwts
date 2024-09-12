import usePreStorageTypeQuery from "./../../../../../requests/request-pre-storage-setup/request-pre-storage-type/use-fetch-pre-storage-type-query,";

import ShowPreStorageType from "./show-pre-storage-type";

export default function TablePreStorageType({ OnCancel }) {
  const { data: preStorageTypeData } = usePreStorageTypeQuery();

  return (
    <div className="mx-auto pt-8">
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
          {preStorageTypeData?.map((preStorageData) => (
            <ShowPreStorageType
              key={preStorageData.id}
              isCancel={() => OnCancel(null)}
              preStorageData={preStorageData}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
