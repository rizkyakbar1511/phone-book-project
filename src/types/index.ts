export type PhoneType = {
  number: string;
};

export type ContactType = {
  id?: number;
  first_name?: string;
  last_name?: string;
  created_at?: string;
  phones?: PhoneType[];
};

export type Contact = {
  id: number;
};
