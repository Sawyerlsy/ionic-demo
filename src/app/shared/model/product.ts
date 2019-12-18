/**
 * 商品
 * @author Sawyer
 */
export interface Product {
    id: string;
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

/**
 * 商品分类信息
 */
export interface ProductCategory {
    id: string;
    name: string;
    icon: string;
}