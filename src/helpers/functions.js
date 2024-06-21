import { ref, get } from "firebase/database";
import { db } from './firebase';

export function obtenerVideos() {
  const videosRef = ref(db, 'videos');
  return get(videosRef).then((snapshot) => {
    if (snapshot.exists()) {
      const videosData = snapshot.val();
      if (!videosData) return []; 
      const videosArray = Object.keys(videosData).map(key => ({
        id: key, 
        ...videosData[key]
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
