import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/**
 * 存储服务
 * @author Sawyer
 */
@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor(private storage: Storage) { }

    /**
     * 设置给定键的值，返回 Promise 对象
     */
    set(key: string, value: any): Promise<any> {
        return this.storage.set(key, value);
    }

    /**
     * 获取与给定键相关联的值，返回 对象
     */
    get(key: string): Promise<any> {
        return this.storage.get(key);
    }

    /**
     * 删除与此键关联的值，返回 Promise 对象
     */
    remove(key: string): Promise<any> {
        return this.storage.remove(key);
    }

    /**
     * 清除整个键值存储，返回 Promise 对象
     */
    clear(): Promise<void> {
        return this.storage.clear();
    }
}