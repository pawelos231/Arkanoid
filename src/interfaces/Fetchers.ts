type RegisterType = {
  imie: string;
  nick: string;
  haslo: string;
};
type LoginType = Omit<RegisterType, "imie">;

export type Register<T extends boolean> = T extends true
  ? Readonly<RegisterType>
  : RegisterType;

export type Login<T extends boolean> = T extends true
  ? Readonly<LoginType>
  : LoginType;

export interface responseData {
  message: string;
  status: number;
}
