import { Debt, DebtSearchRequestBody } from "../shared/types";
import ApiClient from "./ApiClient";

export const getTopDebts = (): Promise<Debt[]> => {
    return ApiClient.get<Debt[]>('/GetTopDebts').then(res => res.data);
}

export const getFilteredDebts = (search: string): Promise<Debt[]> => {
    const reqBody = prepareSearchRequestBody(search);
    return ApiClient.post<Debt[]>('/GetFilteredDebts', reqBody).then(res => res.data);
}

const prepareSearchRequestBody = (phrase: string): DebtSearchRequestBody => {
    return { phrase };
}