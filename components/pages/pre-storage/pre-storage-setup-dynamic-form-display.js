import FormPreStorageType from "./pre-storage-type/forms/form-pre-storage-type";
import FormPreStorageEmployee from "./pre-storage-employee/forms/form-pre-storage-employee";
import TablePreStorageType from "./pre-storage-type/edit-delete/pre-storage-type-profile";
import TablePreStorageEmployee from "./pre-storage-employee/edit-delete/pre-storage-employee-profile";

export default function PreStorageSetupDynamicFormDisplay({
  activeButton,
  setActiveButton,
}) {
  return (
    <div className="flex justify-center">
      {activeButton === "Pre-Storage_Type_Form" ? (
        <FormPreStorageType OnCancel={setActiveButton} />
      ) : null}

      {activeButton === "Pre-Storage_Type_Table" ? (
        <TablePreStorageType OnCancel={setActiveButton} />
      ) : null}

      {activeButton === "Pre-Storage_Employee_Form" ? (
        <FormPreStorageEmployee OnCancel={setActiveButton} />
      ) : null}

      {activeButton === "Pre-Storage_Employee_Table" ? (
        <TablePreStorageEmployee OnCancel={setActiveButton} />
      ) : null}
    </div>
  );
}
