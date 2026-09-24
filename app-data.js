"use strict";

window.VITRO_DATA = {
  // Indica qué edificio muestra esta publicación. Debe coincidir con un id de buildings.
  defaultBuildingId: "test-building",

  // Categorías visibles. Conservá los id actuales y sus referencias de icono.
  categories: [
    {
      id: "gas",
      name: "GAS",
      title: "Emergencia de Gas",
      description: "Consultá los proveedores disponibles para este tipo de emergencia.",
      icon: "flame",
      providerMode: "available"
    },
    {
      id: "water",
      name: "AGUA",
      title: "Emergencia de Agua",
      description: "Consultá los proveedores disponibles para este tipo de emergencia.",
      icon: "drop",
      providerMode: "available"
    },
    {
      id: "electricity",
      name: "ELECTRICIDAD",
      title: "Emergencia de Electricidad",
      description: "Consultá los proveedores disponibles para este tipo de emergencia.",
      icon: "bolt",
      providerMode: "available"
    },
    {
      id: "elevators",
      name: "ASCENSORES",
      title: "Emergencia de Ascensores",
      description: "Proveedor asignado al edificio seleccionado.",
      icon: "elevator",
      providerMode: "assigned"
    }
  ],

  // Cargá, modificá o eliminá aquí los edificios reales.
  buildings: [
    {
      id: "test-building",
      name: "EDIFICIO DE PRUEBA",
      address: "Dirección de prueba"
    }
  ],

  // Cargá aquí los proveedores. categoryIds y buildingIds relacionan registros por id.
  // buildingIds: [] hace que el proveedor esté disponible para todos los edificios.
  providers: [
    {
      id: "test-provider-1",
      name: "Proveedor de prueba 1",
      categoryIds: ["gas", "water", "electricity"],
      phone: "11 0000-0000",
      buildingIds: []
    },
    {
      id: "test-provider-2",
      name: "Proveedor de prueba 2",
      categoryIds: ["gas", "water", "electricity"],
      phone: "11 1111-1111",
      buildingIds: []
    },
    {
      id: "test-elevator-provider",
      name: "Proveedor de prueba",
      categoryIds: ["elevators"],
      phone: "11 0000-0000",
      buildingIds: ["test-building"]
    }
  ]
};