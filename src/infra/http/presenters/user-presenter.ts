interface User {
  id: string;
  email: string;
  name: string;
  role: "seller" | "buyer";
}

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }
}
