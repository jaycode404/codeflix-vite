import { ref, get } from "firebase/database";
import { db } from './firebase';

export function obtenerVideos() {
  const videosRef = ref(db, 'videos');
  return get(videosRef).then((snapshot) => {
    if (snapshot.exists()) {
      const videosData = snapshot.val();
      if (!videosData) return []; // Si no hay datos, devolver un array vacío
      
      // Convertir el objeto de videos en un array con id incluido
      const videosArray = Object.keys(videosData).map(key => ({
        id: key, // Usar la clave como id único
        ...videosData[key] // Resto de los datos del video
      }));
      
      return videosArray;
    } else {
      console.log('No se encontraron videos');
      return [];
    }
  }).catch(error => {
    console.error('Error al obtener videos:', error);
    return [];
  });
}
