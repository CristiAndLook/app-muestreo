import { useState } from "react";
import TechnicalEstimadoresMas from "../fichasTecnicas/TechnicalEstimadoresMas";

const EstimadoresMas = () => {
  const [hasData, setHasData] = useState(false);

  const [mas, setMas] = useState({
    auditoria: "",
    nivelDeConfianza: "",
    N: "",
    n: "",
    resultados: "",
    Z: 0,
  });

  const onChange = (event) => {
    event.preventDefault();
    setMas({ ...mas, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    function NormSInv(p) {
      var a1 = -39.6968302866538,
        a2 = 220.946098424521,
        a3 = -275.928510446969;
      var a4 = 138.357751867269,
        a5 = -30.6647980661472,
        a6 = 2.50662827745924;
      var b1 = -54.4760987982241,
        b2 = 161.585836858041,
        b3 = -155.698979859887;
      var b4 = 66.8013118877197,
        b5 = -13.2806815528857,
        c1 = -7.78489400243029e-3;
      var c2 = -0.322396458041136,
        c3 = -2.40075827716184,
        c4 = -2.54973253934373;
      var c5 = 4.37466414146497,
        c6 = 2.93816398269878,
        d1 = 7.78469570904146e-3;
      var d2 = 0.32246712907004,
        d3 = 2.445134137143,
        d4 = 3.75440866190742;
      var p_low = 0.02425,
        p_high = 1 - p_low;
      var q, r;
      var retVal;

      if (p < 0 || p > 1) {
        alert("NormSInv: Argument out of range.");
        retVal = 0;
      } else if (p < p_low) {
        q = Math.sqrt(-2 * Math.log(p));
        retVal =
          (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
          ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
      } else if (p <= p_high) {
        q = p - 0.5;
        r = q * q;
        retVal =
          ((((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q) /
          (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
      } else {
        q = Math.sqrt(-2 * Math.log(1 - p));
        retVal =
          -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
          ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
      }

      return retVal;
    }
    // Aquí podrías hacer alguna validación o manipulación de los datos antes de enviarlos al componente.
    mas.nivelDeConfianza = Number(mas.nivelDeConfianza);
    mas.N = Number(mas.N);
    mas.n = Number(mas.n);
    mas.resultados = Number(mas.resultados);

    //Hallamos Z
    let z = mas.nivelDeConfianza / 100; //Pasamos a decimal
    let alfa = 1 - z; //Nivel de significancia
    mas.Z = NormSInv(z * (alfa / 2)) * -1; //Hallamos Z
    // Luego los enviamos al componente Data como propiedades
    setHasData(true);
  };

  return (
    <section>
      <form
        className="form-select-sm d-flex flex-column"
        onSubmit={handleSubmit}
      >
        <div className="d-flex flex-row justify-content-around">
          <div className="d-flex flex-column ml-5">
            <label className="form-label mt-1">
              Nombre de la auditoria:
              <input
                className="form-control"
                type="text"
                value={mas.auditoria}
                name="auditoria"
                onChange={onChange}
              />
            </label>
            <label className="form-label mt-1">
              Nivel de confianza (1-100%):
              <input
                className="form-control"
                type="number"
                value={mas.nivelDeConfianza}
                name="nivelDeConfianza"
                onChange={onChange}
              />
            </label>
            <label className="form-label mt-1">
              Población (N):
              <input
                className="form-control"
                type="number"
                value={mas.N}
                name="N"
                onChange={onChange}
              />
            </label>
            <label className="form-label mt-1">
              Muestra (n):
              <input
                className="form-control"
                type="number"
                value={mas.n}
                name="n"
                onChange={onChange}
              />
            </label>
            <label className="form-label mt-1">
              Resultados (número de hallazgos):
              <input
                className="form-control"
                type="number"
                value={mas.resultados}
                name="resultados"
                onChange={onChange}
              />
            </label>
          </div>
        </div>

        <button
          className="btn btn-secondary m-2 mb-5 mt-5"
          style={{ background: "#EE2B7B", color: "white" }}
          type="submit"
        >
          Obtener Estimadores de proporción
        </button>
      </form>

      <div>{hasData && <TechnicalEstimadoresMas {...mas} />}</div>
    </section>
  );
};

export default EstimadoresMas;
