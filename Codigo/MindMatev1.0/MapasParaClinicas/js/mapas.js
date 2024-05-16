function initMap() {
  // Defina a localização inicial do mapa
  const initialLocation = { lat: -23.5505, lng: -46.6333 };
  // Crie o mapa
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 14,
    center: initialLocation,
  });

  // Crie um infowindow para mostrar as informações da clínica
  const infowindow = new google.maps.InfoWindow();

  // Crie um objeto Autocomplete para a search box
  const autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("searchBox")
  );

  // Configure o Autocomplete para fornecer sugestões de endereços
  autocomplete.setFields(["address_components", "geometry"]);

  // Adicione um ouvinte de eventos para quando um lugar for selecionado no Autocomplete
  autocomplete.addListener("place_changed", () => {
    // Obtenha o lugar selecionado do Autocomplete
    const place = autocomplete.getPlace();
  });

  // Adicione um ouvinte de eventos para o formulário de pesquisa
  document.getElementById("searchBox").addEventListener("change", (event) => {
    // Obtenha o valor do campo de pesquisa
    const query = event.target.value;
    // Use o serviço de geocodificação para obter as coordenadas do endereço
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: query }, (results, status) => {
      if (status === "OK") {
        // Obtenha as coordenadas do resultado da geocodificação
        const location = results[0].geometry.location;
        // Remova o marcador anterior
        if (marker) {
          marker.setMap(null);
        }

        // Adicione um marcador para o local encontrado
        marker = new google.maps.Marker({
          position: location,
          map: map,
        });
        map.panTo(location);

        // Use o serviço de pesquisa de lugares para encontrar clínicas próximas
        const service = new google.maps.places.PlacesService(map);
        service.nearbySearch(
          {
            location: location,
            radius: 10000, // Raio de pesquisa em metros
            type: ["health", "doctor"], // Tipo de estabelecimento a ser procurado
            keyword: "clínica alzheimer", // Palavra-chave a ser procurada
          },
          (results, status) => {
            if (status === "OK") {
              // Adicione um marcador para cada clínica encontrada
              for (let i = 0; i < results.length; i++) {
                const place = results[i];
                const marker = new google.maps.Marker({
                  position: place.geometry.location,
                  map: map,
                  title: place.name,
                  // Adicione um ícone personalizado para o marcador
                  icon: {
                    url: "images/Idoso.png",
                    scaledSize: new google.maps.Size(30, 30),
                  },
                });

                // Adicione um ouvinte de eventos para o marcador
                marker.addListener("click", () => {
                  // Obtenha os detalhes do lugar clicado
                  const service = new google.maps.places.PlacesService(map);
                  service.getDetails(
                    {
                      placeId: place.place_id, // ID do lugar clicado
                      fields: ["name", "formatted_address", "formatted_phone_number", "rating"],
                    },
                    (result, status) => {
                      if (status === google.maps.places.PlacesServiceStatus.OK) {
                        // Crie uma string com as informações do lugar
                        const contentString =
                          "<h6>" +
                          result.name +
                          "</h6>" +
                          "<p>Endereço: " +
                          result.formatted_address +
                          "</p>" +
                          "<p>Telefone: " + (result.formatted_phone_number ? result.formatted_phone_number : "Não disponível") +
                          "</p>" +
                          "<p>Avaliação: " +
                          result.rating +
                          "</p>";
                
                        // Configure o infowindow com as informações do lugar
                        infowindow.setContent(contentString);
                        infowindow.open(map, marker);
                        
                        // Crie um botão de rotas para o lugar
                        const directionsButton = document.createElement("button");
                        directionsButton.innerText = "Obter Rotas";
                        directionsButton.addEventListener("click", () => {
                          window.open(
                            `https://www.google.com/maps/dir/?api=1&origin=${location.lat()},${location.lng()}&destination=${place.geometry.location.lat()},${place.geometry.location.lng()}`
                          );
                        });
                        
                        // Crie uma div para agrupar as informações do lugar e o botão de rotas
                        const contentDiv = document.createElement("div");
                        contentDiv.innerHTML =
                          "<h6>" +
                          result.name +
                          "</h6>" +
                          "<p>Endereço: " +
                          result.formatted_address +
                          "</p>" +
                          "<p>Telefone: " + (result.formatted_phone_number ? result.formatted_phone_number : "Não disponível") + "</p>" +
                          "<p>Avaliação: " +
                          (result.rating ? result.rating : "Sem Avaliação") +
                          "</p>";
                        contentDiv.appendChild(directionsButton);
                        infowindow.setContent(contentDiv);
                      }
                    }
                  );
                });
              }
            } else {
              console.log("Erro ao buscar clínicas: ", status);
            }
          }
        );
      } else {
        console.log("Erro ao geocodificar endereço: ", status);
      }
    });
  });
}

let marker = null;
window.initMap = initMap;

const WIP1 = document.getElementById('saveButton');
const WIP2 = document.getElementById('historyButton');

WIP1.addEventListener('click', function() {
  alert('Funcionalidade a ser implementada');
});

WIP2.addEventListener('click', function() {
  alert('Funcionalidade a ser implementada');
});
