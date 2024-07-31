export interface UpdatePersonRQ {
    ID: string | null;
    UserID: string | null;
    Name: string | null;
    LastName: string | null;
    CorporatePhone: string | null;
    PersonalPhone: string | null | undefined;
    CorporateEmail: string | null;
    PersonalEmail: string | null | undefined;
    BirthDate: string | null;
    Gender: string | null;
    IsVacational: boolean;
}


export interface SubMenu {
    id: number;
    name: string;
    url: string;
    type: number;
    mainMenu: number | null;
    isActive: boolean;
    lsubMenu: SubMenu[] | null;
}

export interface TransformedMenu {
    menuID: number;
    isActive: boolean;
    label: string;
    data: string;
    children?: TransformedMenu[] | null;
}