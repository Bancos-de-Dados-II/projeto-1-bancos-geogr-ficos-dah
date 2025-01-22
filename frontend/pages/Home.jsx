import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import { CreateDenuncia } from '../components/CreateDenunciaButton';
import { Header } from '../components/Header';
import axios from '../config/axios';
import { getToken } from '../utils';


function Home() {
  const [allDenuncias, setAllDenuncias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState(null);
  const token = getToken();

  useEffect(() => {
    (async () => {
      try {
        if (!token) return;
        const req = await axios.get('/denuncias');
        
        setAllDenuncias(req.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    })()
  }, []);

  if (loading) {
    return <h1>Carregando...</h1>
  }

  return (
    <>
      <Header/>
    
      <MapContainer 
        center={[-6.88948, -38.545306]} 
        zoom={20} 
        scrollWheelZoom={false} 
        className='w-full h-screen relative'
      >
        <TileLayer
            attribution="Google Maps"
            url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
        />

        <LocationMarker position={position} setPosition={setPosition}/>

        {
          allDenuncias.map((denuncia, idx) => {
            return (
              <Marker key={idx} position={[denuncia.latitude, denuncia.longitude]}>
                <Popup>
                  <h5 className='text-base font-semibold text-center'>{denuncia.categoria}</h5> <br />
                  <p className='text-sm font-normal text-center'>{ denuncia.descricao }</p>
                </Popup>
              </Marker>
            )
          })
        }
      </MapContainer>

      <CreateDenuncia latlng={position} />
    </>
  );
}

export default Home;

function LocationMarker({position, setPosition}) {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
    }
  })

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}