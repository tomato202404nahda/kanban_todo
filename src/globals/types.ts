export type Card = {
  title: string;
  id: string;
  column: string;
};

export type User = {
  userId: string;
  name: string | null;
  profilePhoto: string | null;
  isAuth: boolean;
};
