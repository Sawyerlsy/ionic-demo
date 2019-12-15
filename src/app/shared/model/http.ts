import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface HttpOption {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}

/**
 * 接口结果封装对象
 */
export interface ApiResult<T> {
    code: number;
    message: string;
    data: T;
    success: boolean;
}
