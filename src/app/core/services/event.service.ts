import { Injectable } from '@angular/core';
import { EventEmitter } from 'eventemitter3';

/**
 * 事件广播服务
 */
@Injectable({
    providedIn: 'root'
})
export class EventService {

    private event: any;

    constructor() {
        this.event = new EventEmitter();
    }

    /**
     * 广播事件
     * @param topic 主题
     * @param msg 消息
     */
    broadcast(topic: string, msg: any) {
        this.event.emit(topic, msg);
    }

    /**
     * 订阅事件
     */
    subscribe<T>(topic: string, listener: any): Promise<T> {
        return this.event.on(topic, listener);
    }
}

/**
 * 用户事件
 */
export enum UserEvent {

    /**
     * 登录
     */
    SIGN_IN = 'sign in',

    /**
     * 注册
     */
    SIGN_UP = 'sign up',

    /**
     * 退出
     */
    SIGN_OUT = 'sign out'
}