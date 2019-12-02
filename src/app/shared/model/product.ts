/**
 * 商品
 * @author Sawyer
 */
export interface Product {
    id: number;
    imageUrl: string;
    title: string;
    tags: string[];
    price: number;
    priceDesc: string;
    buyerAvatars: string[];
}

/**
 * 商品搜索条件
 * @author Sawyer
 */
export interface SearchCondition {
    keyword: string;
    baseSort?: string;
}