export interface ResponseManageListCompanyAccessUid {
    ldata: [ManageListCompanyAccessUid];
    status: number;
    message: string;
}

export interface ManageListCompanyAccessUid {
    id: number;
    code: string;
    description: string;
    parent: number;
    parentName: string;
    IsActive: boolean;
}

