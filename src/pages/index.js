import Seleccion from "@/components/Muestras/Seleccion";
import FormPersonalData from "@/components/FormPersonalData";

function App() {
  return (
    <div>
      <p>Header</p>
      <h1>Generador de Muestras</h1>
      <section>
        <h2>Ficha Técnica</h2>
        <FormPersonalData />
        <Seleccion />
      </section>

      <section>
        <h2>Graph</h2>
      </section>

      <p>Footer</p>
    </div>
  );
}

export default App;
