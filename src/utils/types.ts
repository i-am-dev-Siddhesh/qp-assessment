export type IAdmin = {
  id: number;
  username: string;
  password: string;
  email: string;
  fullName: string;
};

export type IBookedItem = {
  id: number;
  quantity: number;
  bookedBy: number;
  groceryItemId: number;
};

export type IGroceryItem = {
  id: number;
  name: string;
  price: number;
  inventory: number;
  addedBy: number;
};

export type IUser = {
  id: number;
  username: string;
  password: string;
  email: string;
  fullName: string;
};
