
  
  export interface RegisterDTO {
    phone: string;
    password: string;
    name: string;
    surname: string;
    email:string;

  }
  
  export interface VerifyDTO {
    verificationCode: string;
  }
  
  export interface PhoneLoginDTO {
    phone: string;
    password: string;
  }

  export interface EmailLoginDTO{
    email:string;
    password:string;
  }

