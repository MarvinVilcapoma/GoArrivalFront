export interface CardRecord {
    IsRegister: boolean;
    ID: string;
    CompanyID: string;
    Number: string;
    ExpirationDate: string;
    HolderName: string | null | undefined;
    BrandCode: string;
    Code: string;
    Alias: string | null | undefined;
    User: string;
    IsActive: boolean;
}
