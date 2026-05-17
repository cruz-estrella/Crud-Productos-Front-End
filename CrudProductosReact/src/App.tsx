import TablaGenerica from "./components/TablaGenerica";

function App() {
  const columns = [
    {
      key: "name",
      label: "Nombre",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "age",
      label: "Edad",
    },
  ];

  const data = [
    {
      id: 1,
      name: "Juan",
      email: "juan@prueba.com",
      age: 25,
    },
    {
      id: 2,
      name: "Maria",
      email: "maria@prueba.com",
      age: 30,
    },
    {
      id: 3,
      name: "Pedro",
      email: "pedro@test.com",
      age: 28,
    },
  ];

  return (
    <div className="p-10">
      <TablaGenerica
        columns={columns}
        data={data}
        rowsPerPage={2}
      />
    </div>
  );
}

export default App;