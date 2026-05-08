import { MapContainer, Marker, Polyline, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect, useMemo } from 'react'

const issIcon = new L.DivIcon({
  className: '',
  html: '<div class="iss-marker"><span></span></div>',
  iconSize: [34, 34],
  iconAnchor: [17, 17],
})

function MapFollower({ center }) {
  const map = useMap()

  useEffect(() => {
    if (center) map.flyTo(center, 3, { duration: 0.8 })
  }, [center, map])

  return null
}

function IssMap({ positions, latest }) {
  const center = latest ? [latest.latitude, latest.longitude] : [0, 0]
  const path = useMemo(() => positions.map((position) => [position.latitude, position.longitude]), [positions])

  return (
    <div className="h-[360px] overflow-hidden rounded-md border border-slate-200 dark:border-neutral-800">
      <MapContainer center={center} zoom={3} scrollWheelZoom className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {path.length > 1 ? <Polyline positions={path} pathOptions={{ color: '#0891b2', weight: 3 }} /> : null}
        {latest ? <Marker position={center} icon={issIcon} /> : null}
        <MapFollower center={latest ? center : null} />
      </MapContainer>
    </div>
  )
}

export default IssMap
