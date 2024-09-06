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


export interface TransformedMenu {
    menuID: number;
    isActive: boolean;
    label: string;
    data: string;
    children?: TransformedMenu[] | null;
}

export interface Approval {
    description: string | "";
    id: number;
    isActive: boolean;
    name: string | "";
}

export interface ServiceOnlyServiceMain {
    isMain: boolean;
    id: number;
    isActive: boolean;
    name: string | "";
}

export interface ResponseAdmin {
    ldata: any[] | [];
    odata: any | null;
    message: string;
    status: number;
}


export interface CompanyByAgency{
    approvalType: string | "";
    codeDK: string;
    email: string | "";
    id: string;
    isActive: boolean;
    name: string | "";
    phone: string | "";
    ruc: string;
    typeCompany: string;
}

export interface GroupByAgency{
    id: number;
    isActive: boolean;
    name: string | "";
}


export interface Country {
    iataCode: string | "";
    language: string | "";
    name: string;
    phonePrefix: string | "";
}

export interface Document {
    code: string | "";
    id: string | "";
    isActive: boolean;
    name: string | "";
}

export interface CostCenterByCompany {
    budget: number;
    code: string | "";
    isActive: boolean;
    description: string | "";
    id: number;
}

export interface DropDownPrimeNG {
    code: any | "";
    name: any | "";
}

export interface TablePrimeNG {
    field: string;
    header: string;
}

export interface GetCompanyDetailRS {
    address: string | "";
    agencyID: string;
    approvalTypeID: number;
    codeDK: string;
    countryOrigin: string | "";
    email: string | "";
    groupID: number;
    id: string | "";
    isActive: boolean;
    name: string | "";
    phone: string | "";
    ruc: string;
    typeCompanyID: string | "";
}

export interface ManageCompanyRQ{
    Address: string | "";
    ApprovalTypeID: number;
    CountryOrigin: string | "";
    DK: string;
    ID: string | "";
    IsActive: boolean;
    IsRegister: boolean;
    Name: string | "";
    Ruc: string | "";
    TypeCompanyID: string | "";
    Oagency: any | null;
    OcontactInfo: any | null;
}

export interface UpdateAgencyRQ{
    ID: string | "";
    Name: string | "";
    Ruc: string | "";
    CountryOrigin: string | "";
    Address: string | "";
    OcontactInfo: any | null;
    IsActive: boolean;
}

export interface UpdateAgencyRS{
    id: string | "";
    address: string | "";
    countryOrigin: string | "";
    email: string | "";
    isActive: boolean;
    name: string | "";
    phone: string | "";
    ruc: string | "";
}

export interface ApprovalSettingDetailRS{
    bossID: string | "";
    canIssue: boolean;
    costCenterID: number;
    finalRange: number;
    hasException: boolean;
    id: string | "";
    initialRange: number;
    isActive: boolean;
    isApprovalRange: boolean;
    isInfractionRange: boolean;
    isInternational: boolean;
    isNational: boolean;
    isReservation: boolean;
    priority: number;
    serviceID: number;
    userID: string | "" | null;
}

export interface EnterprisePersonRQ {
    EnterpriseCode: string | "";
    IsAgency: boolean;
    IsAdministrator: boolean;
}

export interface EnterpriseNotificationRQ{
    EnterpriseCode: string | "";
    IsAgency: boolean;
    IsAdministrator: boolean;
}

export interface EnterprisePerson{
    email: string | "";
    id: number;
    fullName: string | "";
    isActive: boolean;
    isVIP: boolean;
    lastName: string | "";
    lpersonDocument: any[] | [];
    name: string | "";
    orole: any | null;
    personID: string;
    phone: string | "";
    profileGds: string | "";
    userID: string;
}

export interface ManageApprovalSettingRQ {
    ApprovalTypeID: number;
    BossID: string | "";
    CanIssue: boolean;
    CompanyID: string | "";
    CostCenterID: number;
    FinalRange: number;
    HasApprovalRange: boolean;
    HasException: boolean;
    HasInfractionRange: boolean;
    ID: string | "";
    InitialRange: number;
    IsActive: boolean;
    IsInternational: boolean;
    IsNational: boolean;
    IsRegister: boolean;
    IsReservation: boolean;
    Priority: number;
    ServiceID: number;
    UserID: string;
}