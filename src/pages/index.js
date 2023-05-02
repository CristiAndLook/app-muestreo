import DisplayData from "@/components/DisplayData.jsx";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";
// #EE2B7B Color Magenta comfama 
// #D9D9D9 Color Gris comfama


function App() {
  return (
    <div>
      <Head>
        <title>Generador de Muestras</title>
        <meta name="description" content="Generador de Muestras" />
        <link
          rel="stylesheet"
          href="https://bootswatch.com/5/minty/bootstrap.min.css"
        />
        <link rel="icon" href="/letter-c.png" />
      </Head>

      <Header />

      <h1 className="text-center mt-5">Generador de Muestras</h1>

      <section>
        <DisplayData />
      </section>
    </div>
  );
}

export default App;
