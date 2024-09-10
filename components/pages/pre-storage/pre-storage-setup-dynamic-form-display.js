import FormPreStorageType from "./pre-storage-type/forms/form-pre-storage-type";
import FormPreStorageEmployee from "./pre-storage-employee/forms/form-pre-storage-employee";

export default function PreStorageSetupDynamicFormDisplay({
  activeButton,
  setActiveButton,
}) {
  return (
    <div className="flex justify-center">
      {activeButton === "Pre-Storage_Type_Form" ? (
        <FormPreStorageType OnCancel={setActiveButton} />
      ) : null}

      {activeButton === "Pre-Storage_Employee_Form" ? (
        <FormPreStorageEmployee OnCancel={setActiveButton} />
      ) : null}
    </div>
  );
}
