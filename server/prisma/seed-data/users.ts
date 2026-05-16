export type SeedClient = {
  fullName: string;
  email: string;
  phone: string;
  deliveryAddress: string;
};

export const ADMIN_SEED = {
  fullName: "BuildRent Admin",
  email: "admin@buildrent.local",
  password: "Admin12345!",
};

export const CLIENT_PASSWORD = "Client12345!";

export const CLIENT_SEEDS: SeedClient[] = [
  {
    fullName: "Ivan Petrov",
    email: "ivan.petrov@buildrent.local",
    phone: "+375291110101",
    deliveryAddress: "Minsk, Pobediteley Ave. 101, site gate A",
  },
  {
    fullName: "Pavel Sidorov",
    email: "pavel.sidorov@buildrent.local",
    phone: "+375291110102",
    deliveryAddress: "Minsk, Pritytskogo St. 48, warehouse yard",
  },
  {
    fullName: "Andrei Kozlov",
    email: "andrei.kozlov@buildrent.local",
    phone: "+375291110103",
    deliveryAddress: "Minsk, Timiryazeva St. 72, logistics entrance",
  },
  {
    fullName: "Maksim Morozov",
    email: "maksim.morozov@buildrent.local",
    phone: "+375291110104",
    deliveryAddress: "Brest, Moskovskaya St. 212, building plot 4",
  },
  {
    fullName: "Sergei Volkov",
    email: "sergei.volkov@buildrent.local",
    phone: "+375291110105",
    deliveryAddress: "Grodno, Dzerzhinskogo St. 39, private project office",
  },
  {
    fullName: "Nikita Fedorov",
    email: "nikita.fedorov@buildrent.local",
    phone: "+375291110106",
    deliveryAddress: "Gomel, Sovetskaya St. 118, rear loading dock",
  },
  {
    fullName: "Kirill Smirnov",
    email: "kirill.smirnov@buildrent.local",
    phone: "+375291110107",
    deliveryAddress: "Mogilev, Pervomayskaya St. 64, renovation site 2",
  },
  {
    fullName: "Artem Vasilev",
    email: "artem.vasilev@buildrent.local",
    phone: "+375291110108",
    deliveryAddress: "Vitebsk, Lenina St. 26, municipal repair base",
  },
  {
    fullName: "Roman Egorov",
    email: "roman.egorov@buildrent.local",
    phone: "+375291110109",
    deliveryAddress: "Minsk Region, Kolodishchi, Industrial Ln. 8",
  },
  {
    fullName: "Denis Zaitsev",
    email: "denis.zaitsev@buildrent.local",
    phone: "+375291110110",
    deliveryAddress: "Minsk, Aerodromnaya St. 13, tower crane zone",
  },
  {
    fullName: "Alexey Orlov",
    email: "alexey.orlov@buildrent.local",
    phone: "+375291110111",
    deliveryAddress: "Minsk, Kropotkina St. 92, office renovation floor 1",
  },
  {
    fullName: "Mikhail Nikitin",
    email: "mikhail.nikitin@buildrent.local",
    phone: "+375291110112",
    deliveryAddress: "Minsk, Kuprevicha St. 1, tech park service lane",
  },
];
