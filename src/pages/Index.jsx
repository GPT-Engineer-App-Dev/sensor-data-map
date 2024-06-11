import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Box, Text, VStack, Container } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Dummy data for Norwegian buildings and sensor data
const buildings = [
  { id: 1, name: "Building 1", position: [59.911491, 10.757933], sensors: { temperature: "20°C", humidity: "50%" } },
  { id: 2, name: "Building 2", position: [60.391263, 5.322054], sensors: { temperature: "22°C", humidity: "45%" } },
  { id: 3, name: "Building 3", position: [58.969975, 5.733107], sensors: { temperature: "19°C", humidity: "55%" } },
  { id: 4, name: "Building 4", position: [63.430515, 10.395053], sensors: { temperature: "21°C", humidity: "48%" } },
  { id: 5, name: "Building 5", position: [69.649205, 18.955324], sensors: { temperature: "18°C", humidity: "60%" } },
  { id: 6, name: "Building 6", position: [59.13118, 11.38754], sensors: { temperature: "20°C", humidity: "52%" } },
  { id: 7, name: "Building 7", position: [59.263889, 10.421111], sensors: { temperature: "23°C", humidity: "47%" } },
  { id: 8, name: "Building 8", position: [59.913869, 10.752245], sensors: { temperature: "21°C", humidity: "49%" } },
  { id: 9, name: "Building 9", position: [59.924444, 10.758611], sensors: { temperature: "19°C", humidity: "53%" } },
  { id: 10, name: "Building 10", position: [59.939167, 10.719444], sensors: { temperature: "22°C", humidity: "46%" } },
];

const Index = () => {
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const handleMarkerClick = (building) => {
    setSelectedBuilding(building);
  };

  const customIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <Container maxW="100vw" maxH="100vh" p={0} m={0}>
      <MapContainer center={[59.911491, 10.757933]} zoom={5} style={{ height: "100vh", width: "100vw" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {buildings.map((building) => (
          <Marker
            key={building.id}
            position={building.position}
            icon={customIcon}
            eventHandlers={{
              click: () => handleMarkerClick(building),
            }}
          >
            <Popup>{building.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
      {selectedBuilding && (
        <Box
          position="absolute"
          top="10"
          left="10"
          bg="white"
          p={4}
          borderRadius="md"
          boxShadow="md"
          zIndex="1000"
        >
          <VStack spacing={2}>
            <Text fontSize="lg" fontWeight="bold">{selectedBuilding.name}</Text>
            <Text>Temperature: {selectedBuilding.sensors.temperature}</Text>
            <Text>Humidity: {selectedBuilding.sensors.humidity}</Text>
          </VStack>
        </Box>
      )}
    </Container>
  );
};

export default Index;