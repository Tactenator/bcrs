export interface UserModel {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
    phoneNumber?: string;
    address: string;
    isDisabled: boolean;
    userId: string;
    role: string;
    selectedSecurityQuestions?: [];
    invoice?: [];
  }