export default [
  {
    label: 'Tesla Model 3',
    id: 'model_3',
    image: 'cars/model_3.jpg',
    items: [
      {
        id: 't3_range_plus',
        label: 'Tesla Model 3 Standard Range Plus',
        efficiency: 15.1,
        price: {
          czk: 1300200,
          eur: 39500
        },
        battery: 50,
        usableBattery: 47.5,
        url: 'https://ev-database.org/car/1177/Tesla-Model-3-Standard-Range-Plus'
      },
      {
        id: 't3_long_range',
        label: 'Tesla Model 3 Long Range Dual Motor',
        efficiency: 15.8,
        price: {
          czk: 1500200,
          eur: 48200
        },
        battery: 75,
        usableBattery: 72.5,
        url: 'https://ev-database.org/car/1138/Tesla-Model-3-Long-Range-Dual-Motor'
      },
      {
        id: 't3_long_range_performance',
        label: 'Tesla Model 3 Long Range Performance',
        efficiency: 16.3,
        price: {
          czk: 1700200,
          eur: 52900
        },
        battery: 75,
        usableBattery: 72.5,
        url: 'https://ev-database.org/car/1139/Tesla-Model-3-Long-Range-Performance'
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
        efficiency: 18.1,
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
          czk: 2271200,
          eur: 72600
        },
        battery: 100,
        usableBattery: 95,
        url: 'https://ev-database.org/car/1194/Tesla-Model-S-Long-Range'
      },
      {
        id: 'ts_performance',
        label: 'Tesla Model S Performance',
        category: 'model_s',
        efficiency: 18.6,
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
          czk: 2739200,
          eur: 85700
        },
        battery: 100,
        usableBattery: 95,
        url: 'https://ev-database.org/car/1207/Tesla-Model-S-Performance'
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
        label: 'Tesla Model X Long Range',
        category: 'model_x',
        efficiency: 20.7,
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
          czk: 2458200,
          eur: 77700
        },
        battery: 100,
        usableBattery: 95,
        url: 'https://ev-database.org/car/1198/Tesla-Model-X-Long-Range'
      },
      {
        id: 'tx_performance',
        label: 'Tesla Model X Performance',
        category: 'model_x',
        efficiency: 21.3,
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
          czk: 2926200,
          eur: 89600
        },
        battery: 100,
        usableBattery: 95,
        url: 'https://ev-database.org/car/1208/Tesla-Model-X-Performance'
      }
    ]
  },
  {
    label: 'škoda CITIGOe iV',
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
  },
  {
    label: 'Hyundai IONIQ Electric',
    id: 'ioniq',
    image: 'cars/ioniq.jpg',
    price: 899990,
    efficiency: 16.2,
    battery: 38.3,
    usableBattery: 38.3,
    url: 'https://ev-database.org/car/1190/Skoda-CITIGOe-iV'
  },
  {
    label: 'Hyundai  KONA Electric',
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
          czk: 999990,
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
          czk: 1149980,
          eur: 35690
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
          eur: 39490
        },
        efficiency: 17.3,
        battery: 67.1,
        usableBattery: 64,
        url: 'https://ev-database.org/car/1154/Kia-e-Soul-64-kWh',
        label: 'Kia e-Soul 150 kW'
      }
    ]
  }
]