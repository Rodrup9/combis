# Usar Socket Cliente

## Combi

1. Conectar al socket

```
http://localhost:3000
```

2. Conectar el socket de ubicaciones

```
/ubicaciones
```

3. Unirse a la sala de la ruta de la combi (uuid)

```
socket.emit('joinRoute', rutaId);
```

4. Hacer emit para guardar ubicacion real y autorecargar a todos los cleintes de la sala

```
const data = {
  id: id,
  lat: position.coords.latitude,
  lng: position.coords.longitude,
  busId: busId,
  rutaId: rutaId,
};
socket.emit('recibirUbicacion', data);
```

## Usuario (Ver rutas combis)

1. Conectar al socket

```
http://localhost:3000
```

2. Conectar el socket de ubicaciones

````
/ubicaciones
``` `getRouteLocations`

3. Unirse a la sala de la ruta de la combi (uuid)
````

socket.emit('joinRoute', rutaId);

```

4. Hacer ON (escuchar el sokcet `routeLocations`)
```

socket.on('routeLocations', (data: { ruta: string, ubicaciones: Array<{ numero: string, lat: number, lng: number }> }) => {})

```

```
