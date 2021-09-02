export interface IGeolocationInterfaceResponse {
    meta: {
        issue_date: string;
        code: number;
        api_version: string;
    };
    result: {
        items: {
            full_address_name: string;
        };
    };
}
