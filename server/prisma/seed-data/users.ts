export type SeedClient = {
  fullName: string;
  email: string;
  phone: string;
  deliveryAddress: string;
};

export const ADMIN_SEED = {
  fullName: "Администратор BuildRent",
  email: "admin@buildrent.local",
  password: "Admin12345!",
};

export const CLIENT_PASSWORD = "Client12345!";

export const CLIENT_SEEDS: SeedClient[] = [
  {
    fullName: "Иван Петров",
    email: "ivan.petrov@buildrent.local",
    phone: "+375291110101",
    deliveryAddress: "Минск, проспект Победителей, 101, ворота участка А",
  },
  {
    fullName: "Павел Сидоров",
    email: "pavel.sidorov@buildrent.local",
    phone: "+375291110102",
    deliveryAddress: "Минск, улица Притыцкого, 48, складской двор",
  },
  {
    fullName: "Андрей Козлов",
    email: "andrei.kozlov@buildrent.local",
    phone: "+375291110103",
    deliveryAddress: "Минск, улица Тимирязева, 72, логистический въезд",
  },
  {
    fullName: "Максим Морозов",
    email: "maksim.morozov@buildrent.local",
    phone: "+375291110104",
    deliveryAddress: "Брест, улица Московская, 212, площадка 4",
  },
  {
    fullName: "Сергей Волков",
    email: "sergei.volkov@buildrent.local",
    phone: "+375291110105",
    deliveryAddress: "Гродно, улица Дзержинского, 39, офис частного объекта",
  },
  {
    fullName: "Никита Федоров",
    email: "nikita.fedorov@buildrent.local",
    phone: "+375291110106",
    deliveryAddress: "Гомель, улица Советская, 118, задний подъезд для разгрузки",
  },
  {
    fullName: "Кирилл Смирнов",
    email: "kirill.smirnov@buildrent.local",
    phone: "+375291110107",
    deliveryAddress: "Могилёв, улица Первомайская, 64, участок реконструкции 2",
  },
  {
    fullName: "Артём Васильев",
    email: "artem.vasilev@buildrent.local",
    phone: "+375291110108",
    deliveryAddress: "Витебск, улица Ленина, 26, муниципальная ремонтная база",
  },
  {
    fullName: "Роман Егоров",
    email: "roman.egorov@buildrent.local",
    phone: "+375291110109",
    deliveryAddress: "Минская область, Колодищи, Индустриальный переулок, 8",
  },
  {
    fullName: "Денис Зайцев",
    email: "denis.zaitsev@buildrent.local",
    phone: "+375291110110",
    deliveryAddress: "Минск, улица Аэродромная, 13, зона башенного крана",
  },
  {
    fullName: "Алексей Орлов",
    email: "alexey.orlov@buildrent.local",
    phone: "+375291110111",
    deliveryAddress: "Минск, улица Кропоткина, 92, ремонт офиса, 1 этаж",
  },
  {
    fullName: "Михаил Никитин",
    email: "mikhail.nikitin@buildrent.local",
    phone: "+375291110112",
    deliveryAddress: "Минск, улица Купревича, 1, сервисный проезд технопарка",
  },
];
