export default [
  {
    label: 'Skoda Enyaq iV',
    id: 'enyaq',
    image: 'cars/enyaq.jpg',
    items: [
      {
        label: 'Skoda Enyaq iV 60',
        id: 'enyaq-60',
        price: {
          czk: 1059900,
          eur: 38850
        },
        efficiency: 18.1,
        battery: 62,
        usableBattery: 58,
        url: 'https://ev-database.org/car/1279/Skoda-Enyaq-iV-60'
      },
      {
        label: 'Skoda Enyaq iV 80',
        id: 'enyaq-80',
        price: {
          czk: 1189900,
          eur: 43950
        },
        efficiency: 18.3,
        battery: 82,
        usableBattery: 77,
        url: 'https://ev-database.org/car/1280/Skoda-Enyaq-iV-80'
      }
    ]
  },
  {
    label: 'Volkswagen ID.3',
    id: 'id3',
    image: 'cars/id3.jpg',
    items: [
      {
        id: 'volkswagen-id3-life',
        price: {
          czk: 976900,
          eur: 37610
        },
        efficiency: 16.6,
        battery: 62,
        usableBattery: 58,
        url: 'https://ev-database.org/car/1300/Volkswagen-ID3-1st',
        label: 'Volkswagen ID.3 Life'
      },
      {
        id: 'volkswagen-id3-style',
        price: {
          czk: 1097900,
          eur: 40740
        },
        efficiency: 16.6,
        battery: 62,
        usableBattery: 58,
        url: 'https://ev-database.org/car/1300/Volkswagen-ID3-1st',
        label: 'Volkswagen ID.3 Style'
      },
      {
        id: 'volkswagen-id3-business',
        price: {
          czk: 1068900,
          eur: 41080
        },
        efficiency: 16.6,
        battery: 62,
        usableBattery: 58,
        url: 'https://ev-database.org/car/1300/Volkswagen-ID3-1st',
        label: 'Volkswagen ID.3 Business'
      },
      {
        id: 'volkswagen-id3-family',
        price: {
          czk: 1095900,
          eur: 42090
        },
        efficiency: 16.6,
        battery: 62,
        usableBattery: 58,
        url: 'https://ev-database.org/car/1300/Volkswagen-ID3-1st',
        label: 'Volkswagen ID.3 Family'
      },
      {
        id: 'volkswagen-id3-tech',
        price: {
          czk: 1177900,
          eur: 43760
        },
        efficiency: 16.6,
        battery: 62,
        usableBattery: 58,
        url: 'https://ev-database.org/car/1300/Volkswagen-ID3-1st',
        label: 'Volkswagen ID.3 Tech'
      },
      {
        id: 'volkswagen-id3-max',
        price: {
          czk: 1235900,
          eur: 45980
        },
        efficiency: 16.6,
        battery: 62,
        usableBattery: 58,
        url: 'https://ev-database.org/car/1300/Volkswagen-ID3-1st',
        label: 'Volkswagen ID.3 Max'
      },
      {
        id: 'volkswagen-id3-tour',
        price: {
          czk: 1231900,
          eur: 47060
        },
        efficiency: 17.1,
        battery: 82,
        usableBattery: 77,
        url: 'https://ev-database.org/car/1203/Volkswagen-ID3-Pro-S',
        label: 'Volkswagen ID.3 Tour'
      }
    ]
  },
  {
    label: 'Volkswagen ID.4',
    id: 'id4',
    image: 'cars/id4.jpg',
    price: {
      czk: 1167900,
      eur: 45660
    },
    url: 'https://ev-database.org/car/1273/Volkswagen-ID4-1st',
    efficiency: 19.3,
    battery: 77,
    usableBattery: 82
  },
  {
    label: 'Tesla Model 3',
    id: 'model_3',
    image: 'cars/model_3.jpg',
    items: [
      {
        id: 't3_range_plus',
        label: 'Tesla Model 3 Standard Range Plus',
        efficiency: 15.2,
        price: {
          czk: 1324900,
          eur: 39500
        },
        battery: 55,
        usableBattery: 50,
        url: 'https://ev-database.org/car/1320/Tesla-Model-3-Standard-Range-Plus'
      },
      {
        id: 't3_long_range',
        label: 'Tesla Model 3 Long Range Dual Motor',
        efficiency: 15.6,
        price: {
          czk: 1486990,
          eur: 48200
        },
        battery: 78,
        usableBattery: 73.5,
        url: 'https://ev-database.org/car/1321/Tesla-Model-3-Long-Range-Dual-Motor'
      },
      {
        id: 't3_long_range_performance',
        label: 'Tesla Model 3 Long Range Performance',
        efficiency: 16.2,
        price: {
          czk: 1700200,
          eur: 52900
        },
        battery: 78,
        usableBattery: 73.5,
        url: 'https://ev-database.org/car/1322/Tesla-Model-3-Long-Range-Performance'
      }
    ]
  },
  {
    label: 'Tesla Model S',
    id: 'model_s',
    image: 'cars/model_s.jpg',
    items: [
      {
        id: 'ts_long_range',
        label: 'Tesla Model S Long range',
        category: 'model_s',
        efficiency: 17.6,
        range: {
          cold: {
            city: 505,
            highway: 380,
            combined: 440
          },
          mild: {
            city: 750,
            highway: 490,
            combined: 600
          },
          average: 525
        },
        price: {
          czk: 2318990,
          eur: 72600
        },
        battery: 100,
        usableBattery: 95,
        url: 'https://ev-database.org/car/1323/Tesla-Model-S-Long-Range-Plus'
      },
      {
        id: 'ts_performance',
        label: 'Tesla Model S Performance',
        category: 'model_s',
        efficiency: 18.1,
        range: {
          cold: {
            city: 495,
            highway: 370,
            combined: 430
          },
          mild: {
            city: 730,
            highway: 475,
            combined: 585
          },
          average: 510
        },
        price: {
          czk: 2786990,
          eur: 85700
        },
        battery: 100,
        usableBattery: 95,
        url: 'https://ev-database.org/car/1324/Tesla-Model-S-Performance'
      }
    ]
  },
  {
    label: 'Tesla Model X',
    id: 'model_x',
    image: 'cars/model_x.jpg',
    items: [
      {
        id: 'tx_long_range',
        label: 'Tesla Model X Long Range Plus',
        category: 'model_x',
        efficiency: 20.2,
        range: {
          cold: {
            city: 455,
            highway: 330,
            combined: 390
          },
          mild: {
            city: 655,
            highway: 420,
            combined: 520
          },
          average: 460
        },
        price: {
          czk: 2589990,
          eur: 77700
        },
        battery: 100,
        usableBattery: 95,
        url: 'https://ev-database.org/car/1325/Tesla-Model-X-Long-Range-Plus'
      },
      {
        id: 'tx_performance',
        label: 'Tesla Model X Performance',
        category: 'model_x',
        efficiency: 21.1,
        range: {
          cold: {
            city: 445,
            highway: 320,
            combined: 380
          },
          mild: {
            city: 640,
            highway: 405,
            combined: 505
          },
          average: 445
        },
        price: {
          czk: 3057990,
          eur: 89600
        },
        battery: 100,
        usableBattery: 95,
        url: 'https://ev-database.org/car/1326/Tesla-Model-X-Performance'
      }
    ]
  },
  {
    label: 'Hyundai IONIQ Electric',
    id: 'ioniq',
    image: 'cars/ioniq.jpg',
    price: {
      czk: 949990,
      eur: 35990
    },
    url: 'https://ev-database.org/car/1165/Hyundai-IONIQ-Electric',
    efficiency: 15.3,
    battery: 38.3,
    usableBattery: 40.4
  },
  {
    label: 'Hyundai KONA Electric',
    id: 'kona',
    image: 'cars/kona.jpg',
    items: [
      {
        id: 'kona-100',
        price: {
          czk: 799990,
          eur: 35890
        },
        battery: 42,
        usableBattery: 39.2,
        efficiency: 15.4,
        url: 'https://ev-database.org/car/1204/Hyundai-Kona-Electric-64-kWh',
        label: 'Hyundai Kona EV 100 kW'
      },
      {
        id: 'kona-150',
        price: {
          czk: 949990,
          eur: 39890
        },
        efficiency: 15.8,
        battery: 67.1,
        usableBattery: 64,
        url: 'https://ev-database.org/car/1204/Hyundai-Kona-Electric-39-kWh',
        label: 'Hyundai Kona EV 150 kW'
      }
    ]
  },
  {
    label: 'BMW i3',
    id: 'i3',
    image: 'cars/i3.jpg',
    items: [
      {
        id: 'i3',
        price: {
          czk: 1049100,
          eur: 39700
        },
        efficiency: 16.1,
        battery: 42.2,
        usableBattery: 37.9,
        url: 'https://ev-database.org/car/1145/BMW-i3-120-Ah',
        label: 'BMW i3'
      },
      {
        id: 'i3s',
        price: {
          czk: 1149200,
          eur: 43350
        },
        efficiency: 16.5,
        battery: 42.2,
        usableBattery: 37.9,
        url: 'https://ev-database.org/car/1149/BMW-i3s-120-Ah',
        label: 'BMW i3s'
      }
    ]
  },
  {
    label: 'Audi e-tron',
    id: 'e-tron',
    image: 'cars/e-tron.jpg',
    items: [
      {
        id: 'e-tron-50',
        price: {
          czk: 1871900,
          eur: 70500
        },
        efficiency: 22.7,
        battery: 71,
        usableBattery: 64.7,
        url: 'https://ev-database.org/car/1209/Audi-e-tron-50-quattro',
        label: 'Audi e-tron 50 quattro'
      },
      {
        id: 'e-tron-55',
        price: {
          czk: 2122900,
          eur: 82500
        },
        efficiency: 23.4,
        battery: 95,
        usableBattery: 86.5,
        url: 'https://ev-database.org/car/1253/Audi-e-tron-55-quattro',
        label: 'Audi e-tron 55 quattro'
      },
      {
        id: 'e-tron-50-q',
        price: {
          czk: 1936900
        },
        efficiency: 22.3,
        battery: 71,
        usableBattery: 64.7,
        url: 'https://ev-database.org/car/1247/Audi-e-tron-Sportback-50-quattro',
        label: 'Audi e-tron Sportback 50 quattro'
      },
      {
        id: 'e-tron-55-q',
        price: {
          czk: 2187900
        },
        efficiency: 22.5,
        battery: 95,
        usableBattery: 86.5,
        url: 'https://ev-database.org/car/1107/Audi-e-tron-Sportback-55-quattro',
        label: 'Audi e-tron Sportback 55 quattro'
      }
    ]
  },
  {
    label: 'DS 3 Crossback E-Tense',
    id: 'ds3',
    image: 'cars/ds3.jpg',
    price: {
      czk: 995000,
      eur: 34990
    },
    url: 'https://ev-database.org/car/1148/DS-3-Crossback-E-Tense',
    efficiency: 18,
    battery: 45,
    usableBattery: 50
  },
  {
    label: 'Nissan LEAF e ',
    id: 'leaf-e',
    image: 'cars/leaf.jpg',
    items: [
      {
        id: 'leaf',
        price: {
          czk: 950000,
          eur: 35630
        },
        efficiency: 16.4,
        battery: 40,
        usableBattery: 36,
        url: 'https://ev-database.org/car/1106/Nissan-Leaf',
        label: 'Nissan Leaf'
      },
      {
        id: 'leaf+',
        price: {
          czk: 1162000,
          eur: 43930
        },
        efficiency: 17,
        battery: 62,
        usableBattery: 56,
        url: 'https://ev-database.org/car/1144/Nissan-Leaf-eplus',
        label: 'Nissan Leaf e+'
      }
    ]
  },
  {
    label: 'Renault ZOE',
    id: 'zoe',
    image: 'cars/zoe.jpg',
    items: [
      {
        id: 'zoe-110',
        price: {
          czk: 835000,
          eur: 31900
        },
        efficiency: 16.3,
        battery: 55,
        usableBattery: 52,
        url: 'https://ev-database.org/car/1164/Renault-Zoe-ZE50-R110',
        label: 'Renault ZOE R110'
      },
      {
        id: 'zoe-135',
        price: {
          czk: 900000,
          eur: 34500
        },
        efficiency: 16.5,
        battery: 55,
        usableBattery: 52,
        url: 'https://ev-database.org/car/1205/Renault-Zoe-ZE50-R135',
        label: 'Renault ZOE R135'
      }
    ]
  },
  {
    label: 'Volkswagen e-Golf',
    id: 'egolf',
    image: 'cars/egolf.jpg',
    price: {
      czk: 882900,
      eur: 27990
    },
    url: 'https://ev-database.org/car/1087/Volkswagen-e-Golf',
    efficiency: 16.8,
    battery: 35.8,
    usableBattery: 32
  },
  {
    label: 'Kia e-Soul',
    id: 'esoul',
    image: 'cars/esoul.jpg',
    items: [
      {
        id: 'e-soul-100',
        price: {
          czk: 1099980,
          eur: 34490
        },
        efficiency: 17,
        battery: 42,
        usableBattery: 39.2,
        url: 'https://ev-database.org/car/1169/Kia-e-Soul-39-kWhh',
        label: 'Kia e-Soul 100 kW'
      },
      {
        id: 'e-soul-150',
        price: {
          czk: 1199980,
          eur: 38290
        },
        efficiency: 17.5,
        battery: 67.1,
        usableBattery: 64,
        url: 'https://ev-database.org/car/1288/Kia-e-Soul-64-kWh',
        label: 'Kia e-Soul 150 kW'
      }
    ]
  },
  {
    label: 'Kia e-Niro',
    id: 'eniro',
    image: 'cars/eniro.jpg',
    items: [
      {
        id: 'e-niro-100',
        price: {
          czk: 1099980,
          eur: 35290
        },
        efficiency: 14.7,
        battery: 42,
        usableBattery: 39.2,
        url: 'https://ev-database.org/car/1339/Kia-e-Niro-39-kWh',
        label: 'Kia e-Niro 100 kW'
      },
      {
        id: 'e-niro-150',
        price: {
          czk: 1199980,
          eur: 39790
        },
        efficiency: 17.3,
        battery: 67.1,
        usableBattery: 64,
        url: 'https://ev-database.org/car/1338/Kia-e-Niro-64-kWh',
        label: 'Kia e-Niro 150 kW'
      }
    ]
  },
  {
    label: 'Honda e',
    id: 'honda-e',
    image: 'cars/honda-e.jpg',
    price: {
      czk: 899900,
      eur: 34990
    },
    efficiency: 16.8,
    battery: 35.5,
    usableBattery: 28.5,
    url: 'https://ev-database.org/car/1171/Honda-e'
  },
  {
    label: 'Peugeot e-208',
    id: 'peugeot e208',
    image: 'cars/e-208.jpg',
    price: {
      czk: 820000,
      eur: 28990
    },
    efficiency: 16.4,
    battery: 50.0,
    usableBattery: 45.0,
    url: 'https://ev-database.org/car/1168/Peugeot-e-208'
  },
  {
    label: 'Peugeot e-2008',
    id: 'peugeot e2008',
    image: 'cars/e-2008.jpg',
    price: {
      czk: 935000,
      eur: 34556
    },
    efficiency: 18,
    battery: 50.0,
    usableBattery: 45.0,
    url: 'https://ev-database.org/car/1206/Peugeot-e-2008-SUV'
  },
  {
    label: 'Opel Corsa-e',
    id: 'opel-corsa-e',
    image: 'cars/corsa.jpg',
    price: {
      czk: 759990,
      eur: 28490
    },
    efficiency: 16.4,
    battery: 50.0,
    usableBattery: 45.0,
    url: 'https://ev-database.org/car/1192/Opel-Corsa-e'
  },
  {
    label: 'Škoda CITIGOe iV',
    id: 'citigo',
    image: 'cars/citigoe.jpg',
    efficiency: 16.2,
    range: {
      cold: {
        city: 200,
        highway: 140,
        combined: 170
      },
      mild: {
        city: 310,
        highway: 180,
        combined: 230
      },
      average: 200
    },
    price: {
      czk: 499900,
      eur: 19900
    },
    battery: 36.8,
    usableBattery: 32.3,
    url: 'https://ev-database.org/car/1190/Skoda-CITIGOe-iV'
  }
]
