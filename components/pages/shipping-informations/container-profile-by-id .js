function ContainerProfileById({ data }) {
  console.log(data);

  return (
    <div className="w-1/2 space-y-2 rounded-md border p-2">
      <h2>Container Profile Data:</h2>
      <ul>
        <li>Container Profile: data.id</li>
        <li>Quantity: 15</li>
        <li>Location origin: Zwischenlager Brokdorf</li>
        <li>Waste profile: M001</li>
        <li>Container type: Strengthened steel</li>
      </ul>
    </div>
  );
}

export default ContainerProfileById;
