export type ProfileData = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type ProfileUpdates = Partial<Omit<ProfileData, "userId" | "email">>;
