function TechnicalEstimadoresMas(mas) {
  //Variables de fecha
  const fechaActual = new Date();
  const dia = fechaActual.getDate();
  const mes = fechaActual.getMonth() + 1; // Los meses en JS empiezan en 0
  const anio = fechaActual.getFullYear();

  const ratio = Math.round((mas.resultados / mas.n) * 100);

  const P = mas.resultados / mas.n;
  const Q = 1 - P;
  const limit =
    (((P * Q) / (mas.n - 1)) * ((mas.N - mas.n) / mas.N)) ** 0.5 * 2;

  const limitUp = P + limit * mas.Z;
  const limitDown = P - limit * mas.Z;

  return (
    <div>
      <h2 className="text-center m-4 mt-5">Ficha técnica estiamdores MAS</h2>
      <div>
        <section className="d-flex flex-column card border-secondary mb-5 m-2 p-2">
          <p>Fecha: {`${dia}/${mes}/${anio}`}</p>
          <p>Diseño muestral: Muestra Aleatoria Simple</p>
          <p>Tipo de auditoria: {mas.auditoria}</p>
          <p>Tamaño de la población: {mas.N}</p>
          <p>Tamaño de la muestra: {mas.n}</p>
          <p>Nivel de confianza: {mas.nivelDeConfianza}</p>
          <p>Hallazgos: {mas.resultados}</p>
          <p>Proporción muestral: {ratio}% </p>
          <p>Límite del error estándar: {(limit * 100).toFixed(2)}%</p>
          <p>
            Estimador (Intervalo de confianza): {(limitDown * 100).toFixed(1)}%
            : {(limitUp * 100).toFixed(1)}%
          </p>
        </section>
      </div>
    </div>
  );
}

export default TechnicalEstimadoresMas;
