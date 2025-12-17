// Shared TypeScript types for Cham Bank

export type Language = 'ar' | 'en';

export interface StrapiImage {
    data?: {
        attributes: {
            url: string;
            alternativeText?: string;
            width?: number;
            height?: number;
        };
    };
}

export interface StrapiAttributes {
    title: string;
    description?: string;
    slug?: string;
    isActive?: boolean;
    isPublished?: boolean;
    [key: string]: unknown;
}

export interface StrapiEntity<T extends StrapiAttributes = StrapiAttributes> {
    id: number;
    attributes: T;
}

export interface StrapiResponse<T extends StrapiAttributes = StrapiAttributes> {
    data: StrapiEntity<T>[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

export interface SliderAttributes extends StrapiAttributes {
    title: string;
    description: string;
    link: string;
    buttonText: string;
    image: StrapiImage;
    isActive: boolean;
    order: number;
}

export interface ServiceAttributes extends StrapiAttributes {
    title: string;
    description: string;
    icon: string;
    slug: string;
    isActive: boolean;
}

export interface ProductAttributes extends StrapiAttributes {
    title: string;
    description: string;
    icon: string;
    category: 'accounts' | 'finance' | 'cards';
    features?: string;
    isActive: boolean;
}

export interface NewsAttributes extends StrapiAttributes {
    title: string;
    description: string;
    date: string;
    image: StrapiImage;
    slug: string;
    isPublished: boolean;
}

export interface BranchAttributes extends StrapiAttributes {
    name: string;
    address: string;
    city: string;
    phone: string;
    latitude: number;
    longitude: number;
    isActive: boolean;
}

export interface ExchangeRate {
    id?: number;
    currency: string;
    buy: number;
    sell: number;
    trend: 'up' | 'down' | 'stable';
}

export interface ExchangeRatesResponse {
    rates: ExchangeRate[];
    lastUpdate: string;
}

export interface TeamMemberAttributes extends StrapiAttributes {
    name: string;
    role: string;
    bio?: string;
    description?: string;
}

export type TeamType = 'founders' | 'board' | 'sharia';

export interface InvestorItemAttributes extends StrapiAttributes {
    title: string;
    description: string;
    icon: string;
    category: string;
    link?: string;
}

