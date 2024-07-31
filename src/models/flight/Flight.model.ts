import { Passenger } from "./passenger.model";

export interface Recommendation {
    gds: string;
    id: number;
    isClassKSky: boolean;
    isFlightNational: boolean;
    isVisible: boolean;
    lpolicy: any | null;
    lpseudo: any | null;
    lsection: Section[] | [];
    ocarrier: any | null;
    offerID: string;
    ooffer: any | null;
    openalties: any | null;
    oprice: Price;
    pseudo: string;
    pseudoCountry:string;
    redisID: string | "";
}

export interface Price {
    baseAmount: Number;
    currency: string;
  
    lpassengerPrice: any[] | [];
    oconvertionPrice: any | null;
    ocorporateDiscount: any | null;
    opriceDifference: any | null;
    totalAmount: number;
    totalAmountWithCharges: number;
    totalCharges: number;
    totalTax: number;
    totalTaxWithCharges: number;
}


export interface Section {
    arrivalDate: string;
    arrivalDateShow: string;
    departureDate: string;
    departureDateShow: string;
    id: number;
    isVisible: boolean;
    lschedule: Schedule[] | [];
    odestination: Destination;
    offerID: string | "";
    oorigin: Origin;
    oschedule: Schedule;
}

export interface Section {
    arrivalDate: string;
    arrivalDateShow: string;
    departureDate: string;
    departureDateShow: string;
    id: number;
    isVisible: boolean;
    lschedule: Schedule[] | [];
    odestination: Destination;
    offerID: string | "";
    oorigin: Origin;
    oschedule: Schedule;
}

export interface Schedule {
    arrivalDate: string;
    arrivalDateShow: string;
    dateVariation: number;
    departureDate: string;
    departureDateShow: string;
    duration: string;
    durationShow: string;
    id: number;
    isVisible: boolean;
    lsegment: Segment[] | [];
    obaggage: Baggage;
    selected: boolean;
    ocarrier: Carrier;
}

export interface Segment {
    arrivalDate: string;
    arrivalDateShow: string;
    arrivalTimeShow: string;
    availableSeats: number;
    cabinDescription: string;
    cabinID: string;
    classID: string;
    corporateCodeApplies: boolean;
    dateVariation: number;
    departureDate: string;
    departureDateShow: string;
    departureTimeShow: string;
    duration: string;
    durationShow: string;
    familyName: string | "";
    fareBasis: string;
    fareType: string;
    flightNumber: string;
    id: number;
    isVisible: boolean;
    obaggage: Baggage;
    ocarrier: Carrier;
    odestination: Destination;
    oorigin: Origin;
    timeWaitAirport: any | null;
    timeWaitAirportShow: string | "";
    typePlane: string;
}

export interface Baggage {
    description: string[];
    hasBagagge: boolean;
    hasCarryOn: boolean;
    quantity: number;
}

export interface Carrier {
    marketingCode: string;
    marketingName: string;
    operatingCode: string;
    operatingName: string;
}

export interface Destination {
    airportName: string;
    cityName: string;
    countryCode: string;
    iataCode: string;
}

export interface Origin {
    airportName: string;
    cityName: string;
    countryCode: string;
    iataCode: string;
}

export interface Search {
    message: string;
    odata: DataFlight;
    status: number;
}

export interface DataFlight {
    lcalendar: any[] | [];
    llowCostAirline: any[] | [];
    lpseudoPrice: any[] | [];
    lrecommendation: Recommendation[] | [];
}

export interface Calendar {
    arrivalDate: string;
    centralDate: boolean;
    code: string;
    corporateCodeApplies: boolean;
    departureDate: string;
    fareType: string;
    flightCheap: boolean;
    horizontalDate: string;
    ocarrier: any | null;
    oprice: any | null;
    verticalDate: string;
}

export interface LowCostAirline {
    currency: string;
    ocarrier: any | null;
    recommendationID: number;
    totalAmount: number;
}

export interface PseudoPrice{ 
    countryName: string;
    oprice: any | null;
    pseudo: string;
    pseudoCountry: string;
}

export interface Oenterprise{ 
    isAgency: boolean;
    id: string;
    codeDK: string;
    name: string;
    type: string;
}

export interface GetBrandedFaresRQ {
    GDS: string;
    Pseudo: string;
    RedisID: string;
    RedisToken: string;
    TypeSearch: string;
    IsFlightNational: boolean;
    Lpassenger: any[];
    Lsection: Section[];
    Oenterprise: any | null;
}

export interface ValidateReservationRQ {
    Gds: string;
    Pseudo: string;
    TypeSearch: string;
    TypeFlight: string;
    IsFlightNational: boolean;
    Lsection: Section[] | [];
    Ouser: {
        UserID: string | "",
        PersonID: string | "",
        Name: string | "",
        LastName: string | "",
        Email: string | ""
    },
    Oprice: {
        Currency: string;
        TotalAmount: number;
    } | null;
    Lpassenger: any[];
    Oconfiguration: {
        DisablePurchase: boolean;
        ExtraReason: boolean;
        UseAirplus: boolean;
        UseRVA: boolean;
        UseCredit: boolean;
        CopyApprovers: boolean;
        UpdateApprovers: boolean;
        BudgetByCostCenter: boolean;
        ConsolidatePayment: boolean;
        CopyTicket: string[] | [];
    },
    Oenterprise: Oenterprise
}

export interface GenerateReservationRQ{
    IsConsolidatedPayment: boolean;
    CanEmission: boolean;
    Ouser: any | null;
    ExtraProfile: string | "";
    ExtraReason: string | "";
    IsFlightNational: boolean;
    Gds: string;
    Lapprover: any[] | null | [];
    Lpassenger: any[] | null | [];
    Lpolicy: any[] | null | [];
    Lsection: Section[] | null | [];
    FormOfPayment: string | "";
    Ocontact: any | null;
    Oconfiguration: any | null;
    Oancillaries: any | null;
    CarrierCode: string;
    AlternativeFareBasis: boolean;
    Oenterprise: Oenterprise;
    Odocumentation: any | null;
    ooffer: any | null;
    OfferID: string | "";
    Oprice: any | null;
    Pseudo: string | "";
    ReasonFlightID: number | null;
    TypeFlight: string;
    TypeSearch: string;
    UserID: string | "";
    osession: any | null;
}