export interface IGeolocationInterfaceResponse {
    display_name: string;
    address: {
        city: string;
        country: string;
        contry_code: string;
    };
}

export interface IIpLocationInterfaceResponse {
    city: string;
    latitude: string;
    longitude: string;
}
